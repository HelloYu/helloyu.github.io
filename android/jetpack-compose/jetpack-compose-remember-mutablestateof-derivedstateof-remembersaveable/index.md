---
title: "Android Compose开发：remember、mutableStateOf、derivedStateOf 和 rememberSaveable理解 Compose 中的状态管理"
date: "2023-09-10"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
coverImage: "jetpack-compose-remember.jpg"
---

Jetpack Compose 是一个现代的 Android UI 工具包，它引入了许多新的概念和技术来构建动态、响应式的用户界面。其中一个关键概念是状态管理，Compose 提供了一些工具来帮助我们管理和维护界面的状态。在本文中，我们将深入探讨 Compose 中的四个重要概念：`remember`、`mutableStateOf`、`derivedStateOf` 和 `rememberSaveable`。

## 1. remember

`remember` 是 Compose 中的一个函数，它用于创建一个可记忆的组件。这意味着无论组件如何重新构建，该组件都会保留其状态。这在需要在组件生命周期之间保持数据的情况下非常有用。以下是一个示例：
```kotlin
var count by remember { mutableStateOf(0) }
```
在上述示例中，`count` 是一个可记忆的状态，它将保留在组件重新构建时的值。这允许我们在组件之间共享数据并确保其状态的一致性。

## 2. mutableStateOf

`mutableStateOf` 是用于创建可变状态的 Compose 函数。它返回一个 `State` 对象，用于存储和更新状态。这个状态可以在组件内部使用，并且在状态更改时会触发重新组合。以下是一个示例：
```kotlin
var textState by mutableStateOf("Hello, Compose!")
```
在上述示例中，`textState` 是一个可变的状态，可以通过修改它来更新文本。每当 `textState` 更改时，与其关联的组件将重新组合以反映新的状态。

在Compose中，如果使用 `mutableStateOf` 创建的可变状态没有使用 `remember` 包装，它的值将在每次组件重新组合（recompose）时重置。这是因为Compose默认会重新创建组件实例，如果没有使用 `remember`，则会在每次重新创建时初始化状态。

以下是一个示例，说明了这种情况：
```kotlin
@Composable
fun MutableStateWithoutRememberDemo() {
    // 没有使用 remember 包装的 mutableStateOf，在重新组合时会重置
    var count = mutableStateOf(0)

    Column {
        Text(text = "Count: ${count.value}")

        Button(onClick = { count.value++ }) {
            Text(text = "Increment")
        }
    }
}
```
在上述示例中，`count` 是一个没有使用 `remember` 包装的 `mutableStateOf`，因此每次重新组合时，`count` 的值都会重置为0。这意味着每次点击按钮时，计数都会从零开始。

如果你希望状态在重新组合时保持不变，应该使用 `remember` 包装：
```kotlin
@Composable
fun MutableStateWithRememberDemo() {
    // 使用 remember 包装的 mutableStateOf，在重新组合时保持不变
    var count by remember { mutableStateOf(0) }

    Column {
        Text(text = "Count: $count")

        Button(onClick = { count++ }) {
            Text(text = "Increment")
        }
    }
}
```
在上述示例中，`count` 使用 `remember` 包装，因此其值在重新组合时不会重置，可以正确地保持其状态。

## 3. derivedStateOf

`derivedStateOf` 是一个用于派生状态的 Compose 函数。它允许我们创建一个新的状态，该状态依赖于其他状态的变化。当依赖状态发生变化时，派生状态会自动更新。以下是一个示例：
```kotlin
val fullName = derivedStateOf {
    "$firstName $lastName"
}
```
在上述示例中，`fullName` 是一个派生状态，它依赖于 `firstName` 和 `lastName` 状态。当其中任何一个状态发生变化时，`fullName` 会重新计算。

## 4. rememberSaveable

`rememberSaveable` 用于创建可记忆的状态，但与 `remember` 不同，它还可以将状态保存在 `SavedStateHandle` 中，以便在应用程序进程被销毁和重建时恢复状态。这对于保存应用程序状态非常有用。以下是一个示例：
```kotlin
val selectedTabIndex = rememberSaveable { mutableStateOf(0) }
```
在上述示例中，`selectedTabIndex` 是一个可记忆的状态，它将保存在 `SavedStateHandle` 中，以便在进程重建时恢复。

### 总结

Jetpack Compose 提供了多种用于状态管理的工具，每个工具都有不同的用途和适用场景。理解 `remember`、`mutableStateOf`、`derivedStateOf` 和 `rememberSaveable` 的差异和用法对于构建响应式和可维护的用户界面至关重要。正确使用这些工具可以帮助我们在 Compose 中有效地管理状态，并创建出令人印象深刻的用户体验。无论是保持界面的一致性还是处理应用程序的持久性数据，这些工具都是 Compose 应用程序开发的不可或缺的一部分。

参考资料：

[https://developer.android.com/jetpack/compose/state](https://developer.android.com/jetpack/compose/state)

[https://stefma.medium.com/jetpack-compose-remember-mutablestateof-derivedstateof-and-remembersaveable-explained-270dbaa61b8](https://stefma.medium.com/jetpack-compose-remember-mutablestateof-derivedstateof-and-remembersaveable-explained-270dbaa61b8)

[https://medium.com/androiddevelopers/jetpack-compose-when-should-i-use-derivedstateof-63ce7954c11b](https://medium.com/androiddevelopers/jetpack-compose-when-should-i-use-derivedstateof-63ce7954c11b)
