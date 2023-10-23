---
title: "前端开发命名规范文档"
date: "2022-01-06"
categories: 
  - "Web前端开发"
  - "项目管理"
tags: 
  - "前端开发"
coverImage: "frontend-naming-conventions.jpeg"
---

这篇文章是我在推进前端团队命名规范总结整理的，这里分享给各位，有需要的朋友可以看看，有什么问题可以留言评论。

## 命名方法论介绍

现在市面上流行的几中命名方法有如下5种：

### 驼峰命名法(camelCase)

驼峰命名是最常用的一种命名方法，通常被用在，函数，变量，如：

```
getUser()
let userInfo = {}
let isLogin = false
```

### 帕斯卡命名法(PascalCase)

帕斯卡命名方法一般常见于Class类、接口、组件等，如：

```
class Person {}
interface Animal{}
PersonComponent.vue //vue组件
```

### 短横线命名法(kebab-case)

短横线命名方法一般常见于HTML、CSS、文件名等，如：

```
<router-view /> // html标签
<body data-theme-dark ></body> // HTML属性（attribute）
.header-margin-top // CSS class语义化命名
.mt-30 // CSS class工具化(utility-first)命名
views/sub-directory/file-name.js //普通目录和js文件
```

### 下划线命名法(SNAKE\_CASE )

下划线命名方法一般常见于Python，PHP，数据库表字段等，在前端，我们通常使用下划线命名方法来命名常量，如：

```
let MAX_TIMEOUT = 5000 // 5s
let NODE_ENV: '"development"',
```

### 匈牙利命名法(Hungarian notation)

匈牙利命名方法的基本格式：变量名=属性+类型+对象描述，如：

```
let sUsername = 'string类型变量'
let iAge = 3 // int类型变量
let g_sUsername = '全局string类型' // 这里的g_是全局变量的属性定义，s是变量类型
```

此方法的出现是过去IDE还不太智能的时候，对类型的跟踪和判断并不准确，随着IDE的不断演进和越来越智能，这种方法已经慢慢退出历史舞台。

## 常见命名规范

上面说的是命名的方法论，学会了方法论并不能代表你有良好的命名习惯，下面介绍几种常用的命名规范作为参考。

### 函数命名

一般函数使用驼峰命名（camelCase）方法，命名规范遵循：**动词+名词**的方式，如：

```
canEditRole() // 判断是否有编辑角色权限，通常情况函数不能使用两个动词，这里的can是助动词
editRole() // 编辑角色
isLogin() // 判断是否登录
hasRole(role) // 判断是否拥有某个角色
getRoles(user) // 获取用户角色
setRoles(roles) // 设置用户角色
```

下面是常用的函数命名**动词列表**：

- get 获取/set 设置，add 增加/remove 删除，create 创建/destory 销毁
- is/has/can/contains 是否拥有某些特性，功能
- start 启动/stop 停止，launch 启动/run 运行，begin 开始/finish/end 结束
- open 打开/close 关闭，read 读取/write 写入，load 载入/save 保存
- backup 备份/restore 恢复，import 导入/export 导出，split 分割/merge 合并
- inject 注入/extract 提取，attach 附着/detach 脱离，bind 绑定/separate 分离
- view 查看/browse 浏览，edit 编辑/modify 修改，select 选取/mark 标记，copy 复制/paste 粘贴
- undo 撤销/redo 重做，insert 插入/delete 移除，clean 清理/clear 清除，index 索引/sort 排序
- find 查找/search 搜索，increase 增加/decrease 减少，play 播放/pause 暂停
- compile 编译/execute 执行，debug 调试/trace 跟踪，observe 观察/listen 监听
- build 构建/publish 发布，input 输入/output 输出
- encode 编码/decode 解码，encrypt 加密/decrypt 解密，compress 压缩/decompress 解压缩，pack 打包/unpack 解包，
- connect 连接/disconnect 断开，send 发送/receive 接收，download 下载/upload 上传，
- refresh 刷新/synchronize 同步，update 更新/revert 复原，lock 锁定/unlock 解锁
- submit 提交/commit 交付，push 推/pull 拉，expand 展开/collapse 折叠
- enter 进入/exit 退出，abort 放弃/quit 离开，obsolete 废弃/deprecate 废旧,
- collect 收集/aggregate 聚集，parse 解析/resolve/ reject拒绝

上面动词只是作为参考，有些意思相近，在团队开发的时候最好规定一套动词规范，至于名词最好使用有意义的英文，能不缩写就不缩写，因为不是每个人都懂你的缩写是什么意思，除非有完善的对照表。

### 变量属性命名

除了函数命名规范外，另一个常见的就是变量和属性命名规范，这里推荐使用**定语+名词**的形式，如：

```
fileName
maxSize
```

其中file和max都是定语，表示这个变量的作用范围，在为变量取名字的时候，时态也需要考虑进去，比如说：

```
isConnected // 有过去时态，表示是否已经连接
isConnecting // 现在进行时，表示正在连接
isConnect // 没有时态，不知道是已经连接还是正在连接，有歧义
```

如果英文不太好可以使用翻译，或者统一使用中文拼音，但是不要中英文混用。
