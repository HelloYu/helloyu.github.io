---
title: "Linux增加SSH连接时间时长的方法-如何延长超时时间"
date: "2021-08-09"
categories: 
  - "Linux教程"
tags: 
  - "Linux"
coverImage: "SSH-increase-timeout.png"
---

不知道大家使用SSH连接服务器，管理服务器的时候，会不会经常遇到需要处理比较耗时的事情，或者去网络上找资料，再切回**Terminal终端**，SSH连接就断开，又要重新连接，非常的麻烦，我就经常遇到这种事，因为我的服务器都是Linux的，用**[SSH终端连接](https://www.helloyu.top/ssh-github-keygen-2021.html)**方法是最方便的，默认服务器和本地设置的保存会话时间过短，基本上3分钟没有新的动作，SSH就会自动断开，这里分享下如何延长SSH的最大保持时长。

## 服务器端SSH延长超时

拿Debian 10服务器和MacOS系统举例，首先是**Debian服务器**端，我们需要打开文件：

```bash
sudo vim /etc/ssh/sshd_config
```

打开之后，使用`/`搜索：

```vim
ClientAliveInterval
ClientAliveCountMax
```

这两个字段共同决定了客户端和服务器保持会话的超时时长，`ClientAliveInterval`字段是服务器间隔多少秒，向客户端发送心跳包，`ClientAliveCountMax`字段表示最大的发送尝试次数，比如我们要设置10分钟断开之内不好断开连接，可以设置成下面这样：

```vim
ClientAliveInterval 60
ClientAliveCountMax 10
```

修改保存，重新启动下SSH进程服务：

```bash
sudo systemctl restart sshd
```

## 客户端SSH增加连接时长

同样是修改SSH配置文件，本地的配置文件MacOS：

```bash
sudo vim /etc/ssh/sshd_config
```

拉到文件最底部，找到`Host` 字段：

```vim
ServerAliveInterval 1800
ServerAliveCountMax 3
```

这两个字段的含义和服务器端的含义差不多，这里就不多解释了根据自己的需要设置就行，这篇分享就到这，有什么问题给我留言。
