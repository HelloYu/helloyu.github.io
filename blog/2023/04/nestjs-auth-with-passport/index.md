---
title: "NestJS中如何进行鉴权和授权验证？JWT、Passport"
date: "2023-04-27"
categories: 
  - "NestJS"
tags: 
  - "NestJS入门"
  - "NestJS学习"
coverImage: "nestjs-authentication.jpg"
---

## 什么是鉴权？

人类的学习是非常低效的，要学一样东西第一件事基本就是搞清楚这东西是什么？

**鉴权（Authentication）**是指确定用户身份的过程，通常涉及用户提供凭据（例如用户名和密码）来验证其身份。

在 Web 应用程序中，鉴权通常通过以下方式实现：

1. 基于 Cookie 和 Session 的鉴权

在这种方式下，用户在进行登录时，输入用户名和密码，并发送给服务器验证。如果验证通过，服务器将在后续的请求中为用户创建一个 Session，并将 Session ID 存储在 Cookie 中返回给客户端。客户端发送请求时，会自动携带该 Cookie，服务器可以根据 Session ID 来验证用户的身份。

这种方式的优点是实现简单，可以使用浏览器内置的 Cookie 支持。缺点是不支持跨域访问和跨设备访问，容易受到 CSRF 攻击。

2. 基于 Token 的鉴权

在这种方式下，用户在进行登录时，输入用户名和密码，并发送给服务器验证。如果验证通过，服务器将生成一个 Token，并将 Token 发送给客户端。客户端在后续请求中携带该 Token，服务器可以根据 Token 来验证用户的身份。

这种方式的优点是支持跨域访问和跨设备访问，不容易受到 CSRF 攻击。缺点是实现相对复杂，需要自行实现 Token 的生成和验证逻辑。

在实际开发中，可以选择使用第三方鉴权库来简化鉴权实现。例如，在 Node.js 应用程序中，可以使用 Passport 和其它相关模块来实现多种鉴权策略，包括基于 Cookie 和 Session 的鉴权、基于 Token 的鉴权、OAuth 鉴权等。

鉴权和授权（Authorization）是有区别的，**鉴权**是判断**你是谁**，**授权**是判断你**能不能做**。

## 鉴权实现步骤

在Node项目中，我们主要使用Passport包来实现鉴权和授权，一般实现鉴权会有如下步骤：

1. 用户通过用户密码登录

3. 验证用户身份

5. 返回鉴权结果

7. 下次用户请求带上授权信息

这里我将基于《[Clean Architecture在NestJS中的实践](https://www.helloyu.top/clean-architecture-with-nestjs-best-practice-init.html)》这篇文章中的代码，来实现登录验证，并在下次请求的时候，在请求头中带上JWT信息。

## 验证用户身份

我们使用`passport-local`来验证用户身份，首页我们要安装相关依赖包：
```
pnpm install @nestjs/passport passport passport-local
pnpm install -D @types/passport-local
```
然后创建一个`strategy`：
```
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUsecasesProxyModule.SIGN\_IN\_USECASE\_PROXY)
    private readonly signInUsecaseProxy: UsecaseProxy<SignInUsecase>,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.signInUsecaseProxy
      .getInstance()
      .execute(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```
Strategy里有一个`validate`方法，这里我们要写上自己的用户身份验证逻辑，然后我们再创建一个Guard守卫：
```
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```
这里直接使用`passport`自带的就行，然后我们把`LocalAuthGuard`注入到AuthModule中：
```
@Module({
  imports: \[AuthUsecasesProxyModule.register(), PassportModule\],
  providers: \[LocalStrategy\],
  exports: \[\],
})
export class AuthModule {}
```
我们在`controller`中使用刚创建的守卫：
```
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
    @Inject(AuthUsecasesProxyModule.SIGN\_IN\_USECASE\_PROXY)
    private readonly signInUseCaseProxy: UsecaseProxy<SignInUsecase>,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessTokenCookie = await this.signInUseCaseProxy
      .getInstance()
      .getCookieWithJwtToken(signInDto.username);
    const refreshTokenCookie = await this.signInUseCaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(signInDto.username);

    res.set('Set-Cookie', \[accessTokenCookie, refreshTokenCookie\]);

    return;
  }
}
```
如果账号密码不对，是进不到`signIn`这个函数里面，也就执行不了设置cookie的操作，当然我们`return`的时候也可以把token返回去，作为多端验证使用，到这里我们已经完成了用户身份验证的功能，下面我们使用JWT来实现用户下次请求自动进行鉴权，就不用重复登录，重新输入密码，只要带上`Token`信息就可以。

## 验证用户授权

上面说过对用户进行鉴权和授权，是我们权限系统设计的第一步，比如上面我们对用户登录信息进行效验，这是鉴权，用户登录之后，带上`Token`请求特定API，这个API需要登录的用户才能使用，这是授权。

我们使用`passport-jwt`包来实现这个功能，首先安装依赖包：
```
pnpm install @nestjs/jwt passport-jwt
pnpm install -D @types/passport-jwt
pnpm install cookie-parser
pnpm install -D @types/cookie-parser 
```
然后一样的，我们需要一个JWT的Strategy：
```
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUsecasesProxyModule.SIGN\_IN\_USECASE\_PROXY)
    private readonly signInUsecaseProxy: UsecaseProxy<SignInUsecase>,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(\[
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      \]),
      secretOrKey: config.get('jwt.SECRET'),
    });
  }

  async validate(payload: any) {
    console.info('payload', payload);
    const user = this.signInUsecaseProxy
      .getInstance()
      .validateUserForJwtStragtegy(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```
这里的`jwtFromRequest`用了两个方法，一种是从cookies中获取，这个用来兼容Web方案，一个是从`header`中获取：
```
"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
```
这种可以兼容多端方案，或者只用这一种，Web前端就不使用Cookies的方案，这个看你们自己选择，需要在`main.ts`挂载下`cooki-parser`：
```
 app.use(cookieParser());
```
之后我们再创建一个JWT的guard,直接继承passport的就行：
```
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```
我们在给Controller使用上：
```
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecasesProxyModule.GET\_USERS\_USECASE\_PROXY)
    private readonly getUsersUsecaseProxy: UsecaseProxy<GetUsersUsecase>,
    @Inject(UserUsecasesProxyModule.CREATE\_USER\_USECASE\_PROXY)
    private readonly createUserUsecaseProxy: UsecaseProxy<CreateUsersUsecase>,
    @Inject(UserMapper)
    private readonly mapper: UserMapper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userRequestDto: UserRequestDto): Promise<UserPresenter> {
    const user = this.mapper.fromDtoToModel(userRequestDto);

    const created = await this.createUserUsecaseProxy
      .getInstance()
      .execute(user);

    return this.mapper.fromModelToPresenter(created);
  }

  @Get()
  async getUsers(): Promise<UserPresenter\[\]> {
    const users = await this.getUsersUsecaseProxy.getInstance().execute();

    return users.map((item) => this.mapper.fromModelToPresenter(item));
  }
}
```
如果是没有携带Token或者Token不对，后台就会报错：

![](images/image-36.png)

到这里NestJS如何使用JWT和Passport进行鉴权、授权就差不多实现了，有什么不懂的可以评论区留言。

本文演示源代码：[clean-architecture-with-nestjs](https://github.com/HelloYu/clean-architecture-with-nestjs)
