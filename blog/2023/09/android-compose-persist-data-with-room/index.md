---
title: "Android Compose开发：使用Room实现数据持久存储"
date: "2023-09-02"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
coverImage: "Android-Compose-room.png"
---

当在 Jetpack Compose 中使用 Room 数据库时，你可以充分利用 Compose 的声明式 UI 和 Room 的持久化数据管理能力，来构建具有响应式特性的应用程序。本文将为你提供一个完整的 Room 在 Compose 中使用的示例，以帮助你了解如何集成这两个强大的库。

## 步骤一：添加依赖

首先，在项目的 `build.gradle` 文件中添加 Room 的依赖：
```
implementation "androidx.room:room-runtime:2.4.0"
kapt "androidx.room:room-compiler:2.4.0"
```
## 步骤二：定义实体类

创建 Room 数据库的实体类，这些实体类将映射到数据库中的表。
```
@Entity(tableName = "task\_table")
data class Task(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val description: String,
)
```
## 步骤三：创建DAO接口

创建用于访问数据库的 DAO（Data Access Object）接口。
```
@Dao
interface TaskDao {
    @Query("SELECT \* FROM task\_table")
    fun getAllTasks(): Flow<List<Task>>

    @Insert
    suspend fun insertTask(task: Task)
}
```
## 步骤四：创建Room数据库

创建 Room 数据库，将实体类和 DAO 接口与数据库关联。
```
@Database(entities = \[Task::class\], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun taskDao(): TaskDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app\_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
```
## 步骤五：创建Repository

创建一个 Repository，用于将数据库操作封装起来，提供给 ViewModel 使用。
```
class TaskRepository @Inject constructor(private val taskDao: TaskDao) {

    fun getAllTasks(): Flow<List<Task>> {
        return taskDao.getAllTasks()
    }

    suspend fun insertTask(task: Task) {
        taskDao.insertTask(task)
    }
}
```
## 步骤六：创建ViewModel

创建一个 ViewModel，用于管理数据和与数据库交互。
```
@HiltViewModel
class TaskViewModel @Inject constructor(private val taskRepository: TaskRepository) : ViewModel() {

    val allTasks: Flow<List<Task>> = taskRepository.getAllTasks()

    fun insertTask(task: Task) {
        viewModelScope.launch {
            taskRepository.insertTask(task)
        }
    }
}
```
## 步骤七：在Composable中使用Room数据

在 Composable 函数中使用 Hilt 的 `hiltViewModel()` 函数来获取 ViewModel，并从 ViewModel 中获取 Room 数据。
```
@Composable
fun TaskListScreen(viewModel: TaskViewModel = hiltViewModel<TaskViewModel>()) {
    val tasks by viewModel.allTasks.collectAsState()

    Column {
        // 显示任务列表
        LazyColumn {
            items(tasks) { task ->
                Text(text = task.title)
            }
        }

        // 添加任务按钮
        Button(onClick = {
            viewModel.insertTask(Task(title = "New Task", description = "Description"))
        }) {
            Text("Add Task")
        }
    }
}
```
## 结论

通过将 Room 数据库与 Jetpack Compose 集成，你可以创建具有响应式特性的应用程序，轻松管理和展示持久化数据。本文中的示例演示了 Room 在 Compose 中的完整使用过程，从定义实体类、创建 DAO 接口到最终在 Composable 中展示数据，希望能够帮助你更好地理解和应用这些功能。

参考资料：

[https://developer.android.com/jetpack/androidx/releases/room#kts](https://developer.android.com/jetpack/androidx/releases/room#kts)

[https://developer.android.com/training/data-storage/room#kts](https://developer.android.com/training/data-storage/room#kts)

[https://developer.android.com/courses/pathways/android-basics-compose-unit-6-pathway-2](https://developer.android.com/courses/pathways/android-basics-compose-unit-6-pathway-2)

[https://developer.android.com/codelabs/basic-android-kotlin-compose-persisting-data-room#0](https://developer.android.com/codelabs/basic-android-kotlin-compose-persisting-data-room#0)
