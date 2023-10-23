---
title: "Composer.json 和 Composer.lock 区别"
date: "2021-05-12"
categories: 
  - "PHP开发"
tags: 
  - "PHP开发"
  - "PHP学习"
coverImage: "b62e9e14-b20f-4b2c-9d03-99c2ed8776dc.jpeg"
---

PHP开发的朋友一定很快就会接触到**composer包管理器**，我在刚开始使用Composer的时候有点懵，为什么有两个文件，`composer.json`和`composer.lock`，刚开始的时候真没搞懂，为什么不像`NPM`一样就一个`package.json`就行了呢？后来慢慢的深入才发现这种机制的好处。

首先我们来看看一个`composer.json`代码例子:

"require": {
       "php": "^7.3|^8.0",
       "fideloper/proxy": "^4.4",
       "fruitcake/laravel-cors": "^2.0",
       "guzzlehttp/guzzle": "^7.0.1",
       "inertiajs/inertia-laravel": "^0.3.5",
       "laravel/framework": "^8.12",
       "laravel/jetstream": "^2.2",
       "laravel/sanctum": "^2.6",
       "laravel/tinker": "^2.5",
       "tightenco/ziggy": "^1.0"
   }

上面这段代码是在laravel项目中复制来的，在没有执行`composer install` 命令之前，我们可以看到根目录下是没有`composer.lock`这个文件，执行后才有了这个文件，看看代码有什么区别：

"name": "laravel/framework",
"version": "v8.34.0",
"source": {
    "type": "git",
    "url": "https://github.com/laravel/framework.git",
    "reference": "81892ca110795a9c46c7e198cba7763bfd2af0bf"
}

`composer.lock`的文件要比`composer.json`文件大的多，可以理解为`composer.json`包含的是依赖包的简要信息而`composer.lock`文件包含的是依赖的详细信息，但是还不只是这样，如果是这样的放着在一个文件里面用不同的字段去区别不就好了。

## composer.lock文件作用

从上面的代码我们可以看出来`laravel`构架的版本号是`v8.34.0`，而`composer.json文件`里面申明的版本信息是`^8.12`，这个`^符号`表示除了大版本号不能变，其它版本号可变，那如果是把composer.json这个文件分享给同事或者朋友，执行install命令后，那版本号可能是和你自己本地开发使用的版本是不同的，这时候composer.lock文件就起到了关键作用，因为composer.lock文件里面是有显示的版本号的，只要把这个文件分享出去，别人再执行`composer install`命令的话，安装的依赖包就会和你本地开发安装的是一个版本，这样就会防止一些不必要的bugs。

## composer install vs update

这里seo禅简单介绍下**composer install 和update 的工作流程**，执行install操作后，composer会先去看看有没有composer.lock文件，如果有就安装lock文件内的依赖包，如果没有会再去找composer.json文件并安装，而composer update操作，就会直接读composer.json文件，根据版本规则去更新，但是他们两个操作最后都是会更新lock文件，如下图：
