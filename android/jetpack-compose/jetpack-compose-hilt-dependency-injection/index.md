---
title: "Android Compose开发：使用Hilt实现依赖注入管理"
date: "2023-09-01"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
coverImage: "android-compose-hilt-dependency-injection.png"
---

当在 Jetpack Compose 中使用 Hilt 时，可以充分发挥依赖注入的优势，使你的应用更加模块化、可维护和可测试。本文将为你介绍如何在 Compose 中使用 Hilt 进行依赖注入，以及其优势和常见用法。
## 什么是Hilt？

Hilt 是由 Google 推出的一种依赖注入框架，专为 Android 应用程序设计。它基于 Dagger，旨在简化依赖注入的设置和管理。Hilt 在应用程序的各个层次提供了依赖注入，从而使得代码更具可测试性和可维护性。
<!--more-->

## Hilt在Compose中的优势

1. **模块化和可测试性：** Hilt 的依赖注入帮助你将应用程序的不同部分解耦，使得组件可以更容易地替换和测试。在 Compose 中，这意味着你可以在组合函数中注入依赖项，而不必关心手动构建依赖关系。

3. **简化依赖管理：** Hilt 可以帮助你自动管理依赖项的生命周期，从而减少手动管理的繁琐工作。这在 Compose 中尤其有用，因为 Compose 的组合函数可能会在多次重建中使用相同的依赖项。

5. **适应性：** Hilt 与 Compose 和其他 Jetpack 组件无缝集成，使得在整个应用程序中使用依赖注入变得更加自然和一致。

## 使用Hilt在Compose中的步骤

### 第一步：添加依赖

在项目的 `build.gradle` 文件中添加 Hilt 的依赖：
```
plugins {
  id 'kotlin-kapt'
  id 'com.google.dagger.hilt.android'
}

dependencies {
    implementation "com.google.dagger:hilt-android:2.x"
    kapt "com.google.dagger:hilt-android-compiler:2.x"
}

// Allow references to generated code
kapt {
  correctErrorTypes true
}
```
### 第二步：创建Hilt Application

创建一个继承自 `Application` 的 Hilt Application 类，并在类上添加 `@HiltAndroidApp` 注解，除此之外还需要给`activity`组件加上`@AndroidEntryPoint`注解，还有别忘记修改`AndroidManifest.xml文件`：
```
import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApplication : Application()

@AndroidEntryPoint
class MainActivity : ComponentActivity() 

// AndroidManifest.xml
<application
    android:name=".MainApplication"
```
### 第三步：定义依赖项

使用 Hilt 的注解来定义你的依赖项，如 `@Module`、`@Provides` 等。
```kotlin
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
object MyModule {
    @Provides
    fun provideMyDependency(): MyDependency {
        return MyDependencyImpl()
    }
}
```
### 第四步：在Compose中使用依赖

在需要注入依赖的 Composable 函数上使用 `@HiltViewModel` 注解，并使用 `viewModel()` 函数来获取注入的 ViewModel。
```kotlin
import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import dagger.hilt.android.lifecycle.HiltViewModel

@HiltViewModel
class MyViewModel @Inject constructor(private val myDependency: MyDependency) : ViewModel() {
    // ViewModel代码
}

@Composable
fun MyComposable() {
    val viewModel: MyViewModel = hiltViewModel()
    // 使用注入的ViewModel和依赖项进行UI构建
}
```
参考资料：

《[Dependency injection with Hilt](https://developer.android.com/training/dependency-injection/hilt-android)》
