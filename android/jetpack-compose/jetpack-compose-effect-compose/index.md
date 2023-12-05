---
title: "Android Compose开发：SideEffect在Compose中的应用"
date: "2023-08-18"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
---

## 什么是Side Effect?

"Side effect"（副作用）是指函数或表达式的执行引发的与函数返回值无关的外部变化。换句话说，副作用是对函数外部环境造成的影响，这些影响不仅仅是函数返回的结果。

在编程中，副作用可以包括但不限于：

1. **修改全局变量：** 函数修改了在函数范围之外定义的变量或状态。

3. **I/O 操作：** 函数进行了输入/输出操作，如读写文件、数据库操作、网络请求等。

5. **UI 更新：** 函数直接或间接地修改了用户界面，例如在图形界面中更新文本、颜色或图像。

7. **异常抛出：** 函数抛出了异常，影响了程序的正常执行流程。

9. **改变传入的参数：** 函数修改了传递给它的参数的值。

在函数式编程范式中，强调避免或最小化副作用，以提高代码的可维护性、可预测性和可测试性。函数式编程倾向于将代码编写成无副作用的纯函数，这种函数只依赖于输入参数，不会修改外部状态，也不会引起任何不必要的影响。

在 Android Jetpack Compose 中，鼓励遵循无副作用的编程风格，使得 Composable 函数只专注于生成界面的呈现，而不去进行与界面展示无关的操作。这有助于构建更清晰、可测试和可维护的用户界面代码。

## LaunchedEffect函数

在Compose API中`LaunchedEffect`函数是最经常使用的一个`side effect` API，`LaunchedEffect` 是 Android Jetpack Compose 中的一个函数，用于在 Composable 函数的生命周期内处理异步操作，例如启动协程执行耗时的操作。它会在 Composable 函数首次计算时启动一个协程，并在 Composable 重新计算时自动取消该协程，以避免内存泄漏和不必要的协程运行。

`LaunchedEffect` 的主要作用是在 Composable 函数中处理副作用，比如执行异步操作，而又不需要手动管理协程的取消。以下是 `LaunchedEffect` 的示例用法：
```
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val data by viewModel.data.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadData() // Perform asynchronous operation
    }

    // UI components to display data
}
```
在这个示例中，当 `MyScreen` Composable 函数首次计算时，`LaunchedEffect` 会启动一个协程来调用 `viewModel.loadData()` 方法，从而执行异步的数据加载操作。当 `MyScreen` Composable 重新计算时，之前的协程会自动取消，以避免不必要的执行。

`LaunchedEffect` 是一个非常有用的工具，它简化了在 Composable 中处理异步操作的流程，并确保在 Composable 的生命周期内处理副作用。使用 `LaunchedEffect` 可以更轻松地管理异步操作，提高代码的可读性和可维护性。

这里我们可以看到LaunchedEffect(Unit)中传递了一个`Unit`参数，这代码这个函数只会执行一次，
```
@Composable
fun MyScreen() {
    LaunchedEffect(Unit) {
        // 这个效果将在 MyScreen 首次被计算时启动。
        // 在 MyScreen 重新计算时不会再次启动。
        // 适用于一次性的初始化、数据加载、注册回调等副作用。
    }
}
```
这个示例中，`LaunchedEffect` 的 `key` 参数设置为 `Unit`，确保副作用只在首次启动时执行。这对于一些只需要在启动时执行一次的操作非常有用。

在 `LaunchedEffect` 中，参数 `key` 是用来区分不同的副作用作用域的。这个参数可以是任何类型的值，用于在 Composable 重新计算时判断是否应该启动新的副作用。

`LaunchedEffect` 的签名如下：
```
@Composable
fun LaunchedEffect(key: Any?, effect: suspend () -> Unit)
```
`key` 参数用于标识不同的副作用。当 Composable 重新计算时，如果新的 `key` 与旧的 `key` 相同，说明副作用作用域仍然是相同的，不需要重新启动新的副作用。如果新的 `key` 与旧的 `key` 不同，就会启动新的副作用。

## `DisposableEffect`函数

`DisposableEffect` 是 Android Jetpack Compose 中的一个函数，用于处理与 Composable 函数执行期间的资源分配和清理相关的操作。它可以在 Composable 首次计算时注册资源（如回调、监听器等），并在每次重新计算时取消注册，以确保资源的正确分配和释放。

你可以在以下情况下使用 `DisposableEffect`：

