---
title: "The code execution cannot proceed because ResampleDmo.DlL was not found, Reinstalling the programmay fix this problem."
date: "2023-09-07"
categories: 
  - "计算机那点事"
coverImage: "1694072036795.png"
---

这两天装了Windows 11的系统，打开WeChat就会遇到这个报错信息，应该是少了那个dll文件。

打开[https://winbindex.m417z.com/?file=resampledmo.dll](https://winbindex.m417z.com/?file=resampledmo.dll)这个网站，下载dll文件，下载后是blob格式的，要改名称，改成`resampledmo.dll`然后放到windows/system32文件夹下，之后以Administrator的身份，运行如下命令在CMD中：
```
regsvr32 resampledmo.dll
```