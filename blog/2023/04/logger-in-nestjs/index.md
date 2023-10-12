---
title: "日志记录Logger在NestJS中的实现"
date: "2023-04-29"
categories: 
  - "NestJS"
tags: 
  - "NestJS入门"
  - "NestJS学习"
  - "软件架构设计"
coverImage: "nest-logger.png"
---

在日常开发中，我们都或多或少要用到日志服务去排查Bug，尤其是线上环境的时候，很多情况是可以通过分析错误日志去解决的，如果没有打印出错误日志，在线上就不容易查出问题，下面SEO禅将借用在《[Clean Architecture在NestJS中的实践](https://www.seozen.top/clean-architecture-with-nestjs-best-practice-init.html)》实现的代码，来加入日志打印功能。

## NestJS内置Logger

我们先使用内置Logger来实现一个日志记录功能，之后再更换成Winston这种生产级别用的第三方库来替换掉内置的日志实现。首先我们要先申明一个抽象的接口，这样就不会依赖任何第三方实现：
```
export interface ILogger {
  debug(context: string, message: string): void;
  log(context: string, message: string): void;
  error(context: string, message: string, trace?: string): void;
  warn(context: string, message: string): void;
  verbose(context: string, message: string): void;
}
```
在创建一个`logger.service.ts`文件：
```
@Injectable()
export class LoggerService implements ILogger {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  debug(context: string, message: string) {
    if (process.env.NODE\_ENV !== 'production') {
      this.logger.debug(\`\[DEBUG\] ${message}\`, context);
    }
  }
  log(context: string, message: string) {
    this.logger.log(\`\[INFO\] ${message}\`, context);
  }
  error(context: string, message: string, trace?: string) {
    this.logger.error(\`\[ERROR\] ${message}\`, trace, context);
  }
  warn(context: string, message: string) {
    this.logger.warn(\`\[WARN\] ${message}\`, context);
  }
  verbose(context: string, message: string) {
    if (process.env.NODE\_ENV !== 'production') {
      this.logger.verbose(\`\[VERBOSE\] ${message}\`, context);
    }
  }
}
```
把它挂载到你想使用的模块中，`providers`数组里面，当然也可以创建一个`logger module`：
```
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: \[LoggerService\],
  exports: \[LoggerService\],
})
export class LoggerModule {}
```
随便在哪里想调用的地方使用看看：
```
 this.logger.log('User Controller', 'get users');
\[Nest\] 5676  - 2023/04/24 17:29:32     LOG \[User Controller\] \[INFO\] get users // 输出
```
我们还可以再创建一个拦截器，拦截所有请求并记录：
```
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const ip = this.getIP(request);

    this.logger.log(
      \`Incoming Request on ${request.path}\`,
      \`method=${request.method} ip=${ip}\`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          \`End Request for ${request.path}\`,
          \`method=${request.method} ip=${ip} duration=${Date.now() - now}ms\`,
        );
      }),
    );
  }

  private getIP(request: any): string {
    let ip: string;
    const ipAddr = request.headers\['x-forwarded-for'\];
    if (ipAddr) {
      const list = ipAddr.split(',');
      ip = list\[list.length - 1\];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip.replace('::ffff:', '');
  }
}
```
记得要在`main.ts`挂载下：
```
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
```
## 第三方库Winston

Winston是比较专业的日志记录第三方库，可以向文件，数据库，云服务器输出日志，也可以自定义各种格式，我们现在对接进项目，安装依赖包：
```
pnpm i winston
pnpm i -D @types/winston
```
再把我们刚才的logger service代码改下就行：
```
@Injectable()
export class LoggerService implements ILogger {
  logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: \[
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
      \],
    });
  }
  debug(context: string, message: string) {
    this.logger.debug(message);
  }
  log(context: string, message: string) {
    this.logger.info(message);
  }
  error(context: string, message: string, trace?: string) {
    this.logger.error(message);
  }
  warn(context: string, message: string) {
    this.logger.warn(message);
  }

  verbose(context: string, message: string) {
    this.logger.verbose(message);
  }
}
```
这里用了不同的`transports`向不同的文件和终端输出信息，具体如何使用参考官方文档，这里就不再过多描述，有什么不懂的，看开头那边文章里面的源码吧，有什么问题可以留言评论。
