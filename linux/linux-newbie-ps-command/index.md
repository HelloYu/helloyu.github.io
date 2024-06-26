---
title: "Linux入门：PS进程状态快照"
date: "2021-04-16"
categories: 
  - "Linux教程"
tags: 
  - "Linux"
  - "Linux日常命令"
  - "Linux基础知识"
coverImage: "PS-Command-in-Linux.png"
order: 1
---

刚接触Linux，经常看到一个缩写就是`PS`当然和制图的PS(PhotoShop)不是同一个PS，正如我们知道的Linux是多用户操作系统，同时需要运行多个进程(Process)来满足多个用户的需求，所以有时候我们需要管理自己的程序，就要知道当前系统上程序的运行状态，每个程序都会被表示为一个进程的形式，**PS(Process Status)**这个程序就是专门来查看进程状态信息的，今天和我一起来学习下如何使用PS管理我们的Linux服务器。

## 如何使用PS命令

ps [OPTIONS]

后面跟着`options`可以设置一些参数查看更多的信息，因为历史的原因，可以添加三种不同的参数形式：

- UNIX 方式，跟一个`-`
- BSD方式，不跟`-`
- GNU方式，跟`--`

如果不跟任何参数，多数情况只会有两行四列的信息，一行是`shell`本身，一行是在运行PS时，当前shell运行的进程信息，像下面这样：
```bash
 PID TTY          TIME CMD
1809 pts/0    00:00:00 bash
2043 pts/0    00:00:00 ps
```
可以看到有四列信息，它们分别代表：

- `PID`：进程ID，一般情况下用户查看进程状态最重要的就是看进程ID是多少，可以进行`kill操作`
- `TTY`：当前进程运行在哪个终端(Terminal)下
- `TIME`：当前进程所占用的CUP时间
- `CMD`：当前进程启动命令

上面这点信息看上去好像并没有什么用，`ps`命令的功能可不止这些，上面说到后面可以跟`options`参数，这才是PS命令强大的地方。

## 最常用的AUX参数

经常会在网上看到PS后面跟`aux`这三个参数，这是PS最常用的组合：

- `a`\-显示所有用户的进程
- `u`\-显示进程的详细信息
- `x`\-显示系统进程

这些参数会显示的信息就要多的多，会有11列的数据，如下：
```bash
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.8  77616  8604 ?        Ss   19:47   0:01 /sbin/init
root         2  0.0  0.0      0     0 ?        S    19:47   0:00 \[kthreadd\]
...
```
前面已经讲过4列头部的意思，其它几个意思如下：

- `USER`：这个进程属于哪个用户
- `%CPU`：CPU的使用率
- `%MEM`：内存的使用率
- `VSZ`：虚拟内存使用情况
- `RSS`：物理内存使用情况
- `STAT`：进程状态信息，如 `Z` (zombie), `S` (sleeping), and `R` (running)
- `START`：进程什么时候运行的

通常情况下我们用aux参数就可以了，如果需要搜索特定的信息，可以使用`grep`命令去过滤，这个命令我会另写一篇文章来介绍，还有其它的参数使用可以使用`man ps`来查看。
