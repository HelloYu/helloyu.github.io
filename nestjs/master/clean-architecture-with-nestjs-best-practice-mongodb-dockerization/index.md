---
title: "Clean Architecture在NestJS中的实践（二）：连接MongoDB数据库(Dockerization)"
date: "2023-04-23"
categories: 
  - "Docker学习"
  - "NestJS"
tags: 
  - "Docker"
  - "NestJS学习"
  - "软件架构师"
  - "软件架构设计"
coverImage: "mongodb-with-docker.png"
order: 3
---

这是CA架构在NestJS中实践的第二篇文章，上一篇文章《[Clean Architecture在NestJS中的实践（一）：项目初始化](../clean-architecture-with-nestjs-best-practice-init/)》已经完成了项目的初始化，和载入配置参数的功能，这篇文章我们来通过Docker搭建MongoDB数据库，再通过Mongoose来连接数据库。

## Docker化MongoDB

要是不知道什么是Docker的朋友，可以先看看这篇文章《[Docker是什么？一篇Docker入门的好文章](../../docker/docker-introduction/)》，我为什么要使用Docker呢，第一方便，第二干净，第三可移植性好，我们可以很方便的通过`docker-compose up/down`这些命令来启动容器和服务，不想用的时候就down掉，也不用记各种不同东西的启动关闭命令，下面我们需要在项目下面新建一个`docker-compose.local.yml`文件，来配置MongoDB数据库。

![](images/image-29.png)

将下面的代码拷入文件内：
```
version: '3.1'

services:
  mongodb:
    image: mongo
    hostname: mongodb-dev
    restart: always
    ports:
      - 27017:27017
    environment:
      MONGO\_INITDB\_ROOT\_USERNAME: root
      MONGO\_INITDB\_ROOT\_PASSWORD: mongodb\_password

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME\_CONFIG\_MONGODB\_ADMINUSERNAME: root
      ME\_CONFIG\_MONGODB\_ADMINPASSWORD: mongodb\_password
      ME\_CONFIG\_MONGODB\_URL: mongodb://root:mongodb\_password@mongodb-dev:27017/
```
Docker工具的安装，就自己搜下，这里不进行介绍，下面我们运行如下命令来启动MongoDB容器：
```
docker-compose -f docker-compose.local.yml up
```
运行完命令之后，如果显示如下，基本就是安装成功了，可以通过`localhost:8081`来访问管理数据库。

![](images/image-30.png)

## Mongoose连接数据库

上面已经把MongoDB容器启动起来了，也就是说我们现在可以从NestJS中去使用MongoDB，下面我们来使用Mongoose来连接MongoDB数据库，首先我们要安装相关的依赖包：
```
pnpm i @nestjs/mongoose mongoose
```
之后我们可以在`local.env`文件加入MongoDB相关的配置信息，这些信息要和`docker-compose.local.yml`文件一致，不然会导致连接不上：
```
PORT=3000
DATABASE\_HOST=localhost
DATABASE\_PORT=27017 
DATABASE\_USERNAME=root
DATABASE\_PASSWORD=mongodb\_password
DATABASE\_NAME=dev
```
之后我们可以根据上一篇的介绍，注册一个MongoDB的environment配置，代码如下：
```
export class MongoDBEnvironmentVariables {
  @IsString()
  DATABASE\_HOST: string;
  @IsNumber()
  DATABASE\_PORT: Number;
  @IsString()
  DATABASE\_USERNAME: string;
  @IsString()
  DATABASE\_PASSWORD: string;
  @IsString()
  DATABASE\_NAME: string;
}

export const MongoDBEnvironmentConfig = registerAs(
  'database',
  (): IMongoDBConfig => {
    // Executes our custom function
    environmentValidationUtil(process.env, MongoDBEnvironmentVariables);

    const URI = \`mongodb://${process.env.DATABASE\_USERNAME}:${process.env.DATABASE\_PASSWORD}@${process.env.DATABASE\_HOST}:${process.env.DATABASE\_PORT}/${process.env.DATABASE\_NAME}\`;
    // If all is valid, this will return successfully

    return {
      URI: URI,
    };
  },
);
```
我们通过读取local.dev配置文件的信息，之后组成一个URI提供给MongoDB使用，下面我们在配置一个MongoDB的config模块：
```
export const getMongooseModuleOptions = (
  config: ConfigService,
): MongooseModuleFactoryOptions =>
  ({
    uri: config.get<string>('database.URI'),
    authSource: 'admin',
    autoIndex: true,
  } as MongooseModuleFactoryOptions);

@Module({
  imports: \[
    MongooseModule.forRootAsync({
      inject: \[ConfigService\],
      useFactory: getMongooseModuleOptions,
    }),
  \],
})
export class MongoDBConfigModule {}
```
到这里，我们通过上面两个文件代码，将我们的mongodb通过mongoose挂载进我们的NestJS中，下面就是使用MongoDB，我们通过`nest g res`来快速生成一个测试的代码模块：
```
nest g res cat
```
会让你选择一些参数，比如API RESTful，都选择默认就好了。

![](images/image-31.png)

打开CatModule模块中的entity，把`schema`信息配置下：
```
export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
```
之后我们就可以把MongoDB配置模块挂载到需要使用的模块中去：
```
@Module({
  imports: \[
    MongoDBConfigModule,
    MongooseModule.forFeature(\[{ name: Cat.name, schema: CatSchema }\]),
  \],
  controllers: \[CatController\],
  providers: \[CatService\],
})
export class CatModule {}
```
这时候重新启动下nest服务，如果看到如下信息就代表连接成功：

![](images/image-32.png)

## Mongoose操作数据库

通过上面的步骤，我们使用Docker起了一个MongoDB的容器，使用Mongoose连接了数据库，现在我们要使用Mongoose操作数据库，首先我们希望能插入一些数据，我们改造下`cat.service.ts`文件：
```
  constructor(
    @InjectModel(Cat.name)
    private readonly catEntity: Model<Cat>,
  ) {}

  create(createCatDto: CreateCatDto) {
    return this.catEntity.create(createCatDto);
  }
```
首先我们注入Mongoose的Model，然后再使用这个Entity中的create方法去插入一条记录，`CreateCatDto`中就只增加了两个简单的字段：
```
export class CreateCatDto {
  name: String;
  age: Number;
}
```
之后我们用`postman`测下下看看成不成功：

![](images/image-33.png)

再看看数据库里面是不是插入了数据：

![](images/image-34.png)

可以看到数据已经成功插入数据库，到这里已经算完成了MongoDB数据库的连接，其他的**查询删除编辑(CRUD)**实现方式都大同小异，本系列文章主要还是为了介绍Clean Architecture在NestJS中的实践，所以不会花太多时间在数据库连接使用上，下一篇会开始介绍Clean Architecture的基础框架，和他们之间是怎么协同工作的，这篇文章的源代码，请返回上一篇文章底部查看。
