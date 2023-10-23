---
title: "[转载]Dockerfile和docker-compose.yml文件的区别？"
date: "2023-04-04"
categories: 
  - "Docker学习"
tags: 
  - "Docker入门学习"
---

# 明确概念

Dockerfile 是拿来构建自定义镜像的，并没有直接生成容器。只是可以在运行镜像时运行容器而已。  
做容器编排以部署环境，是使用 docker-compose.yml 文件进行的，里面可能会需要用到 Dockerfile 。

# 总结

Dockerfile是用来构建镜像的，若是想使用这个镜像的话还需要使用docker run命令来运行这个镜像，从而生成运行一个容器  
docker-compose.yml是用来编排项目（服务-我）的，里面包含使用各种镜像创建的容器服务，使用的镜像可以是网络上的，也可以是根据使用Dockerfile文件来生成的镜像，相当于是把上一步的这个工作给做了(在docker-compose.yml中的服务，可以引用编写好的Dockerfile文件作为Image镜像-我)

> docker-compose.yml使用的镜像可以是网络上的，具体是这样的，优先使用本地存在的镜像，本地没有的话才会从 Docker Hub网站上下载，若想直接使用私有仓库镜像，则需要事先从私有仓库镜像给拉取到本地才行

## Dockerfile

把每一层修改、安装、构建、操作的命令都写入一个脚本，用这个脚本来构建、定制镜像，这个脚本就是 Dockerfile。

Dockerfile 部分指令：
```
// FROM 指定基础镜像
FROM nginx

// RUN 执行命令。每一条 RUN 都会生成一层，一个需求尽量使用&&，这样就减少了 RUN ，即减少了分层
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
RUN yum update && yum install -y vim python-dev

// COPY: 源路径下的 package.json 复制到新一层的镜像路径/usr/src/app
COPY package.json /usr/src/app/

// WORKDIR 指定工作目录。指定下层工作的目录为容器内的/data,尽量使用绝对目录
WORKDIR /data

// ADD 添加，ADD能自动解压文件。以下例子最终 hello 在/data/test 下
WORKDIR /data
ADD hello test/ 

// COPY 拷贝  与ADD类似，只是不能解压缩文件。
WORKDIR /DATA
COPY hello test/

// CMD 执行命令
CMD \["python", "app.py"\]

// ENV 设置环境变量 定义 NAME=Happy Feet,那么之后就可以使用 $NAME 来执行了 
ENV VERSION=1.0 DEBUG=on NAME="Happy Feet" // VOLUMES挂载

// EXPOSE 端口暴露 
EXPOSE <端口1> \[<端口2>...\]

### Dockerfile 文件示例

// 1、创建 Dockerfile
mkdir mynginx
cd mynginx
vim Dockerfile

// 2、输入以下内容并保存：
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html

// 在 Dockerfile 目录下执行，生成新的自定义 images
docker build -t nginx:v3 .
```
## Docker-compose

docker-compose 是官方开源项目，负责实现对 Docker 容器集群的快速编排，部署分布式应用。通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）

### 安装docker-compose：

mac 和 win 下已经默认装好了。而 linux 下得手动安装。这里采用二进制包的方式
```
$ sudo curl -L https://github.com/docker/compose/releases/download/1.26.0/docker-compose-\`uname -s\`-\`uname -m\` > /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose

// 测试 docker-compose
$ docker-compose --version
```
### 一般使用步骤

1、创建一个空目录。  
2、定义 Dockerfile，方便迁移到任何地方  
3、编写 docker-compose.yml 文件  
4、运行 docker-compose up 启动服务

### docker-compose 使用举例

下面我们用 Python 来建立一个能够记录页面访问次数的 web 网站。  
1.建一个空目录：`mkdir -p /data/test`  
2.在该空文件下建立 app.py，输入以下内容：
```
from flask import Flask
from redis import Redis

app = Flask(\_\_name\_\_)
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    count = redis.incr('hits')
    return 'Hello World! 该页面已被访问 {} 次。\\n'.format(count)

if \_\_name\_\_ == "\_\_main\_\_":
    app.run(host="0.0.0.0", debug=True)
```
3.编写 Dockerfile 文件：
```
FROM python:3.6-alpine
ADD . /code
WORKDIR /code
RUN pip install redis flask
CMD \["python", "app.py"\]
```
4.编写 docker-compose.yml 文件
```
version: '3'
services:

  web:
    build: .
    ports:
     - "5000:5000"

  redis:
    image: "redis:alpine"
```
> 此时该空目录下共有：app.py、Dockerfile、docker-compose.yml 文件

5.执行 docker-compose 项目
```
docker-compose up
```
### yml 模板文件的说明：
```
version: '3'
services:
    phpfpm:
    image: yoogr/phpfpm:0.0.1
    container\_name: ct-phpfpm
    build:
      context: .
      dockerfile: Dockerfile
    expose:
      - "9000"
    volumes:
      - ${DIR\_WWW}:${DIR\_WWW}:rw
      - ./conf/php/php.ini:/usr/local/etc/php/php.ini:ro
      - ./conf/php/php-fpm.d/www.conf:/usr/local/etc/php-fpm.d/www.conf:rw
      - ./conf/supervisor/conf.d:/etc/supervisor/conf.d/:ro
      - ./log/php-fpm/:/var/log/php-fpm/:rw
      - ./log/supervisor/:/var/log/supervisor/:rw
    command: supervisord -n
    links:
      - mysql:mysql
      - redis:redis
```
**每个 service 代表一个 container，container 可以通过 dockerhub的 image 来创建，也可以从本地的 Dockerfile build 出来的镜像来创建。**  
某个服务需要用到 Dockerfile build 出来的镜像，则在 docker-compose 里面指明 build 的文本位置和文件名  
yml 文件可以指定 volume 和 network

如下，是一个使用了 network 和 volumes 参数的例子（放在与 service 同层的关系）：
```
version: '3.0'

services:

  wordpress:
    image: wordpress
    ports:
      - 8080:80
    environment:
      WORDPRESS\_DB\_HOST: db
      WORDPRESS\_DB\_PASSWORD: examplepass
    network:
      - my-bridge

  db:
    image: mysql:5.7
    environment:
      MYSQL\_DATABASE: wordpress
      MYSQL\_ROOT\_PASSWORD: 123456
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my-bridge

volumes:
  my-data

networks:
  my-bridge:
    driver:bridge
```
网络和卷的定义类似于 docker network create 和 docker volume create。如果你没有指定连接network，那么才会使用 link。

转载自：https://www.cnblogs.com/hahaha111122222/p/13186899.html
