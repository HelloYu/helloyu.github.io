---
title: "MySQL 5.7简明教程2021（二）：创建和使用数据库"
date: "2021-04-08"
categories: 
  - "MySQL开发"
tags: 
  - "MySQL教程"
coverImage: "mysql5.7.png"
---

这是《2021MySQL 5.7简明教程》系列的第二篇文章，前一篇已经讲了一些基本的MySQL使用帮助，以及如何登录MySQL数据库，下面就来讲讲如何使用其它命令来使用数据库。

## 查看数据库

正常情况下，一个用户都会有多个数据库，`root`用户可以查看管理所有的数据库，我们可以通过`show databases;`命令来查看自己有多少个数据库：
```
mysql> SHOW DATABASES; 
+----------+
| Database | 
+----------+
| mysql    |
| test     |
| tmp      |
+----------+
```
如果不是管理员账号是看不到MySQL这个数据库的，你们是不是要问这个MySQL命令SEO禅哪找的？前一篇《[2021MySQL 5.7简明教程（一）：使用MySQL Help](https://www.seozen.top/mysql57-help-command-2021.html)》文章介绍了`help`的使用，其中这个命令是在`Administration`下，按顺利输入`help contents`\>`help Administration`就能看到：
```
mysql> help Administration
You asked for help about help category: "Administration"
For more information, type 'help <item>', where <item> is one of the following
topics:
   BINLOG
   CACHE INDEX
   FLUSH
   HELP COMMAND
   KILL
   LOAD INDEX
   RESET
   RESET PERSIST
   RESTART
   SET
   SET CHARACTER SET
   SET CHARSET
   SET NAMES
   SHOW
   SHOW BINARY LOGS
   SHOW BINLOG EVENTS
   SHOW CHARACTER SET
   SHOW COLLATION
   SHOW COLUMNS
   SHOW CREATE DATABASE
   SHOW CREATE EVENT
   SHOW CREATE FUNCTION
   SHOW CREATE PROCEDURE
   SHOW CREATE SCHEMA
   SHOW CREATE TABLE
   SHOW CREATE TRIGGER
   SHOW CREATE USER
   SHOW CREATE VIEW
   SHOW DATABASES
   ......
```
所以以后使用到的命令基本都是可以用`help`指令来找到的，如果找不到，那就是你找的不够，下面SEO禅就不会再提怎么去找这些指令了。

## use使用数据库

知道自己有多少个数据库，我们就可以对某个数据库进行CRUD(create创建，retrieve检索，update更新，delete删除)操作，首先我们需要使用`use`指令去切换到相应的数据库下，这个命令非常的常用，输入`help`之后默认就显示在第一个列表中，我们使用这个指令切换到`test`数据库：
```
mysql> USE test 
Database changed
```
现在可以在`test`数据库中进行你想执行的操作，比如说建表，查询表，插入数据等，但是别人可能会对你的操作执行其它操作，所以通常情况下，管理员会对数据库进行授权操作，把相应的权限给相应的用户：

mysql> GRANT ALL ON menagerie.\* TO 'your\_mysql\_name'@'your\_client\_host';

其中`menagerie`是数据库名称`.*`代表此数据库下所有的表`To`就是授权给哪个`用户@客户端`，我是怎么知道的？还是`help`看的。

## Create创建数据库

我们已经知道使用`use`命令来切换数据库，那我们现在就来新建一个数据库：
```
mysql> CREATE DATABASE menagerie;
```
注意在创建数据库的时候最好使用全小写字母，`unix`系统下是大小写敏感的，如果你有时候时候小写有时候使用驼峰命名或者其它什么方式，都是容易出现混乱的情况，所以最好还是保持命名规则一致，统一使用小写字母去命名数据库。

我们每次登录的时候都需要使用`use`命令来切换数据库，这有时候就有点麻烦，其实可以直接在登录的时候就指定数据库的名称，登录后就会直接切换到数据库：
```
shell> mysql -h host -u user -p menagerie
```
当你已经切换到一个数据库进行工作的时候，有时候不确定是不是自己的目标数据库，可以运行下面这条指令来确认当前使用的数据库：
```
mysql> select database();
+------------+
| database() |
+------------+
| wp\_develop |
+------------+
1 row in set (0.00 sec)
```
这篇文章先介绍到这里，下一篇文章SEO禅会介绍如何操作数据库表等内容，参看《MySQL 5.7简明教程2021（三）：操作数据库表》
