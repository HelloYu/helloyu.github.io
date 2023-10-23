---
title: "Jetpack Compose介绍"
date: "2023-10-15"
categories:
 - Android开发
tags:
 - Android Compose开发
 - Android Jetpack
---

Jetpack Compose 是 Android 官方推出的现代化 UI 工具包，它允许你使用 Kotlin 构建声明式的用户界面。本文将为你提供 Jetpack Compose 的快速入门指南，让你了解如何创建简单的 Composable 函数、构建用户界面以及处理用户交互。

### 步骤 1：设置项目

首先，确保你的 Android 项目已配置为使用 Jetpack Compose。你需要在项目的 `build.gradle` 文件中添加 Compose 相关依赖：

```
android {
    ...
    buildFeatures {
        compose true
    }

    composeOptions {
        kotlinCompilerExtensionVersion '1.0.0-rc1'
    }
}

dependencies {
    ...
    implementation "androidx.compose.ui:ui:1.0.0-rc1"
    implementation "androidx.compose.material:material:1.0.0-rc1"
    implementation "androidx.activity:activity-compose:1.3.0-rc01"
}
```
::: tip
因为Compose还在不断地开发演进，所以版本众多，最近Google出了一个BOM的方式批量的方式去决定依赖版本，可以参考使用[Using the Bill of Materials](https://developer.android.com/jetpack/compose/bom)
:::
<!--more-->
### 步骤 2：创建 Composable 函数

在 Jetpack Compose 中，你的用户界面是通过 Composable 函数构建的。创建一个简单的 Composable 函数，如下所示：

```kotlin
import androidx.compose.foundation.layout.Column
import androidx.compose.material.Text
import androidx.compose.runtime.Composable

@Composable
fun SimpleComposable() {
    Column {
        Text(text = "Hello, Jetpack Compose!")
    }
}
```

上面的代码创建了一个名为 `SimpleComposable` 的 Composable 函数，它在界面上显示一条文本消息。

### 步骤 3：设置界面

要在你的应用程序中显示 Composable 函数，你需要在 `setContent` 中设置界面。通常，这是在 `MainActivity` 的 `onCreate` 方法中完成的。

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.myapp.ui.theme.MyAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                // 在这里添加你的 Composable 函数
                SimpleComposable()
            }
        }
    }
}
```

### 步骤 4：运行应用程序

现在，你可以运行你的应用程序并查看 Jetpack Compose 创建的用户界面。在你的 `SimpleComposable` 函数中添加更多的 Composable 元素，以构建更复杂的用户界面。

这只是一个简单的快速入门指南，帮助你了解如何开始使用 Jetpack Compose。Jetpack Compose 提供了丰富的 UI 组件和功能，以支持更复杂的应用程序界面，包括处理用户输入、列表和导航等。

为了更好地了解 Jetpack Compose 的功能和使用方法，可以查看官方文档和示例代码。祝你在使用 Jetpack Compose 开发应用程序时获得成功！

参考资料：
[](https://developer.android.com/jetpack/compose/setup)