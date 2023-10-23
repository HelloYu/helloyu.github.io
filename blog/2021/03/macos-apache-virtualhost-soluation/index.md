---
title: "MacOS 配置 Apache Virtualhost 不起作用解决方法"
date: "2021-03-03"
categories: 
  - "Linux教程"
tags: 
  - "Apache"
  - "PHP"
coverImage: "Apache.jpg"
---

当你使用Apache在本地开发网站，有时候会同时有多个站点进行开发，那就需要使用到Apache的**Virtualhost功能**，它允许你自定义虚拟的域名绑定同一个IP，或者同一个IP不同的端口，最近进行多准备配置多个站点进行同时开发，在配置Virtualhost(虚拟主机)的时候遇到了点麻烦，找了Apache官网的文档看了又看，也没发现有什么任何问题，后来捣鼓来捣鼓去也没弄明白，最后在网上看到一个朋友写的文档，说是要把`mod_vhost_alias.so`模块加载，试了下果真就可以了，下面写一个完整的配置流程，给有需要的朋友。

## 第一步：修改httpd.conf文件
```
MacOS下Apache的配置文件放在如下位置：

sudo vim /etc/apache2/httpd.conf
```
打开文件后，输入`/`搜索`vhost`关键字，把下面两行前的`#`去掉
```
#LoadModule vhost\_alias\_module libexec/apache2/mod\_vhost\_alias.so
  
#Include /private/etc/apache2/extra/httpd-vhosts.conf
```
再搜索`php`关键字，把下面两行也注释：
```
LoadModule rewrite\_module libexec/apache2/mod\_rewrite.so
LoadModule php7\_module /usr/local/opt/lib/httpd/modules/libphp7.so
```
我这里的`php`模块因为换成了`7.4`版本，所以应该和你们的不一样，记得`wq`保存退出。

## 第二步：修改httpd-vhost.conf配置文件

接下来我们修改下虚拟主机配置文件，输入下面的命令：
```
sudo vim /etc/apache2/extra/httpd-vhost.conf
```
文件里面应该有2条默认的配置信息，可以删除或者改成自己的，那两条是示例，要记得删除，改下内容如下：
```
ServerAdmin mr.yu1991@gmail.com  
DocumentRoot "/Library/WebServer/Documents/theme-develop/"
ServerName www.helloyu.top
ServerAlias www.helloyu.top
  <Directory "/Library/WebServer/Documents/theme-develop/">
               Options Indexes FollowSymLinks MultiViews
               AllowOverride None
               Require all granted
  </Directory>
```
- `ServerAdmin` 邮箱地址随便写
- `DocumentRoot` 网站的根目录，可以配置多个站点目录
- `ServerName` 虚拟域名
- `ServerAlias` 虚拟域名
- `Directory` 控制文件目录权限

如果不配置`ServerAlias`就没办法运行。

## 第三步：修改hosts配置文件

运行如下命令：
```
sudo vim /etc/hosts
```
在文件最尾巴加上一句解析：
```
127.0.0.1        www.helloyu.top //刚配好的虚拟站点目录
```
保存退出，之后再重启Apache服务器：
```
sudo apachectl restart
```
还可以运行：
```
apachectl -S
```
`S`是大写，这个命令可以查看虚拟主机配置情况，之后在浏览器输入`www.helloyu.top`看看是不是可以运行了。
