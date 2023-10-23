---
title: "WordPress主题开发2021：文章上一篇/下一篇分页函数分享"
date: "2021-06-19"
categories: 
  - "WordPress教程"
tags: 
  - "WordPress"
  - "WordPress开发"
coverImage: "Wordpress-theme-Development-1.png"
---

在学习WordPress开发的时候，文章上一篇，下一篇的功能是最基本的**SEO需求**，但是就是这么简单的功能网上一查一大把WordPress函数，比如：`get_next_post`，`get_previous_post`，`previous_post_link`，`the_post_navigation`，有时候真的是分不清楚哪个是哪个，这边分享个表格，介绍下我知道的文章上下篇功能所用到的一些函数。

## WordPress文章导航分页函数

| 类型 | 旧函数                    | 新函数 |
| ---- | ------------------------- | ------ |
| 文章 | get\_previous\_post\_link |
previous\_post\_link  
get\_next\_post\_link  
next\_post\_link  
get\_next\_post  
get\_previous\_post | get\_the\_post\_navigation  
the\_post\_navigation |
| 文章归档 | get\_previous\_posts\_link  
previous\_posts\_link  
get\_next\_posts\_link  
next\_posts\_link  
get\_posts\_nav\_link  
posts\_nav\_link | get\_the\_posts\_navigation  
the\_posts\_navigation |
| 文章分页 | paginate\_links  
wp\_link\_pages | get\_the\_posts\_pagination  
the\_posts\_pagination |

上面这个表里大概就是WordPress用来实现文章导航和分页的函数，随着WordPress推出新的版本，也有新的函数更新，比如[`the_post_navigation`](https://developer.wordpress.org/reference/functions/the_post_navigation/)，我们查看WordPress的开发手册，这个函数是`WordPress4.1.0`版本加入进来的，这个函数是把**next\_post\_link**和**previous\_post\_link**功能合在一起的一个函数，这个函数是在文章内使用的，链接指向的是单篇文章，如果是在很多文章的归档，就不能用这个功能了，就要使用`posts_nav_link`这个函数，默认显示样式：**« Previous Page — Next Page »**，大部分时候我们用新出的函数就可以，更详细的使用放在另外的文章去介绍，这篇文章主要就是用上面这个表格罗列出这些函数作为索引，在使用的时候也可以直接复制上面的函数到WordPress开发文档去查下就知道如何使用了。
