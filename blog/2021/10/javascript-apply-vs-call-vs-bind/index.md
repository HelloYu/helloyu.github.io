---
title: "Javascript基础：Apply vs Call vs Bind 三者的区别，超级简单一看就会"
date: "2021-10-12"
categories: 
  - "Web前端开发"
tags: 
  - "JavaScript"
  - "前端开发"
coverImage: "apply-vs-call-vs-bind.png"
---

刚学前端的朋友，如果使用一些框架，在框架里就经常会看到今天这篇文章要介绍的三兄弟：apply，call，bind，我也经常把他们搞混了，网上的资料很多，但是个人感觉大多数都没说到点上，而且看的比较头晕，其实他们之间的区别很简单，这篇文章不长，但希望对你理解这三个家伙有所帮助。

## 共同特点

首先介绍下这三个函数的共同特点：绑定上下文（this）的执行环境，比如说：

```
let person = {name:"我"}

function applyTest(){
  console.info(this.name)
}

applyTest.apply(person) // 我
applyTest.call(person) // 我
let bindTest = applyTest.bind(person)

bindTest()  // 我
```

第一眼看过去的话，apply和call基本是一样的，其实他们就是差不多的，多数情况都是可以相互替换，他们唯一不同就是参数的格式有区别，这个后面介绍你们自己一看就懂了，这里唯一不同的就是`Bind`，它返回一个绑定了上下文执行环境的新函数，可以在以后使用的时候再调用。

## Function.prototype.apply()

前面已经介绍他们共同特点的时候已经简单演示了apply的用法，但是上面没有使用参数，apply接受的参数是数组，或者[类数组对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)，如：

```
const numbers = [5, 6, 2, 3, 7];

// 这里的this传的是null，执行环境是全局对象window
const max = Math.max.apply(null, numbers); 

console.log(max); // 7
```

## Function.prototype.call()

Call和Apply的区别就是参数的形式不同，如：

```
call(thisArg, arg1, ... , argN)

let person = {name:"我"}

function applyTest(arg1,arg2){
  console.info(this.name)
  console.info(arg1) // 我是参数1
  console.info(arg2) // 我是参数2
}

applyTest.call(person,"我是参数1","我是参数2")
```

## Function.prototype.bind()

Bind上面已经说过了，返回一个新的函数，参数可以使用apply和call任意一种方式，如：

```
let person = {name:"我"}

function applyTest(arg1,arg2){
  console.info(this.name) // 我
  console.info(arg1) // 我是参数1
  console.info(arg2) // 我是参数2
}

// 方式一
let bindTest = applyTest.bind(person,"我是参数1","我是参数2")
bindTest() 

// 方式二
let bindTest = applyTest.bind(person)
bindTest("我是参数1","我是参数2")

// 方式三
applyTest.bind(person,["我是参数1","我是参数2"])
function applyTest(arg1,arg2){
  console.info(this.name) // 我
  console.info(arg1) // ["我是参数1","我是参数2"]
  console.info(arg2) // undefined
}
```

bind的使用方式比较多样，他们区别应该看到这会明白了吧？具体使用场景就看情况了，有什么不懂得就留言评论。
