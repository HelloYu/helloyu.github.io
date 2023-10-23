---
title: "PHP新手入门教程2021（四）：基础语法规则"
date: "2021-05-16"
categories: 
  - "PHP开发"
tags: 
  - "PHP教程"
  - "PHP学习"
coverImage: "5f16e49b36d2d195979626.png"
---

从这一篇文章开始就是正式进入到PHP语言学习的阶段，学习一门语言首先要知道这个语言的特点，之后要熟悉语法规则，然后再跟着项目去提升自己，这个《PHP新手入门教程2021》系列不打算使用实际的项目例子来讲，会在其它系列代入项目，来重新认识PHP语言。

## PHP标签

PHP解析引擎需要从PHP文件中解析语句，就要有一些标识去区分**普通代码**和**PHP代码**，能被PHP引擎识别的PHP标签有如下四种：

- `<?php...?>`这是最常用的一种，使用这种标准的标签能确保一定会被正确解析。
- `<?...?>`这是简写形式，使用这种方式需要配置，不太推荐
- `<%....%>` ASP风格，也需要配置php.ini文件
- `<script language = "PHP">...</script>` HTML脚本风格

正确来说我们只使用第一种，其它形式[我](https://www.helloyu.top/)暂时没有用过，知道下就可以。

有时候你会在`PHP模块文件`中看到没有`?>`闭合标签，这是被PHP允许的，是为了防止在使用`include`或者`require`命令包含PHP文件时，可能产生多余的空格而发生的一些错误。所以通常如果只有PHP代码的文件，我们只使用`<?php`开标签。

## PHP注释

PHP的注释和其它语言如JAVA，Javascript基本相似，就简单的举个例子：
```
<? 

    # 这是一个单行注释 
    /\* 
     这是多行注释 
    \*/

    // 这也是单行注释，注释的时候不要混用注释符号 
    print "我 专注SEO优化 分享SEO技术"; 

?>
```
## PHP空格

在PHP语句中，多个空格和一个空格的效果是一样的，空格也包括`tab`和换行，下面3行表示的是同一个意思，结果也是相同的：
```
$four = 2 + 2; // single spaces
$four <tab>=2<tab>+<tab>2 ; // spaces and tabs
$four =
2+
2; // multiple lines
```
## PHP大小写敏感

在PHP中大小写是敏感的，所以我们在申明和使用变量函数的时候都要注意大小写，如下面的语句表达的就是不是同一个意思：
```
<html>
   <body>
      
      <?php
         $capital = 67;
         print("Variable capital is $capital<br>");
         print("Variable CaPiTaL is $CaPiTaL<br>");
      ?>
      
   </body>
</html>
```
## PHP语句结束符

在PHP语句中，如果不是后面紧跟`?>`闭标签，就要使用`;`来结束语句，如下：
```
$greeting = "Welcome to PHP!";
```
## 命令行运行PHP文件

我们在刚开始学习和使用PHP的时候，经常需要测试PHP语句是否正确，我们可以在命令行窗口直接运行PHP文件，如下：
```
$ php test.php
```
以上就是PHP的基础语法规则，在后面的文章会开始介绍PHP的语法知识。
