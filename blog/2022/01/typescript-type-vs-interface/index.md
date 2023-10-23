---
title: "TypeScript基础知识：Type 和 Interface的区别"
date: "2022-01-22"
categories: 
  - "Web前端开发"
tags: 
  - "TypeScript"
coverImage: "type-vs-interface-typescript.png"
---

在学习TypeScript的时候，我觉得最迷惑的地方就是Type和Interface到底有什么区别？看着好像没什么区别？那为什么要有这两个不同的关键字呢，找到一篇文章说的还不错，翻译过来分享给各位。

## 声明合并

通常我们使用type都是作为变量或者参数的限定类型，interface更倾向于OOP的编程思维，相当于定义一个接口，和他的名字差不多，通常他们可以混用，但是也有一些区别，首先是interface能够进行**声明合并**，也就是说定义了两个相同名称的接口，TS会讲interface进行合并，但是type会报错，如下：

```
interface SEO {
   name: string;
};

interface SEO {
   level: string;
};

const seozen: SEO = {
  name: "我",
  level: "Awesome"
};
```

## 扩展和实现

在TS中就和其他OOP语言类似，你能很容易的扩展和实现interface接口，但是type是有些约束的，比如：

```
class Person {
  printName = () => {
    console.log("我叫我")
  }
};

interface SEOZEN extends Person {
  name: string;
};

class NewSEOZEN implements SEOZEN {
  name: "我";
  constructor(engine:string) {
    this.name = name
  }
  printName = () => {
    console.log("我优化")
  }
};
```

这种OOP的编程方式type关键字就无法实现了。

## 组合

我们可以通过type组合生成新的类型别名，如：

```
type Name = {
  name: “string”
};

type Age = {
  age: number
};

type Person = Name & Age;
// 组合interface
interface Name {
  name: “string”
};

interface Age {
  age: number
};

type Person = Name & Age;
```

但是你无法使用interface做这件事。

## 联合

我们还可以使用type对变量或者返回值，作联合声明，规定范围，如：

```
type Man = {
  name: “string”
};

type Woman = {
  name: “string”
};

type Person = Man | Woman;

interface Man {
  name: "string"
};

interface Woman {
  name: "string"
};

type Person = Man | Woman;
```

## 我该用哪个？

就像之前说的interface偏向于OOP编程，比如定义一个对象，定义一些接口方法，而type比较经常用在参数类型，函数返回值等，如：

```
type Person = {
  name: string,
  age: number
};

type ReturnPerson = (
  person: Person
) => Person;

const returnPerson: ReturnPerson = (person) => {
  return person;
};
```

参考链接：https://blog.logrocket.com/types-vs-interfaces-in-typescript/
