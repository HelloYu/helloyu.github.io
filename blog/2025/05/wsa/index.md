---
title: "Windows 11 安卓子系统 (WSA) 安装及 APK 部署指南"
date: "2025-05-27"
categories: 
  - "计算机那点事"
---
因为想在windows11上安装一些安卓上的炒股软件，看了一大圈很多都是无效的，windows现在自带了一个`WSA`子系统，可以无缝安装安卓应用，后面在github上找了一个[WSA Toolbox 最新版](https://github.com/jakenicholls-au/wsa-toolbox/releases)，安装打开以后，界面最下面有一个链接点击进去可以安装的，顺便我用DeepSeek生产了一段下面的文章内容，还没有验证是不是完整可用，先mark在这边，后面如果需要再装再测试，但是上面的github链接是可以的装的，就是要安装apk的时候，最新的WSA要打开开发者模式，还有就是USB调试。

## 一、安装 Windows Subsystem for Android (WSA)

### 1. 准备工作
- **系统要求**：
  - Windows 11 22H2 (Build 22621+) 
  - 8GB 内存 + 支持虚拟化的 CPU
  - BIOS 开启虚拟化（VT-x/AMD-V）
- **启用必要功能**：
  ```powershell
  dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
  dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart
  ```
  **重启电脑生效**

---

### 2. 使用 WSA Toolbox 安装
1. **下载工具**：
   - [WSA Toolbox 最新版](https://github.com/jakenicholls-au/wsa-toolbox/releases)
   - [WSA 安装包](https://github.com/MustardChef/WSABuilds/releases)（推荐选带 Google Play 的版本）

2. **安装 WSA**：
   - 解压 WSA 安装包（如 `WSA_2xxx.x.x_x64_Release-Nightly-with-magisk-xxxxx-MindTheGapps-xxxx-RemovedAmazon.7z`）
   - 右键解压后的文件夹 → **以管理员身份运行 `Install.ps1`**
   - 等待完成（约 3-5 分钟）

3. **验证安装**：
   - 开始菜单出现 **Windows Subsystem for Android™ 设置**

---

## 二、配置 ADB 连接

### 1. 开启开发者模式
1. 打开 **Windows Subsystem for Android™ 设置**
2. 开启 **开发者模式** → 点击 **IP 地址** 查看端口（默认 `58526`）
### 2. 连接 ADB
1. **下载 ADB 工具**：
   - [Android Platform Tools](https://developer.android.com/tools/releases/platform-tools)
   - 解压到任意目录（如 `C:\platform-tools`）

2. **连接设备**：
   ```powershell
   cd C:\platform-tools
   .\adb connect 127.0.0.1:58526
   ```
   
3. **授权调试**：
   - WSA 界面会弹出 **允许 USB 调试** 对话框 → 勾选「始终允许」→ 确定

---

## 三、安装 APK 应用

### 方法 1：ADB 命令行安装
```powershell
# 单应用安装
.\adb install "D:\your_app.apk"

# 强制覆盖安装（更新时使用）
.\adb install -r "D:\your_app.apk"
```

### 方法 2：WSA Toolbox 图形化安装
1. 打开 **WSA Toolbox** → 点击 **APK 安装**
2. 拖拽 APK 文件到窗口 → 自动安装

---

## 四、故障排查

### 1. ADB 无法连接
| 问题现象                            | 解决方案                          |
| ----------------------------------- | --------------------------------- |
| `cannot connect to 127.0.0.1:58526` | 检查 WSA 是否启动 → 重启 WSA 服务 |
| `unauthorized`                      | 重新触发授权 → 断开后重连 ADB     |
| `no devices/emulators found`        | 检查 WSA 开发者模式是否开启       |

### 2. 应用闪退
- 安装 [Google Play 服务](https://github.com/LSPosed/MagiskOnWSA)
- 检查 APK 是否兼容 ARM64 架构

---

## 五、高级技巧

### 1. 文件互传
```powershell
# 推送文件到安卓
.\adb push "C:\local_file.txt" /sdcard/Documents/

# 从安卓拉取文件
.\adb pull "/sdcard/Download/file.txt" "D:\"
```

### 2. 多开应用
在 WSA 设置中开启 **高级网络** → 使用不同端口启动多个实例

---

通过此教程，你已掌握从安装 WSA 到部署 APK 的全流程。建议收藏备用！