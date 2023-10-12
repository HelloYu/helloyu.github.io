---
title: "openssl载入私钥unable to load Private Key错误"
date: "2022-01-08"
categories: 
  - "HTTP安全知识"
tags: 
  - "网站安全优化"
coverImage: "Generating-Self-Signed-SSL-Certificate-with-OpenSSL.png"
---

今天在使用openssl生成公钥的时候遇到了一个坑，遇到了无法载入私钥的报错信息如下：

```
openssl rsa -inform pem -in rsa.key -pubout > public-key.pem
unable to load Private Key
4341825004:error:09FFF064:PEM routines:CRYPTO_internal:bad base64 decode:/System/Volumes/Data/SWE/macOS/BuildRoots/38cf1d983f/Library/Caches/com.apple.xbs/Sources/libressl/libressl-56.60.2/libressl-2.8/crypto/pem/pem_lib.c:801:
```

排查半天，发现是私钥的格式不对，需要进行格式化，使用如下命令：

```
fold -w 64 私钥文件
```

文件需要每行为64个字符，超出的话就会报上面的错误，这里记录下，有遇到相同问题的朋友可以试试这么解决。
