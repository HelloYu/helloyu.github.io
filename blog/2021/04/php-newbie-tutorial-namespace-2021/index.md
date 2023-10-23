---
title: "PHP新手入门教程2021（一）：Namespace"
date: "2021-04-24"
categories: 
  - "PHP开发"
tags: 
  - "PHP教程"
  - "PHP学习"
coverImage: "customphplogo.png"
---

我最近都在写系列的文章，主要参考各专业比较经典的书籍，把一些比较重点的内容抽出来，用简单的语言去描述，文章不会介绍怎么安装PHP，会重点的讲语言的特性，语法知识，具体应用在这个系列中不会太多，首先希望能在更高的层次去快速理解PHP这个语言，我是全栈工程师，在写一个项目的时候，首先是架构，然后才到具体实现，而且也不是所有的语言具体参数使用方法都记在心上，用到时候再去查就行，但是你要知道你这个项目适合用什么技术去实现，这个技术能否实现这个需求。

## Namespace

在学习PHP之前，我首先要介绍的是PHP自5.3.0版本加入的Namespace特性，就是因为这个特性，让PHP成为最受欢迎的现代编程语言之一，使用它我们能申明虚拟的目录，和计算机物理目录不是一个概念，并不能一一对应，这个特性的加入让PHP模块化组件化成为了可能，而且还有类似于NPM的Composer包管理器，让PHP在程序员间越来越受到亲睐，PHP程序员也能像前端程序员一样管理和加载组件包，不需要重复的造轮子。

## Namesapce 申明

namespace的使用和其它语言差不多，首先申明包名在PHP文件头部：
```
<?php namespace Seozen;
```
这个语句表示当前文件是在Seozen这个包下，如果要申明子目录，可以如下：
```
<?php namespace Seozen\\subnamespace;
```
## Namespace导入

所有在这个文件下的类，接口，函数都在这个包名下，如果要在其它文件中使用这些类，接口，函数，可以像下面这样导入：
```
?php
use Symfony\\Component\\HttpFoundation\\Response;
$response = new Response('Oops', 400); $response->send();
```
也可以使用`as`关键词来进行重命名：
```
<?php
use Symfony\\Component\\HttpFoundation\\Response as Res;
$r = new Res('Oops', 400); $r->send();
```
如果要导入多个包，可以使用下面的句式：
```
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;
```
如果不使用namespace在php文件中，那这个文件的类，函数都会成为全局类和函数，如果项目不大没有关系，但是为了日后可维护和可移植性，还是要加上Namespace来限定范围。
