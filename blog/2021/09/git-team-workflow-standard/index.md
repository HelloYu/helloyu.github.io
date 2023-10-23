---
title: "团队开发Git使用规范文档"
date: "2021-09-27"
categories: 
  - "项目管理"
tags: 
  - "Git"
coverImage: "git-team-workflow.png"
---

我来广州面试了一个星期，已经入职一家公司，现在从事前端工作，最近都在写一些团队协作开发文档，这篇是Git的使用规范文档，分享出来给有需要的朋友，如果有问题可以留言讨论。

## Git Commit Message提交规范

项目规模变大之后，从历史commit中寻找对应bug的message就会变的困难，遵循**commit message提交规范**就很有必要。

根据开发中遇到的业务场景，可以把Message的类型大致分为下面8种情况：

- feat -> feature的缩写，主要是业务中添加的功能
- fix -> bug修复
- refactor -> 代码调整，比如提交代码之后，需要修改，使用这个标识
- style -> 项目代码样式调整，不是CSS前端界面样式的意思，比如说删除空格，代码格式化等
- perf -> performance缩写，对于项目性能的修改
- docs -> 文档修改
- build -> 构建工具，辅助工具调整
- test -> 测试

几个常用场景举例示范：

### feat

```
git commit -m 'feat[知识管理]: 新增概览功能' // 这种格式较为清晰
```

### fix

```
git commit -m 'fix[知识管理]: 修复概览图标显示bug'
git commit -m 'fix[issue-520]: 修复知识管理概览图标显示bug'
```

### refactor

```
git commit -m 'refactor[知识管理]: 调整概览图标显示'
```

`[]`内填写模块名称，如果没有具体模块可以不写，直接使用`fix:`的格式，其他类型的使用同理。

## Git修复bug操作规范

如果出现Bug，不要在**dev分支**上直接修改，这样会影响正常的开发，需要新建临时分支，把Git分支功能使用好，会提高开发效率，分支能够把无关的代码隔离，能够快速定位Bug产生的原因。

### fixBug分支的创建

使用`git checkout -b [fixBug]`命令创建临时分支，这里`[]`的意思是自己填写的内容，如果在bug比较多的时候，这里的`[fixBug]`填写实际的bug编码，如`issue-520`，正常情况下，一批次的bug需要创建一个单独分支进行修改。

创建好临时分支之后，使用`git reset --hard [commit hash]`回退到相应的`commit`后，再进行修改，这里`[commit hash]`表示需要填写具体的commit哈希码，如`466182e9d64`，正常来说，只要复制头6位hash码就可以。

### bug修复操作示范

修复bug之后，重新提交`commit`，再合并分支就可以，示范操作：

```

git checkout -b issue-520

git reset --hard 466182e9d64

git add bugFixed.vue  // 添加修复的代码到Git暂存区

git commit -m 'fix[issue-520]:修复动态路由加载bug' // 添加代码到版本库

git switch dev-0.0.1 // 切换回开发分支

git merge --no-ff issue-520 // 合并bug修复分支
```

## Git Merge 冲突解决

如果改动过相同代码，就会遇到冲突，冲突的代码会被标识为如下形式：

```
<<<<<<< HEAD
code in dev branch
=======
code in issue-520 branch
>>>>>>> issue-520
```

`<<<<<<< HEAD` 与 `=======` 之间是当前分支的代码，`=======` 与 `>>>>>>> issue-520` 之间是待合并分支的代码，解决完冲突代码之后，删除这些符号，然后重新提交就可以。

## Git Stash 暂存工作内容

在开发中，有时候有临时任务，比如修改一个紧急bug，手头上的任务只做到一半，又不想添加一个`commit`，可以使用`git stash`命令，将内容先暂存起来，使用下面命令去暂存和恢复：

```

git stash \\ 将当前暂存区内容缓存

git stash pop  \\ 将之前工作内容恢复
```

暂存了现在工作内容后，切换到其他分支，或者又有新的工作内容要保存和恢复，使用如下命令操作：

```
git stash save "暂存内容描述信息" \\ 暂存工作内容

git stash list \\ 查看暂存列表

git stash apply stash@{0} \\ 恢复对应的暂存代码

git stash drop stash@{0} \\ 删除暂存

git stash clear \\ 清空暂存
```
