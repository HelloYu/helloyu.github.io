---
title: "如何在Linux（Centos）服务器上部署Docker项目（NestJS）"
date: "2023-07-31"
categories: 
  - "Docker学习"
  - "Linux教程"
tags: 
  - "Docker入门学习"
  - "Linux"
  - "NestJS入门"
coverImage: "docker-nestjs.jpg"
---

我现在所有的服务端都是基于Docker开发，所以在上线部署的时候也是使用Docker，最近对一个项目的服务端进行重构了下，要上新的服务器，这里就记录分享下整个过程。

## 安装Docker在Linux

我使用的服务器是Centos，可以直接YUM来安装，这也是[Docker官网推荐安装方式](https://docs.docker.com/engine/install/centos/#install-using-the-repository)：
```
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
安装完成后我们启动Docker服务：
```
systemctl start docker
```
之后运行下命令测试下：
```
sudo docker run hello-world
```
## 安装Git

项目都是通过Git私有仓库同步的，所以需要安装下Git:
```
sudo yum install git
```
安装好后，发现并不能直接拉仓库的数据，因为还没授权，可以参考[Git如何配置SSH](https://www.helloyu.top/ssh-github-keygen-2021.html)这篇文章。

## 使用Docker脚本部署

现在Docker也有了，Git也有了，只要使用docker-compose文件，我们就能把服务起起来，比如说我们起一个MongoDB的服务，配置信息如下：
```
\# Use root/example as user/password credentials
version: '3.1'

services:
  mongodb-main:
    image: mongo
    hostname: seozen-mongodb-main
    restart: always
    ports:
      - 27018:27017
    environment:
      MONGO\_INITDB\_ROOT\_USERNAME: root
      MONGO\_INITDB\_ROOT\_PASSWORD: root
    volumes:
      - /var/seozen/data/seozen-mongodb-main:/data/db/seozen-mongodb-main
    networks:
      - seozen-mongodb-main-network

networks:
  seozen-mongodb-main-network:
    name: seozen-mongodb-main-network
```
我们再创建一个脚本文件：
```
echo "\[deploy\]: start deploy......"
git pull
docker compose down
docker compose up --build -d
echo "\[deploy\]: deploye ended......"
```
只要在服务器上运行：
```
sh deploy.sh
```
就会自动帮你拉取文件，并重新部署拉，是不是很方便，用docker的好处就是可移植性很强，不用担心版本依赖不同的问题，只要一个配置文件，全部搞定，大家可以举一反三的使用哦。
