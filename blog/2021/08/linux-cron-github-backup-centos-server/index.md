---
title: "如何使用cron定时备份Linux Centos7服务器数据到Github"
date: "2021-08-25"
categories: 
  - "Linux教程"
tags: 
  - "Git"
  - "Linux基础知识"
  - "网站安全优化"
coverImage: "linux-backup-git-github.jpg"
---

在前一篇文章SEO禅分享了如何使用cron命令去**备份MySQL数据库**，这篇文章要分享下，如何定时把服务器数据远程备份到Github上去，Github免费了私库，那是真的香，很多以前很麻烦的操作，现在用github作为中转同步，就变的方便不少。

## 备份前准备

首先我们使用的是Git程序，肯定要先下载git，如果是Centos服务器，可以使用**Yum命令下载**，当然如果你下载之后发现不是2.x版本的git，可以看看SEO禅之前写的在[centos7上升级git](https://www.seozen.top/centos-update-upgrade-git.html)的文章，因为我们使用的是SSH的方式去连接Github，所以要先搞定[怎么用ssh连接github](https://www.seozen.top/ssh-github-keygen-2021.html)，这里为了方便，在生成ssh秘钥的时候，**不要输入密码**，直接为空，完成上面两个操作，就可以继续下面的操作了。

## 准备Github仓库

我们要在github上线创建一个**Github私有仓库**，这步应该不需要太多的讲解吧，要是不懂得话就留言吧，记住复制和使用的是SSH的URI地址，不要复制错了，然后到服务器需要备份的文件夹，初始化或者克隆下仓库到本地都是可以的，这是git基本操作命令，如果有不懂得就自己搜索下。

## 编写Shell备份脚本

在前面SEO禅写的[Linux入门：使用cron自动备份WordPress MySQL数据库](https://www.seozen.top/linux-cron-mysqldump-backup-wordpress.html)最后提到，要使用shell脚本去执行自动化备份任务，今天我们就先写一个超级简单的Git备份脚本，代码如下：

```
#!/bin/bash
cd ~/seozen_database_backup/ # 进入你要备份的git目录
git add . && git commit -m "$(date)" && git push origin main 
```

没错就三行指令，第一行指令是告诉系统使用哪个脚本执行程序，第二行就是前一篇里面自动备份MySQL数据库的路径，第三行就是常用的git命令，这里的commit message使用备份的日期。

## 设置自动备份任务

把上面那段代码保存为一个脚本文件，这里SEO禅就命名为`sql_backup.sh`文件，你们自己想命名什么自己随便了，不懂怎么创建文件？可以看看[Linux入门：Vim使用技巧](https://www.seozen.top/linux-vim-tips.html)，还需要为创建的shell文件添加执行权限：

```
chmod +x sql_backup.sh
```

之后我们先运行下shell脚本看看能不能执行：

```
./sql_backup.sh
[root@www.seozen.top seozen_database_backup]# ./sql_backup.sh
[main 3286fee] Thu Aug 19 12:34:40 CST 2021
 1 file changed, 1 insertion(+), 1 deletion(-)
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 653 bytes | 653.00 KiB/s, done.
Total 6 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 1 local object.
To github.com:seozen/seozen.top-sql.git
   0f4750c..3286fee  main -> main
```

到这我们就可以使用`crontab -e`命令去编辑定时任务表，加入新的自动备份任务：

```
00 01 * * 2  ~/sql_backup.sh >> ~/cron_log.log 2>&1
```

上面的指令看不懂？可以看看[Linux入门：Cron计划任务](https://www.seozen.top/linux-cron-jobs.html)这篇文章，大概表达的是在每个星期二凌晨1点执行这个shell脚本文件，然后把输出日志到cron\_log文件中去。

## 将SSH-Agent加入开机启动

我们前面把SSH秘钥加入给SSH-Agent管理，但是其实有个问题，就是秘钥是再内存中的，如果服务器重启，那个秘钥就需要重新加入，这时候我们可以把下面这两段代码加入`~/.bashrc`文件，如果像SEO禅一样使用的是zsh命令程序，可以加入`~/.zshrc`文件中：

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

OK拉，到这里基本就是可以自动备份服务器数据到Github了，这里的Shell脚本只备份了一个位置，可以再加点代码同时备份多个位置的数据，如果没有Github私库，备份数据到远程存储还是比较麻烦的，这篇文章就分享到这，有什么不懂得留言评论。
