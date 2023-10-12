---
title: "Kotlin在Android中的应用：Cold Flow和Hot Flow的区别"
date: "2023-08-31"
categories: 
  - "Android开发"
tags: 
  - "Android开发常见问题"
  - "Kotlin"
  - "Kotlin协程"
---

在 Kotlin 的 Flow 中，"冷流"（Cold Flow）和 "热流"（Hot Flow）是两种不同的数据流模型，分别用于处理不同的数据流场景。以下是它们的区别以及相应的代码示例。

### 冷流（Cold Flow）：

冷流是 Flow 的默认模式，每个收集者（collector）都会获得独立的数据流。每当有一个收集者开始收集数据流时，流的执行会开始，数据流会从头开始执行，而且每个收集者都会从头开始独立地执行流。每次新的收集操作都会重新执行一遍流。

**特点**：

- 每个收集者都有独立的数据流副本。

- 开始收集时会触发一次新的流执行。

以下是一个冷流示例：
```
fun getNumbersColdFlow(): ColdFlow<Int> {
    return someColdflow {
        (1..5).forEach {
            delay(1000)
            emit(it)
        }
    }
}

val numbersColdFlow = getNumbersColdFlow()

numbersColdFlow
    .collect {
        println("1st Collector: $it")
    }

delay(2500)

numbersColdFlow
    .collect {
        println("2nd Collector: $it")
    }

输出结果：

1st Collector: 1
1st Collector: 2
1st Collector: 3
1st Collector: 4
1st Collector: 5

2nd Collector: 1
2nd Collector: 2
2nd Collector: 3
2nd Collector: 4
2nd Collector: 5
```
可以看到两个收集器都收集到了完整的数据流，所以冷流是独享数据流的。

### 热流（Hot Flow）：

Flow 本质上是冷流，但你可以通过使用 `SharedFlow` 或 `StateFlow` 来模拟热流。热流是一种在数据产生后直接将数据推送给所有已注册的收集者的数据流。与冷流不同，热流是主动地推送数据给所有收集者，而不是在每次收集时重新执行流。

**特点**：

- 在数据产生后立即将数据推送给所有已注册的收集者。

- 所有收集者共享一份数据流副本。

以下是一个模拟热流的示例：
```
fun getNumbersHotFlow(): HotFlow<Int> {
    return someHotflow {
        (1..5).forEach {
            delay(1000)
            emit(it)
        }
    }
}

val numbersHotFlow = getNumbersHotFlow()

numbersHotFlow
    .collect {
        println("1st Collector: $it")
    }

delay(2500)

numbersHotFlow
    .collect {
        println("2nd Collector: $it")
    }

输出结果：

1st Collector: 1
1st Collector: 2
1st Collector: 3
1st Collector: 4
1st Collector: 5

2nd Collector: 3
2nd Collector: 4
2nd Collector: 5
```
可以看到第二个收集器收集的数据并不是完整的，他们共享同一个数据流，第二个收集器在2500毫秒以后才进行注册，所以只能收集到之后的信息。

参考资料：

《[Hot vs cold flows — Kotlin Coroutines](https://medium.com/@NickFan34818768/hot-vs-cold-flows-kotlin-coroutines-36853ce53352)》

《[Cold Flow vs Hot Flow](https://amitshekhar.me/blog/cold-flow-vs-hot-flow)》
