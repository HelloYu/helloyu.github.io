---
title: "PHP新手入门教程2021（五）：变量"
date: "2021-05-20"
categories: 
  - "PHP开发"
tags: 
  - "PHP教程"
  - "PHP学习"
coverImage: "php-variable-basics-36ywbi56riy1pphwtfnoqy.png"
---

在PHP中，大部分信息都是存储在变量中，这篇文章就要介绍下PHP的变量知识，下面有几点在学习PHP的时候是需要牢记的：

- 所有变量都需要使用`$`符号开头
- 变量的值只保存最后一次赋值内容
- 变量的赋值操作使用的是`=`操作符号，左边是变量名，右边是表达式
- 在PHP中，变量是没有类型限定符的，可以赋值任意的变量类型
- PHP会自动转换变量类型

在PHP中，有8种的基本的数据类型：

- Integers - 整数，不带小数点
- Doubles - 浮点，带小数点
- Booleans - 布尔类型，true or false.
- NULL - 特殊的类型，表示NULL
- String - 字符串
- Array - 数组
- Objects - 对象
- Resources - 引用外部资源

## 变量的作用域

在PHP中，变量有下面四种作用域：

- 本地变量
- 函数参数变量
- 全局变量
- 静态变量

### 本地变量

本地变量应该相对好理解，在一个PHP文件内，有函数内部和函数外部变量的区分，如：
```
<?php
   $x = 4;
   
   function assignx () { 
      $x = 0;
      print "\\$x inside function is $x. <br />";
   }
   
   assignx();
   print "\\$x outside of function is $x. <br />";
?>
$x inside function is 0. 
$x outside of function is 4. 
```
### 函数参数变量

函数参数变量，如：
```
function multiply ($value) {
     $value = $value \* 10;
     return $value;
}
```
### 全局变量

全局变量使用`GLOBAL`关键字来指明，如：
```
<?php
   $somevar = 15;
   
   function addit() {
      GLOBAL $somevar;
      $somevar++;
      
      print "Somevar is $somevar";
   }
   
   addit();
?>
```
### 静态变量

静态变量使用`STATIC`关键字来指明，如：
```
<?php
   function keep\_track() {
      STATIC $count = 0;
      $count++;
      print $count;
      print "<br />";
   }
   
   keep\_track();
   keep\_track();
   keep\_track();
?>
```
## 变量命名

PHP变量的命名需要使用字母或者`_`开头，可以使用数字，字母，`_下划线`组合，但是不能使用+ , - , % , ( , ) . & , 等符号。
