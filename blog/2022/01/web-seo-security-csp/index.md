---
title: "网站服务器安全优化-CSP内容安全策略"
date: "2022-01-01"
categories: 
  - "HTTP安全知识"
tags: 
  - "SEO基础"
  - "服务器优化"
  - "网站安全优化"
coverImage: "content-security-policy.png"
---

今天SEO禅要来聊聊**CSP(Content Security Policy)内容安全策略**，这是HTTP层的内容，主要目的就是**设置安全白名单**，前面SEO禅已经介绍过**[XSS跨站脚本攻击](https://www.seozen.top/web-seo-security-xss-2021.html)**，CSP的作用主要就是防止加载不安全的内容，就算网站有可以注入JS脚本的地方，只要不加载和访问外部资源，也会相对安全些。

## 如何启用CSP

启用CSP的方法有两种：**服务器配置Http头**，在html页面设置Meta标签。

就拿Apache来说，将如下代码加入到httpd.conf文件中的`virtualHost`中：

```
Header set Content-Security-Policy "default-src 'self';"
```

此配置的意思是告诉客户端浏览器，默认除了`self`自己本身服务器的资源，加载其他资源一律阻止。
如果是Meta方式，如下代码：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';" \>
```
上面的`img-src`意思是图片只能加载支持https协议的资源，`childe-src`是所有`Web Workers`和一些`iframe`外部资源都阻止加载。

## CSP指令选项

上面只是简单的介绍了一些指令，CSP提供许多指令选择，SEO禅简单介绍下，需要使用还是要看官方文档。

### connect-src 连接资源

指定可访问的连接源，如 XHR, WebSockets, 和 EventSource发起的外部请求。

### font-src 字体资源

指定可访问的字体资源，如google font的字体。

### frame-src 内嵌框架

指定可访问的内嵌框架资源，使用`frame`或者`iframe`嵌入在网页中的外部资源。

### script-src JS脚本资源

指定可访问的外部JS脚本资源。

### style-src 样式资源

指定可访问的外部CSS资源。

### media-src 媒体资源

指定可访问的外部媒体资源，如<video\>、<audio\>、<track\>元素等。

CSP的指令选项还有不少，可以参看MDN的[CSP文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)。

## CSP选项值

上面列举了一些常用的CSP选项，那如何使用呢？下面这段直接从阮一峰老师的博客Copy过来了：

- 主机名：`example.org`，`https://example.com:443`
- 路径名：`example.org/resources/js/`
- 通配符：`*.example.org`，`*://*.example.com:*`（表示任意协议、任意子域名、任意端口）
- 协议名：`https:`、`data:`
- 关键字`'self'`：当前域名，需要加单引号
- 关键字`'none'`：禁止加载任何外部资源，需要加单引号

举个例子：

```
Content-Security-Policy: script-src 'self' https://*.seozen.top
```

上面一个白名单表示：除了自身域名和所有seozen.top域名是https协议的，其余外部JS资源一律阻止加载，即使是http://www.seozen.top这样的域名也是无法加载的，因为协议不符合要求。

如果有多个外部资源，可以并排，中间使用空格分割，一种选项末尾使用`;`分割，如：

```
Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'
```

今天关于CSP的文章就分享到这，想要更深入了解可以参考下面的链接：

[Content Security Policy - Google Web Fundamentals](https://developers.google.com/web/fundamentals/security/csp)

[阮一峰CSP教程](https://www.google.cn/ads/ga-audiences?v=1&t=sr&slf_rd=1&_r=4&tid=G-V8FL5MHQB6&cid=1731548729.1632184050>m=2oec10&aip=1&z=86477041)

[Content Security Policy Reference Guide](https://content-security-policy.com/)

[Content-Security-Policy MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