1. **资源注册和注销：** 当你需要在 Composable 首次计算时注册一个资源（如添加监听器、注册广播接收器等），并在 Composable 重新计算时取消注册，以避免资源泄漏。
```
@Composable
fun MyScreen(callback: () -> Unit) {
    DisposableEffect(Unit) {
        // 在 Composable 首次计算时注册资源
        callback()

        // 在 Composable 重新计算时取消注册
        onDispose {
            // 取消资源注册或执行资源释放操作
        }
    }

    // UI components
}
```
2. **Composable 生命周期中的操作：** 当你需要根据 Composable 的生命周期执行一些操作时，可以使用 `DisposableEffect` 来处理。例如，你可能需要在 Composable 首次计算时启动一个定时器，并在 Composable 重新计算时取消定时器。
```
@Composable
fun MyScreen() {
    val timer = remember { Timer() }

    DisposableEffect(Unit) {
        timer.start()

        onDispose {
            timer.cancel()
        }
    }

    // UI components
}
```
总之，`DisposableEffect` 可以用来在 Composable 的生命周期内管理资源的注册和注销，以确保资源的正确分配和释放。它是处理与 Composable 生命周期相关的副作用的有用工具。

## rememberCoroutineScope函数

前面介绍的两个Side Effect函数都是在Composable函数内使用的，有时候我们的代码需要在非Composable函数中去执行，那我们可以使用`rememberCoroutineScope`去调用异步函数：
```
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val coroutineScope = rememberCoroutineScope()

    Button(onClick = {
        coroutineScope.launch {
            viewModel.performAsyncOperation()
        }
    }) {
        Text("Perform Async Operation")
    }

    // UI components
}
```
## rememberUpdatedState函数

当在 Composable 函数内部捕获状态时，由于闭包中的状态引用在 Composable 重新计算时不会更新，可能会导致出现问题。`rememberUpdatedState` 是 Android Jetpack Compose 中的一个函数，旨在帮助你解决这个问题，确保状态在闭包中的正确捕获。

通常，`rememberUpdatedState` 在闭包内部用于确保状态在 Composable 重新计算时的正确性，以避免由于旧状态引用而导致的不正确的结果。这对于在 Composable 中处理状态时非常有用，尤其是当状态在闭包中进行操作时。

使用 `rememberUpdatedState` 时，它会创建一个包装器，允许你在闭包中使用状态的最新值。这样，无论闭包在 Composable 重新计算时是否被重新执行，状态的引用都会保持最新。这可以确保你在闭包中使用的状态值是正确的。
```
@Composable
fun LandingScreen(onTimeout: () -> Unit) {
    // 这将始终引用 LandingScreen 重新计算时最新的 onTimeout 函数
    val currentOnTimeout by rememberUpdatedState(onTimeout)

    // 创建一个效果，与 LandingScreen 的生命周期匹配。
    // 如果 LandingScreen 重新计算，延迟不应重新开始。
    LaunchedEffect(true) {
        delay(SplashWaitTimeMillis)
        currentOnTimeout()
    }

    /\* 登录屏幕内容 \*/
}
```
## SideEffect函数

在 Android Jetpack Compose 中，`SideEffect` 是一个函数，用于处理在 Composable 函数中产生的副作用，例如界面更新、异步操作、资源分配和清理等。由于 Composable 函数是声明式的，会在 UI 展示状态发生变化时进行重新计算，因此任何在 Composable 函数内部产生的副作用都应该通过 `SideEffect` 函数来处理，以确保代码的可预测性和正确性。

以下是一个简单的示例，展示了如何使用 `SideEffect` 来处理副作用：
```
@Composable
fun CounterApp() {
    var count by remember { mutableStateOf(0) }

    SideEffect {
        // 在这里处理副作用，例如界面更新、异步操作等
        // 该部分的代码会在 Composable 重新计算时执行
    }

    Button(onClick = { count++ }) {
        Text("Increment Count")
    }
}
```
在这个示例中，`SideEffect` 函数用于处理与界面更新或其他副作用相关的操作。在 `SideEffect` 内部，你可以执行任何需要在 Composable 重新计算时进行的操作，例如更新界面元素、启动协程、执行异步操作等。这样可以确保这些操作在 Composable 重新计算时得到正确处理，而不会导致不一致的结果。

总之，`SideEffect` 是 Android Jetpack Compose 中用于处理副作用的一种方式，它确保副作用在 Composable 函数中得到正确管理和执行，以保证界面更新和操作的一致性。

大多数情况下，我们知道这几个函数就可以处理好在Compose中异步调用的情况，想要了解其他的函数，可以参考官网关于[Side-effect](https://developer.android.com/jetpack/compose/side-effects)的文章。
