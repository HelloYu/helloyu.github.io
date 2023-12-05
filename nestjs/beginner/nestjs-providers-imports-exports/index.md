---
title: "NestJS模块中providers，imports，exports的简单使用"
date: "2023-12-05"
categories: 
  - "NestJS"
tags: 
  - "NestJS入门"
  - "NestJS学习"
---
NestJS模块中有三个参数，分别是providers，imports和exports，很多时候经常会搞不清楚他们的具体用途，下面作个简单介绍。

## Providers（提供者）

在 NestJS 中，`providers` 是一种处理业务逻辑的特殊类。它们是模块中的主要组件，用于处理数据存储、服务调用和其他与业务逻辑相关的任务。

```typescript
// cat.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  private cats = ['喵喵', '小胡子', '毛茸茸'];

  findAll(): string[] {
    return this.cats;
  }
}
```

在上面的代码中，`CatService` 被标记为 `@Injectable()`，表示它是一个提供者。这个服务简单地返回一个包含一些猫名字的数组。

## Imports（导入）

`imports` 用于将其他模块导入到当前模块。通过 `imports`，我们可以使用其他模块提供的服务和功能。

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [CatModule],
})
export class AppModule {}
```

在上面的代码中，`AppModule` 导入了 `CatModule`，这样就可以在 `AppModule` 中使用 `CatModule` 提供的服务。

## Exports（导出）

`exports` 允许当前模块的功能和服务对其他模块可见。如果一个模块中有一些功能是其他模块可能需要使用的，就可以通过 `exports` 公开它们。

```typescript
// cat.module.ts

import { Module } from '@nestjs/common';
import { CatService } from './cat.service';

@Module({
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
```

在上面的代码中，`CatModule` 将 `CatService` 导出，这样其他模块就可以导入 `CatModule` 并使用其中提供的服务。

## 使用示例

现在，让我们将这些概念整合在一起，创建一个使用 `CatModule` 的简单应用。

```typescript
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const catService = app.get(CatService);
  console.log('所有猫咪:', catService.findAll());
  await app.listen(3000);
}
bootstrap();
```

在上面的代码中，`AppModule` 使用了 `CatModule` 提供的服务。当应用启动时，它会打印所有猫咪的名字。

