---
title: "Android开发常见问题：Android Studio[read time out]解决方法"
date: "2023-10-19"
categories:
 - Android开发
tags:
 - Android开发常见问题
---
因为在多平台开发，经常会重新拉取代码，或者更新依赖，在`gradle`构建的时候，会出现`read time out`的报错，在中国区有时候挂VPN也不好使，这时候可以试试设置阿里云代理，如下：
::: code-group
```kotlin [Kotlin]
pluginManagement {
    repositories {
        maven("https://maven.aliyun.com/repository/google")
        maven("https://maven.aliyun.com/repository/public")
        maven("https://maven.aliyun.com/repository/jcenter")
        google()
        mavenCentral()
        gradlePluginPortal()
        maven("https://www.jitpack.io")

    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven("https://maven.aliyun.com/repository/google")
        maven("https://maven.aliyun.com/repository/public")
        maven("https://maven.aliyun.com/repository/jcenter")
        google()
        mavenCentral()
        maven("https://www.jitpack.io")

    }
}
```
```groovy [Groovy]
buildscript {
    repositories {
        maven {
            url "https://maven.aliyun.com/repository/google"
        }
        maven {
            url "https://maven.aliyun.com/repository/public"
        }
        maven {
            url "https://maven.aliyun.com/repository/jcenter"
        }
        google()
        mavenCentral()
        gradlePluginPortal()
        maven {
            url "https://www.jitpack.io"
        }
    }
}

allprojects {
    repositories {
        maven {
            url "https://maven.aliyun.com/repository/google"
        }
        maven {
            url "https://maven.aliyun.com/repository/public"
        }
        maven {
            url "https://maven.aliyun.com/repository/jcenter"
        }
        google()
        mavenCentral()
        maven {
            url "https://www.jitpack.io"
        }
    }
}

```
:::
<!--more-->