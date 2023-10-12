---
title: "WordPress解决MySQL：error establishing a database connection problem"
date: "2021-06-03"
categories: 
  - "WordPress教程"
tags: 
  - "Linux"
  - "MySQL"
  - "WordPress"
coverImage: "WordPress-manage-website-data.png"
---

SEO禅在使用WordPress上传图片的时候，遇到**error establishing a database connection problem**，查看了MySQL的错误日志，文件位置一般在`/var/log/mysqld.log`，看到一段话：out of memory,Cannot allocate memory for the buffer pool，因为SEO禅这个服务器才1GB的内存，MySQL自然就分配不到太多的内存，所以没有多余内存分配给MySQL也很正常，既然知道哪里有问题，那我们就来解决它，有两种解决办法：

- 增加swap虚拟内存
- 修改innodb\_buffer\_pool\_size大小

这里SEO禅选择增加`swap虚拟内存`，因为实际内存就1G，如果增加了`innodb_buffer_pool_size`的大小，其它应用的内存肯定会分配的少了，[虚拟内存](https://www.baidu.com/link?url=Z8_gPEcgWfyfITo_faaKf1HbpKqsri0vwMVYIPoZfH1DT_dL7tngKb9UlY96bUBtlveobwKogdFNl8gGTd-wdR5GJRCLGCA85fDCbtdO7CB6kWT4CpxHtYXCyLc6aZvg&wd=&eqid=d3147db6000012e70000000660a7808c)使用的是硬盘空间，合理的分配虚拟内存可以减少服务器压力，提升服务器响应速度。

## swap虚拟文件

首先使用`swapon -s`查看下Linux服务器有没有配置过swap虚拟内存，如果已经配置了会显示：

\[root@SEOZEN.top ~\]# swapon -s
Filename				Type		Size	Used	Priority
/swapfile                              	file	1023996	0	-2

没有配置就不会有任何显示信息，如果没有创建首来创建一个swap文件：

dd if=/dev/zero of=/swapfile bs=1024 count=1024000

修改下文件权限：

sudo chmod 600 /swapfile

## 使用swap文件

使用如下命令来告诉系统，使用我们刚才创建的文件作为`swap文件`：

sudo mkswap /swapfile

使用这个文件：

sudo swapon -f /swapfile
sudo swapon -s

## 开机生效

让这个文件永久生效，使用vim编辑`/ect/fstab`文件，加下如下代码：

sudo vim /etc/fstab
/swapfile   swap    swap    sw  1023996   1023996

参考链接：https://blog.csdn.net/turbock/article/details/102692693
