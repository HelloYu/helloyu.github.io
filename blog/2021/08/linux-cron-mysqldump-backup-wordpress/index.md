---
title: "Linux入门：使用cron自动备份WordPress MySQL数据库"
date: "2021-08-11"
categories: 
  - "Linux教程"
  - "MySQL开发"
tags: 
  - "Linux基础知识"
  - "MySQL基础"
  - "WordPress"
coverImage: "linux-mysql-backup-cron-job.png"
---

作为**SEO站长**，定时备份**网站数据库**是必须要会，也一定要做的事，我前面已经写过一篇文章简单介绍[Linux定时任务程序Cron](https://www.helloyu.top/linux-cron-jobs.html)，今天就来实际使用cron定时自动备份WordPress的MySQL数据库，定时备份数据库一般有两个操作，首先是按一个间隔实际备份导出[MySQL数据库](https://www.helloyu.top/mysql57-help-command-2021.html)到特定位置存放，其次是要定期删除冗余的数据库备份文件，今天我分享下，如何在**Centos服务器**上定时备份数据库。

## 创建MySQL备份目录

正常情况，在Linux中，比如日志文件，会随着时间推移不断增加大小的文件，都喜欢放在`/var`路径下，也可以放在个人目录`~/`下，我选择在个人目录下创建一个数据库备份目录，运行如下命令：

```
mkdir ~/seozen_database_backup
```

这里目录你们自己取名，如果不是使用`root`管理员账号登录的，还需要把目录权限修改下，不然使用`mysqldump`的时候会提示权限不足。

## MySQLDump使用说明

mysqldump看名字感觉有点像倒垃圾的意思，但是却是[备份MySQL数据库](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)的程序，使用它，我们可以备份单个数据库，多个数据库，单个表，多个表，也可以备份远程数据库，功能一定都不像它名字听上去那么『垃圾』，首先和我来看看语法：

```
mysqldump -u [username] –p[password] [database_name] > /path/to/[database_name].sql
```

看着像不像`mysql -u [username] -p[password]`?这里要注意的是`-p`后面跟的密码和`mysql`登录时候一样，也是紧跟其后，中间没有空格的，后面就是要备份的数据库名称了，然后使用重定向符号`>`导出到特定的路径去保存。

## MySQL备份示例

### 备份数据库

```
mysqldump -u root -p[password] --all-databases > /var/seozen_database_backup/all-databases.sql
```

上面这条命令是备份所有的数据库到`seozen_database_backup`目录中，注意关键的地方是：一定要使用`root`用户权限。备份单个数据库的命令就是上面最开始的时候那个，这里我就不再介绍，下面介绍下备份多个数据库的命令：

```
mysqldump -u root -p[password] [database_1_name] [database_2_name] >  ~/seozen_database_backup/[database_names].sql
```

这条命令是把多个数据库打包成一个**sql文件**，注意这里用户权限的问题，如果不确定，直接使用**root账号**。

### 备份数据库表

备份单个数据库表，运行如下命令：

```
mysqldump -u root -p[password] [database_name] [table_name] >  ~/seozen_database_backup/[table_name].sql
```

备份多个数据库表和备份多个数据库是一样的，这里就不多介绍。

## Gzip压缩MySQL备份文件

平时如果数据库比较大，我们需要使用`Gzip`程序进行打包操作：

```
mysqldump -u root -p[password] [database_name] | gzip -c > ~/seozen_database_backup/[database_name].sql.gz
```

## SQL文件恢复数据库

备份了数据库，就要知道如何还原数据库，也很简单，只要把**Linux重定位符**的方向改一下就好：

```
mysql -u [username] –p[password] [database_name] < ~/seozen_database_backup/[database_name].sql
```

MySQL使用**mysqldump备份和恢复**数据库就暂时介绍这么多，下面我们来看看**如何定时备份MySQL数据库**。

## 定时WordPress备份任务

上面已经分享了备份和恢复MySQL数据库，现在来讲下使用Cron定时备份任务，Cron是Linux的定时服务程序，而`crontab`有两个意思：一个是管理定时任务的程序，一个是cron**定时任务存放的表叫作crontab**，具体可以看看我写的[](https://www.helloyu.top/linux-cron-jobs.html)[Linux定时任务程序Cron](https://www.helloyu.top/linux-cron-jobs.html)介绍，里面对语法会介绍的比较多点，下面我们就来实现下备份定时：

```
sudo crontab -e
```

首先我们使用**crontab定时任务管理程序**，打开**crontab定时任务表**，然后在最底部，加入定时任务内容：

```
00 02 * * * mysqldump -u root -p[password] [database_name] | gzip -c > ~/seozen_database_backup/[database_name].sql.gz
```

`00 02`表示在早上凌晨2点备份数据库，注意这里的`[]`是要删除换成你们自己的信息的，不要把内容填在框里。之后到目录下查看有没有文件，如果**没有备份文件**，查看下系统的错误日志：

```
less /var/log/cron
```

如果其中有一条错误信息是：

```
-bash: syntax error near unexpected token `)'
```

表示你的密码里面有`)`符号，我们需要进行转义才行，使用`\)\`对括号进行转义操作。

## 实际环境备份数据库

跟着[我](https://www.helloyu.top/)分享的内容，做到这步应该是能够自动定时备份数据库了，但是还是不够完善，前面我们直接把密码写在**crontab表**里，当这个任务执行的时候，要是正好有其他用户使用`ps ax`命令是可以看到密码的，我们可以把密码存放在`my.cnf`文件中，然后使用`--defaults-extra-file=/path/to/.my.cnf`参数加载进来，首先我们先创建文件：

```
sudo vim ~/.my.cnf
```

之后添加下面两条命令：

```
[mysqldump]
password=YOUR_PASSWORD_HERE
```

上面的密码改成自己的，然后我们在使用`crontab -e`修改下定时任务表：

```
00 02 * * * mysqldump --defaults-extra-file=~/.my.cnf -u root [database_name] | gzip -c > ~/seozen_database_backup/wp_seozen.`date +\%Y-\%m-\%d`.sql.gz
```

这里我加入时间字段来显示备份时间`date +%Y-%m-%d`，比如**2021-07-30**这种格式，方便区分，到这里朋友们应该清楚如何定时备份了吧，下一篇我要分享如何定时删除冗余的数据库，还有**Shell指令脚本化**，今天我们从最开始的创建目录到最后都是手动输入的命令，如果手头上就一个服务器在管理可能不要紧，如果很多服务器那需要使用**shell脚本**去批量执行才行，有什么不懂得可以留言评论。
