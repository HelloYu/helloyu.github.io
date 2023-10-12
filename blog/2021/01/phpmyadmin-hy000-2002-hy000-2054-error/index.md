---
title: "phpMyAdmin安装HY000/2002和HY000/2054问题"
date: "2021-01-23"
categories: 
  - "MySQL开发"
tags: 
  - "MySQL"
  - "phpMyAdmin"
coverImage: "mysql.png"
---

最近在安装phpMyAdmin我用的是新版的MySQL v8，就出现了HY000/2002和HY000/2054，从网上搜了挺久，有的方法并不能解决，下面我提供的是我实验过可以解决的，当然可能用在你的环境也不一定可以。

## HY000/2002

如果在phpMyAdmin界面输出账号密码的时候出现下面的提示：
```
phpmyadmin mysqli\_real\_connect(): (HY000/2002): No such file or directory
```
可以试着打开`/Library/WebServer/Documents/phpmyadmin/`目录下的`config.inc.php`文件，然后将下面代码替换：
```
$cfg\['Servers'\]\[$i\]\['host'\] = 'localhost'; 
改成： 
$cfg\['Servers'\]\[$i\]\['host'\] = '127.0.0.1';
```
之后再刷新界面，再输出账号密码，估计可能就不会出现**HY000/2002**问题了。

## HY000/2054

`HY000/2002`问题可能是解决了，再输出账号密码，可能会出现`HY000/2054`问题，这是因为新版的**MySQL**在安装的时候我们选择了新的验证方式，**phpMyAdmin**还不兼容这种验证，所以要把我们账号的验证方式改回传统的验证，也就是`mysql_native_password`。
```
mysqli\_real\_connect(): The server requested authentication method unknown to the client \[caching\_sha2\_password\]

mysqli\_real\_connect(): (HY000/2054): The server requested authentication method unknown to the client
```
输入下面的代码，一般就能解决问题：
```
mysql -u root -p

mysql> use mysql;

ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql\_native\_password BY 'password';
```
看看问题是不是解决了，可以继续开心的使用phpMyAdmin了。
