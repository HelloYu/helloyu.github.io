---
title: "从零开始创建一个PhotoApp使用CameraX和Compose：在Jetpack Compose中从图库选择照片"
date: "2023-06-15"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
coverImage: "android-gallery.png"
---

这篇文章是这个系列的最后一篇，前面一篇讲到如何使用CameraX对预览照片进行截图，这篇文章会在上一篇代码的基础上，来分享下如何从图库中选中一张照片，上篇文章中有下面这段代码：
```kotlin
val emptyImageUri = Uri.parse("file://dev/null")
Image(
  modifier = Modifier.fillMaxSize(),
  painter = rememberAsyncImagePainter(imageUri),
  contentDescription = "Captured image"
)
```
所以如果要显示图片，我们只要从图库中选中一张图片，然后转换成URI的形式就可以。
<!--more-->
## Manifest权限

首先我们要向`AndroidManifest.xml`文件加入下面的媒体访问权限：
```
<uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION" />
```
## 图库图片

之后我们还需要一个函数，来打开图库：
```kotlin
@Composable
fun GallerySelect(
    modifier: Modifier = Modifier,
    onImageUri: (Uri) -> Unit = { }
) {
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent(),
        onResult = { uri: Uri? ->
            onImageUri(uri ?: EMPTY_IMAGE_URI)
        }
    )
```
这里我们申明一个activity的Launcher，使用`SideEffect`方式来调用：
```kotlin
SideEffect {
    launcher.launch("image/*")
}
```
这将会过滤显示所有MIME为image类型的文件，也就是所有图片，在Android 10以上，需要申请权限，我们将代码改造下，完整如下：
```kotlin
@Composable
fun GallerySelect(
    modifier: Modifier = Modifier,
    onImageUri: (Uri) -> Unit = { }
) {
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent(),
        onResult = { uri: Uri? ->
            onImageUri(uri ?: EMPTY_IMAGE_URI)
        }
    )

    @Composable
    fun LaunchGallery() {
        SideEffect {
            launcher.launch("image/*")
        }
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        Permission(
            permission = Manifest.permission.ACCESS_MEDIA_LOCATION,
            rationale = "You want to read from photo gallery, so I'm going to have to ask for permission.",
            permissionNotAvailableContent = {
                Column(modifier) {
                    Text("O noes! No Photo Gallery!")
                    Spacer(modifier = Modifier.height(8.dp))
                    Row {
                        Button(
                            modifier = Modifier.padding(4.dp),
                            onClick = {
                                context.startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                                    data = Uri.fromParts("package", context.packageName, null)
                                })
                            }
                        ) {
                            Text("Open Settings")
                        }
                        // If they don't want to grant permissions, this button will result in going back
                        Button(
                            modifier = Modifier.padding(4.dp),
                            onClick = {
                                onImageUri(EMPTY_IMAGE_URI)
                            }
                        ) {
                            Text("Use Camera")
                        }
                    }
                }
            },
        ) {
            LaunchGallery()
        }
    } else {
        LaunchGallery()
    }
}
```
之后我们修改下调用代码：
```kotlin
class MainActivity : ComponentActivity() {
    @OptIn(ExperimentalPermissionsApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PhotoAppWithCameraX_ComposeTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background) {
                    var imageUri by remember { mutableStateOf(EMPTY_IMAGE_URI) }
                    if (imageUri != EMPTY_IMAGE_URI) {
                        Box() {
                            Image(
                                modifier = Modifier.fillMaxSize(),
                                painter = rememberImagePainter(imageUri),
                                contentDescription = "Captured image"
                            )
                            Button(
                                modifier = Modifier.align(Alignment.BottomCenter),
                                onClick = {
                                    imageUri = EMPTY_IMAGE_URI
                                }
                            ) {
                                Text("Remove image")
                            }
                        }
                    } else {
                        var showGallerySelect by remember { mutableStateOf(false) }
                        if (showGallerySelect) {
                            GallerySelect(
                                onImageUri = { uri ->
                                    showGallerySelect = false
                                    imageUri = uri
                                }
                            )
                        } else {
                            Box() {
                                CameraCapture(
                                    onImageFile = { file ->
                                        imageUri = file.toUri()
                                    }
                                )
                                Button(
                                    modifier = Modifier
                                        .align(Alignment.TopCenter)
                                        .padding(4.dp),
                                    onClick = {
                                        showGallerySelect = true
                                    }
                                ) {
                                    Text("Select from Gallery")
                                }
                            }
                        }
                    }

                }
            }
        }
    }
}

val EMPTY_IMAGE_URI: Uri = Uri.parse("file://dev/null")
```
![](images/94f2d0cdaefd20da6b2d92082794285-scaled.jpg)

到这里应该可以从图库中选图片了，这样一个图片APP的一些基础功能都算演示完了，后续就是根据自己的需要进行各种扩展了，完整的代码可以访问：[AndroidCameraXWithJetpackCompose](https://github.com/HelloYu/AndroidCameraXWithJetpackCompose)
