---
title: "从零开始创建一个PhotoApp使用CameraX和Compose：在Jetpack Compose中使用CameraX进行相机预览"
date: "2023-06-10"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
  - "CameraX"
coverImage: "CameraX.jpg"
---

这篇文章将建立在上一篇的基础上《[从零开始创建一个PhotoApp使用CameraX和Compose：在Jetpack Compose中使用Accompanist获取设备权限](https://www.seozen.top/building-photo-app-with-jetpack-compose-camerax-and-coroutines-part-one-device-permissions.html)》进行讲解，我们将会使用CameraX来使用相机的功能。

## CameraX

CameraX 是由 Google 推出的 Jetpack 库，用于简化将相机功能集成到 Android 应用程序中的过程。它提供了一个更高级和一致的 API，用于在不同的 Android 设备上访问相机，抽象了处理不同硬件和供应商特定相机 API 的复杂性，更多相关信息，访问官方[CameraX文档](https://developer.android.com/training/camerax)，或者看看官方的[CameraX Codelab](https://developer.android.com/codelabs/camerax-getting-started#3)。

## 相机预览实现

首先我们在Module层级的`build.gradle`写入CameraX的依赖库：
```
    implementation "androidx.camera:camera-camera2:$camerax\_version"
    implementation "androidx.camera:camera-lifecycle:$camerax\_version"
    implementation "androidx.camera:camera-view:$camerax\_version"
```
SEO禅用`camerax_version = '1.2.2'`的版本，你们自己根据需要选择版本，我们需要一个[CameraProvider](https://developer.android.com/reference/androidx/camera/core/CameraProvider)来提供相机的访问，直接对`Context`进行扩展：
```
suspend fun Context.getCameraProvider(): ProcessCameraProvider = suspendCoroutine { continuation ->
        ProcessCameraProvider.getInstance(this).also { future ->
            future.addListener({
                continuation.resume(future.get())
            }, executor)
        }
    }

val Context.executor: Executor
    get() = ContextCompat.getMainExecutor(this)
```
接下去我们需要一个View来预览相机的实时取景，需要使用[AndroidView](https://developer.android.com/jetpack/compose/migrate/interoperability-apis/views-in-compose)在Compose中使用PreviewView：
```
@Composable
fun CameraPreview(
    modifier: Modifier = Modifier,
    scaleType: PreviewView.ScaleType = PreviewView.ScaleType.FILL\_CENTER,
    cameraSelector: CameraSelector = CameraSelector.DEFAULT\_BACK\_CAMERA
) {
    val coroutineScope = rememberCoroutineScope()
    val lifecycleOwner = LocalLifecycleOwner.current
    AndroidView(
        modifier = modifier,
        factory = { context ->
            val previewView = PreviewView(context).apply {
                this.scaleType = scaleType
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH\_PARENT,
                    ViewGroup.LayoutParams.MATCH\_PARENT
                )
            }

            // CameraX Preview UseCase
            val previewUseCase = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(previewView.surfaceProvider)
                }

            coroutineScope.launch {
                val cameraProvider = context.getCameraProvider()
                try {
                    // Must unbind the use-cases before rebinding them.
                    cameraProvider.unbindAll()
                    cameraProvider.bindToLifecycle(
                        lifecycleOwner, cameraSelector, previewUseCase
                    )
                } catch (ex: Exception) {
                    Log.e("CameraPreview", "Use case binding failed", ex)
                }
            }

            previewView
        }
    )
}
```
这里的`factory`最后返回了previewView，这里主要是用了[PreviewView](https://developer.android.com/reference/androidx/camera/view/PreviewView)去显示相机的预览图，之后我们调用下就可以看到图像：
```
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PhotoAppWithCameraX\_ComposeTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background) {
                    val context = LocalContext.current
                    Permission(
                        permission = android.Manifest.permission.CAMERA,
                        rationale = "You said you wanted a picture, so I'm going to have to ask for permission.",
                        permissionNotAvailableContent = {
                            Column() {
                                Text("O noes! No Camera!")
                                Spacer(modifier = Modifier.height(8.dp))
                                Button(onClick = {
                                    context.startActivity(Intent(Settings.ACTION\_APPLICATION\_DETAILS\_SETTINGS).apply {
                                        data = Uri.fromParts("package", context.packageName, null)
                                    })
                                }) {
                                    Text("Open Settings")
                                }
                            }
                        }
                    ) {
                        CameraPreview()
                    }
                }
            }
        }
    }
}
```
![](https://www.seozen.top/wp-content/uploads/2023/06/b4f475d3f80f6506c5b64a76a277a8b-356x768.jpg?v=1686208424)

完整的代码可以访问：[AndroidCameraXWithJetpackCompose](https://github.com/HelloYu/AndroidCameraXWithJetpackCompose)
