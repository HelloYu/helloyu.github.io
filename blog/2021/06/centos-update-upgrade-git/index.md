---
title: "2021在Centos7上使用YUM升级更新Git版本(Git 2.x )"
date: "2021-06-07"
categories: 
  - "Linux教程"
tags: 
  - "Git"
  - "Linux"
coverImage: "git-centos.png"
---

网站在部署到服务器的这个过程，有时候会非常麻烦，以前SEO禅都是用FTP或者用[`rsync`](https://en.wikipedia.org/wiki/Rsync)命令，现在因为Github私有仓库免费了，就直接使用Git来部署，修改后的源码只要`Push`到仓库里，再在服务器`Pull`下来，别说有多方便有多爽了，要是再使用Docker去部署服务器程序，那就是分分种搞定网站部署的事，以前要部署一个网站少说要个把小时，这篇文章主要是分享下在阿里云的ECS服务器如何更新**Git到2.x版本**。

## 更新方法

默认在Centos上使用`YUM`命令安装的Git版本是1.8x，在使用的时候会有些问题，有很多种更新办法，这里只分享最简单方便的一种，先运行如下命令看看Git的版本信息：

git --version
git version 1.8.3.1

如果这不是你想要的版本，那我们第一步要做的就是先移除Git，下面命令选一个：

sudo yum remove git\* // 删除所有git相关
或
sudo yum remove git // 只删除Git

之后安装相关的**RPM仓库**，运行如下命令：

sudo yum -y install https://packages.endpoint.com/rhel/7/os/x86\_64/endpoint-repo-1.7-1.x86\_64.rpm

再重新安装一遍Git，运行如下命令：

sudo yum install git

当出现提示的时候，输入`y`，完成安装，再看看安装后的Git版本：

git --version
git version 2.24.1

是不是非常简单，这样就可以愉快的PUSH!

参考链接：https://computingforgeeks.com/how-to-install-latest-version-of-git-git-2-x-on-centos-7/

各位是不是在比较靠前的位置看到SEO禅的这篇文章呢？有没有兴趣学习下SEO优化呢？收不收费啊？SEO禅是开源文化的推崇者，所有**SEO资源免费**免费分享给大家，那图啥？一个是自身技术的沉淀和提升，一个是可以帮助别人，当然有机会也可以进行合作，下面是一些关于SEO优化的文章，有兴趣可以看看：

- [SEO优化入门一篇就够-SEO教程（2021年最新）](https://www.seozen.top/seo-course-first-step.html "SEO优化入门一篇就够-SEO教程（2021年最新）")

- [什么是SEO外链？怎么做网站外链？](https://www.seozen.top/seo-external-links.html "什么是SEO外链？怎么做网站外链？")

- [SEO新手入门系列（一）：SEO金字塔](https://www.seozen.top/seo-tutorial-moz-serial-2021-outline.html)

- [2021最新网站排名SEO优化方案](https://www.seozen.top/seo-website-ranking-checklist.html)

希望SEO禅的文章对各位有所帮助，有什么不懂得可以留言评论。
