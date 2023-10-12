---
title: "WordPress主题开发知识：模块化开发-入门知识"
date: "2021-10-01"
categories: 
  - "WordPress主题开发"
  - "WordPress教程"
tags: 
  - "WordPress"
  - "WordPress开发"
coverImage: "wordpress-theme-development-modularization.png"
---

距离SEO禅写《[2021从零开始开发WordPress主题教程（一）：了解目录结构](https://www.seozen.top/wordpress-theme-develop-hierarchy.html)》已经有很长的一段时间，现才有时间继续写第二篇，放心一定不会太监，只是还没想好要怎么写，现在有了大概的思路，就暂时记录下来，前一篇文章简单介绍了WordPress主题开发的基本要求，那就是目录下面必须包含，`index.php`和`style.css`这两个文件，一个主题可大可小，但是肯定不止两个文件，这篇就说下WordPress主题的**模块化开发**。

开发过前端的朋友们肯定很熟悉模块化，因为不管你使用什么框架，配合ES6的模块化和Webpack打包工具的支持，都能将一个大的前端系统划分成不同的模块，不同的组件，WordPress是使用PHP语言编写的，PHP也有语言级别的模块化支持，比如`require`和`include`，这些是语言层面提供的模块化支持，但是这篇重点说的是WordPress自身提供的模块化支持。

## Template Tags模板标签

WordPress 提供了很多[template tag](https://developer.wordpress.org/themes/basics/template-tags/)，那什么是模板标签呢？其实就是一些具有特定功能的函数，比如说获取网站的名称，logo，作者信息，这些template tag当然不止获取信息那么简单，光靠获取信息可没办法模块化开发WordPress主题，所以WordPress还提供了一些其他类型的模板标签函数，比如说获取头部，侧边栏，底部模板的功能函数：

```
get_header
get_sidebar
get_footer
```

这些标签函数『返回』的就是模板代码了，比如说header.php，sidebar.php，footer.php等模板页面，这里的返回并不是真正意义的返回，读过源代码可以知道，返回的是`false`或者`void`，这里暂时不去深究，WordPress提供了许多有用的模板标签，可以参考[Template tags列表](https://developer.wordpress.org/themes/references/list-of-template-tags/)，注意这个页面上提到的只是一部分，其他的还需要到源代码里面看。

## Conditional Tags条件标签

除了前面提到的Template Tags，这里还需要再提一提另一类特殊功能函数[conditional条件标签](https://developer.wordpress.org/themes/basics/conditional-tags/)，我们知道语言层面的条件语法，如`if`语句，他需要有个判定条件，比如说当前的页面是否首页？还是文章页？这时候wordpress就自己提供了一些函数去判断，如果要自己去写就麻烦多了，这些函数类似下面格式：

```
is_front_page
is_home
has_excerpt
```

具体详细的列表可以参考：[conditianal tags列表](https://developer.wordpress.org/themes/references/list-of-conditional-tags/)

## 主题目录结构

随着主题越来越大，我们不可能把所有文件都放在根目录，一定会按功能特性区分开，把他们放在不同的文件夹，类似下面的目录结构：

```
assets (dir)
      - css (dir)
      - images (dir)
      - js (dir)
inc (dir)
template-parts (dir)
      - footer (dir)
      - header (dir)
      - navigation (dir)
      - page (dir)
      - post (dir)
404.php
archive.php
comments.php
footer.php
front-page.php
functions.php 
header.php
index.php
page.php
README.txt
rtl.css
screenshot.png
search.php
searchform.php
sidebar.php
single.php
style.css
```

其他都在后面慢慢会介绍到，这里说下`functions.php`文件，当主题通过`style.css`识别之后，如果主题是启用状态，wordpress就会去读取functions.php的内容，这相当于整个主题的`main`入口函数，无论是如何模块化，最终的入口是在这个文件，记住这点很重要。

其实要真正进行模块化开发，还需要介绍到class，但是这是PHP语言和设计模式的东西了，不是一两篇文章能介绍完的，这个系列应该是从易到难的一个渐进式**WordPress主题开发教程**，先使用简单的方法去实现一个主题，之后再根据设计模式来进行改进。下一篇开始正式进入《[从零开始开发WordPress主题教程](https://www.seozen.top/wordpress-theme-development-seozen-dummy.html)》这个系列的教程。
