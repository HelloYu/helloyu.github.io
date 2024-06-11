---
title: "安装Google拼音中文输入法"
date: "2024-06-11"
categories: 
  - "树莓派"
tags: 
  - "RaspberryPi"
order: 2
---
想要输入中文，需要自己安装输入法，运行如下命令：
```bash
sudo apt-get update
sudo apt-get install -y fcitx fcitx-googlepinyin
sudo reboot
```
之后点击**Preferences–>Fcitx Configuration**
![Fcitx-Configuration](Fcitx-Configuration.png)
点击加号，输入google，点击ok后就可以使用了。
