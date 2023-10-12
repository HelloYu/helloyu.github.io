---
title: "node gyp Error: Could not find any Visual Studio installation to use"
date: "2023-09-06"
categories: 
  - "NestJS"
  - "Web前端开发"
tags: 
  - "前端开发常见问题"
coverImage: "node-gyp.png"
---

这两天买了M2的硬盘，重装了系统，所有项目要重新装依赖，在安装NestJS依赖的时候，遇到了臭名昭著的`node-gyp`报错，这个库从我很小很小的时候就知道它很臭，下面是报错信息：
<!--more-->

```
gyp info it worked if it ends with ok
│ gyp info using node-gyp@9.4.0
│ gyp info using node@18.17.1 | win32 | x64
│ gyp info ok
│ gyp info it worked if it ends with ok
│ gyp info using node-gyp@9.4.0
│ gyp info using node@18.17.1 | win32 | x64
│ gyp info find Python using Python version 3.11.5 found at "C:\\Users\\MrYu1\\AppData\\Local\\Programs\\Python\\Python311\\python.exe"
│ gyp ERR! find VS
│ gyp ERR! find VS msvs\_version not set from command line or npm config
│ gyp ERR! find VS VCINSTALLDIR not set, not running in VS Command Prompt
│ gyp ERR! find VS could not use PowerShell to find Visual Studio 2017 or newer, try re-running with '--loglevel silly' for more details
│ gyp ERR! find VS looking for Visual Studio 2015
│ gyp ERR! find VS - not found
│ gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
│ gyp ERR! find VS
│ gyp ERR! find VS \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
│ gyp ERR! find VS You need to install the latest version of Visual Studio
│ gyp ERR! find VS including the "Desktop development with C++" workload.
│ gyp ERR! find VS For more information consult the documentation at:
│ gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
│ gyp ERR! find VS \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
│ gyp ERR! find VS
│ gyp ERR! configure error
│ gyp ERR! stack Error: Could not find any Visual Studio installation to use
│ gyp ERR! stack     at VisualStudioFinder.fail (C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\find-visualstudio.js:122:47)
│ gyp ERR! stack     at C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\find-visualstudio.js:75:16
│ gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\find-visualstudio.js:380:14)
│ gyp ERR! stack     at C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\find-visualstudio.js:71:14
│ gyp ERR! stack     at C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\find-visualstudio.js:401:16
│ gyp ERR! stack     at C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\util.js:54:7
│ gyp ERR! stack     at C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\lib\\util.js:33:16
│ gyp ERR! stack     at ChildProcess.exithandler (node:child\_process:427:5)
│ gyp ERR! stack     at ChildProcess.emit (node:events:514:28)
│ gyp ERR! stack     at maybeClose (node:internal/child\_process:1091:16)
│ gyp ERR! System Windows\_NT 10.0.22621
│ gyp ERR! command "C:\\\\Program Files\\\\nodejs\\\\node.exe" "C:\\\\Users\\\\MrYu1\\\\AppData\\\\Roaming\\\\npm\\\\node\_modules\\\\pnpm\\\\dist\\\\node\_modules\\\\node-gyp\\\\bin\\\\node-gyp.js" "configure" "--fallback-to-build" "--modul…  
│ gyp ERR! cwd C:\\Users\\MrYu1\\Desktop\\CXTech\\CXTechSoftware\\Templates\\AdminServer2023\\node\_modules\\.pnpm\\bcrypt@5.1.1\\node\_modules\\bcrypt
│ gyp ERR! node -v v18.17.1
│ gyp ERR! node-gyp -v v9.4.0
│ gyp ERR! not ok
│ node-pre-gyp ERR! build error
│ node-pre-gyp ERR! stack Error: Failed to execute 'C:\\Program Files\\nodejs\\node.exe C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\bin\\node-gyp.js configure --fallback-to-buil…  
│ node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (C:\\Users\\MrYu1\\Desktop\\CXTech\\CXTechSoftware\\Templates\\AdminServer2023\\node\_modules\\.pnpm\\@mapbox+node-pre-gyp@1.0.11\\node\_modules\\@mapbox\\node-pre-gy…  
│ Failed to execute 'C:\\Program Files\\nodejs\\node.exe C:\\Users\\MrYu1\\AppData\\Roaming\\npm\\node\_modules\\pnpm\\dist\\node\_modules\\node-gyp\\bin\\node-gyp.js configure --fallback-to-build --module=C:\\Users\\MrYu1\\Deskt…  
│ node-pre-gyp ERR! stack     at ChildProcess.emit (node:events:514:28)
│ node-pre-gyp ERR! stack     at maybeClose (node:internal/child\_process:1091:16)
│ node-pre-gyp ERR! stack     at ChildProcess.\_handle.onexit (node:internal/child\_process:302:5)
│ node-pre-gyp ERR! System Windows\_NT 10.0.22621
│ node-pre-gyp ERR! command "C:\\\\Program Files\\\\nodejs\\\\node.exe" "C:\\\\Users\\\\MrYu1\\\\Desktop\\\\CXTech\\\\CXTechSoftware\\\\Templates\\\\AdminServer2023\\\\node\_modules\\\\.pnpm\\\\@mapbox+node-pre-gyp@1.0.11\\\\node\_modules\\…  
│ node-pre-gyp ERR! cwd C:\\Users\\MrYu1\\Desktop\\CXTech\\CXTechSoftware\\Templates\\AdminServer2023\\node\_modules\\.pnpm\\bcrypt@5.1.1\\node\_modules\\bcrypt
│ node-pre-gyp ERR! node -v v18.17.1
│ node-pre-gyp ERR! node-pre-gyp -v v1.0.11
│ node-pre-gyp ERR! not ok
```
如果遇到这个问题，其实不需要你安装什么vs tools，我看网上一堆说需要安装，你可以试试运行：
```
pnpm update
```
先把Package Lock文件删掉，再运行上面这个命令，然后再运行install。
