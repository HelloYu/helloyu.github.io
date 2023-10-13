---
date: '2023-09-15'
categories:
  - 'Android开发'
tags:
  - 'Android Compose开发'
coverImage: 'android-jetpack-paging3.jpg'
---
# Android Compose开发：使用Paging3进行分页加载
## Paging3 介绍

Paging 3 是 Android 架构组件的一部分，旨在帮助 Android 应用程序有效地管理和显示大量数据。它专门用于处理分页加载，可以轻松地从网络或本地数据库加载数据，并以分页的方式显示在用户界面上。以下是 Paging 3 的简单介绍：

### 1. 什么是 Paging 3？

Paging 3 是一种用于处理分页加载数据的库，旨在简化 Android 应用程序中数据的管理和显示。它是 Android 架构组件的一部分，旨在解决应用程序中大量数据的常见问题。

### 2. 核心概念

Paging 3 基于以下核心概念：

- **PagingSource：** 它定义了从数据源加载数据的规则。可以自定义 PagingSource，以根据自己的需求从网络、本地数据库或其他数据源加载数据。

- **PagingData：** 表示分页数据的容器。它包含了加载的数据以及与之相关的分页信息。

- **Pager：** Pager 是一个用于配置和创建分页数据源的工具。它接受一个 PagingSource 和配置信息，并生成一个可用于分页加载数据的流。

- **LazyPagingItems：** LazyPagingItems 是一种用于在 Jetpack Compose 中方便地处理分页数据的工具。它是由 Pager 创建的，允许按需加载数据并在 Composable 中显示。

### 3. 分页加载的优势

使用 Paging 3 有许多优势，包括：

- **内存效率：** Paging 3 使用了先进的数据加载和管理技术，可以有效地管理大量数据，减少内存消耗。

- **流畅的用户体验：** 通过分页加载，用户可以快速滚动和浏览大数据集，而不会导致应用程序的性能下降。

- **简化的数据管理：** Paging 3 简化了从数据源加载和显示数据的过程，减少了样板代码的编写。

### 4. 如何使用 Paging 3？

要使用 Paging 3，需要执行以下步骤：

1. 创建一个自定义的 PagingSource，定义如何从数据源加载数据。

2. 使用 Pager 配置并创建分页数据源。

3. 在 Jetpack Compose 中使用 LazyPagingItems 来加载和显示分页数据。

4. 根据需要添加分页加载的逻辑，例如加载更多数据或重新加载数据。

## Paging3 代码实例

### 步骤 1：添加依赖项

首先，确保在项目中添加了正确的依赖项。在 app 模块的 `build.gradle` 文件中添加以下依赖：

```
// 添加 Paging 3 的依赖
dependencies {
val paging_version = "3.2.1"

implementation("androidx.paging:paging-runtime:$paging_version")

// alternatively - without Android dependencies for tests
testImplementation("androidx.paging:paging-common:$paging_version")

// optional - RxJava2 support
implementation("androidx.paging:paging-rxjava2:$paging_version")

// optional - RxJava3 support
implementation("androidx.paging:paging-rxjava3:$paging_version")

// optional - Guava ListenableFuture support
implementation("androidx.paging:paging-guava:$paging_version")

// optional - Jetpack Compose integration
implementation("androidx.paging:paging-compose:3.2.1")
}
```

确保将版本号替换为自己所需的版本。

### 步骤 2：创建 PagingSource

创建一个自定义的 `PagingSource`，该源负责从数据源加载数据，这个类在 Paging3 中会被不断激活，进行数据更新。

```
import androidx.paging.PagingSource

class CustomPagingSource(private val api: YourApiService) : PagingSource<Int, YourDataItem>() {
override suspend fun load(params: LoadParams<Int>): LoadResult<Int, YourDataItem> {
try {
// 使用网络请求加载数据，params.key 可用于加载不同页的数据，这里根据后台 API 接口分页功能的设计来具体实现
val response = api.getData(pageNumber = params.key ?: 1) // 替换为您的网络请求

            val data = response.data
            val prevKey = if (params.key == 1) null else params.key?.minus(1)
            val nextKey = if (data.isNotEmpty()) params.key?.plus(1) else null

            return LoadResult.Page(
                data = data,
                prevKey = prevKey,
                nextKey = nextKey
            )
        } catch (e: Exception) {
            return LoadResult.Error(e)
        }
    }

override fun getRefreshKey(state: PagingState<Int, YourDataItem>): Int? {
return null
}
}
```

### 步骤 3：创建 Pager

使用自定义的 `PagingSource` 和 `PagingConfig` 创建一个 `Pager`。

```
val pagingSource = CustomPagingSource(api) // 替换为您的 PagingSource
val pagingConfig = PagingConfig(pageSize = 20)

val pager = Pager(
config = pagingConfig,
pagingSourceFactory = { pagingSource }
)
```

### 步骤 4：创建 Composable

在 Composable 中，使用 `collectAsLazyPagingItems` 扩展函数将分页数据转换为 `LazyPagingItems`。

```
val lazyPagingItems: LazyPagingItems<List<String>> = items.collectAsLazyPagingItems()
val state: LazyListState = rememberLazyListState()

LazyColumn(
modifier = modifier,
state = state
) {

        stickyHeader {
            HeaderRow(header, weights)
        }
        // 如果是老版本的Paging3这里的实现方式不同，自己根据版本来实现。
        items(
            count = lazyPagingItems.itemCount,
        ) { index ->
            val rowItems = lazyPagingItems[index]
            if (rowItems != null) {
                DataRow(
                    isScrollInProgress = state.isScrollInProgress,
                    showDeleteIcon = showDeleteIcon,
                    index = index,
                    rowItems = rowItems,
                    weights = weights,
                    keyColumn = keyColumn,
                    startColumn = startColumn,
                    onRowDeleted = onRowDeleted,
                    onRowClicked = onRowClicked
                )
            }
        }

        when (val state = lazyPagingItems.loadState.refresh) { //FIRST LOAD
            is LoadState.Error -> {
                //TODO Error Item
                //state.error to get error message
            }

            is LoadState.Loading -> { // Loading UI
                item {
                    Column(
                        modifier = Modifier
                            .fillParentMaxSize(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center,
                    ) {
                        Text(
                            modifier = Modifier
                                .padding(8.dp),
                            text = "加载中......"
                        )

                        CircularProgressIndicator(color = Color.Black)
                    }
                }
            }

            else -> {}
        }

        when (val state = lazyPagingItems.loadState.append) { // Pagination
            is LoadState.Error -> {
                //TODO Pagination Error Item
                //state.error to get error message
            }

            is LoadState.Loading -> { // Pagination Loading UI
                item {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center,
                    ) {
                        Text(text = "分页加载中......")
                        CircularProgressIndicator(color = Color.Black)
                    }
                }
            }

            else -> {}
        }
    }
```

以上是 Paging3 的最新版本实现，在发这篇文章的时候，如果有什么不懂的，可以留言评论。

参考资料：

[https://developer.android.com/reference/kotlin/androidx/paging/compose/LazyPagingItems](https://developer.android.com/reference/kotlin/androidx/paging/compose/LazyPagingItems)

[https://developer.android.com/jetpack/androidx/releases/paging](https://developer.android.com/jetpack/androidx/releases/paging)

[https://developer.android.com/topic/libraries/architecture/paging/v3-overview](https://developer.android.com/topic/libraries/architecture/paging/v3-overview)

[https://developer.android.com/topic/libraries/architecture/paging/v3-network-db](https://developer.android.com/topic/libraries/architecture/paging/v3-network-db)
