---
title: "Sitemap是什么？有什么作用-SEO基础"
date: "2021-01-14"
categories: 
  - "SEO基础"
tags: 
  - "SEO网站优化"
  - "sitemap"
coverImage: "sitemap.png"
---

> Sitemap 可方便网站管理员通知搜索引擎，他们网站上有哪些可供抓取的网页。

上面这段话是对**Sitemap**的基本解释，其实简单的可以理解为，sitemap就是网站地图，而这个地图并不是像谷歌地图和百度地图一样，是图像形式的，而是一个文件，通常是`xml`后缀结尾的文件。

## Sitemap 常见的格式

对于百度来说，支持以下三种Sitemap格式：

1. **txt文本格式**
2. **xml格式**
3. **Sitemap索引格式**

### txt文本格式

打开一个**sitemap.txt**格式的网站地图文件，大致是以下样式：

- https://www.seozen.top/robots-mislead-seo.html
- https://www.seozen.top/search-engine.html
- https://ww.seozen.top/robots-seo.html

此文本文件需要遵循以下规则：

- 文本文件每行都必须有一个网址。网址中不能有换行。
- 不应包含网址列表以外的任何信息。
- 您必须书写完整的网址，包括 http。
- 每个文本文件最多可包含 50,000 个网址，超过部分再新建一个文本文件。 文本文件需使用 UTF-8 编码。

### xml格式

xml格式有两种，一种是**谷歌sitemap**，一种是**百度sitemap**

谷歌sitemap格式如下：
```
<urlset xmlns=“网页列表地址”>
    <url>
        <loc>网址</loc>
        <lastmod>2021-1-01T00:00-08:00</lastmod>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>网址</loc>
        <lastmod>2021-01-02T20:20:36Z</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>

百度sitemap格式如下：

<?xml version="1.0" encoding="UTF-8"?>
<urlset>
    <url>
        <loc>网页地址</loc>
        <lastmod>2021-01-01</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```
看上去谷歌的sitemap要比百度的sitemap复杂，其实是一样的，下面看看xml中几个重要的标签。 **changefreq**：页面内容更新频率。 **lastmod**：页面最后修改时间（ISO 8601） **loc**：页面永久链接地址 **priority**：相对于其他页面的优先权 其中`changefreq`是比较重要的，它会告诉搜索引擎爬虫，此界面多久更新一次，这样爬虫就可以尽可能及时的爬取网站更新的内容，可以通过"**always**"、 “**hourly**”、 “**daily**”、 “**weekly**”、 “**monthly**”、 “**yearly**”、 "**never**"几个单词来描述，具体含义就不单独解释了，看单词意思应该就很明白了，有不懂的留言。

### Sitemap索引格式

当网站内容不断丰富，就会有多个sitemap文件，如果一个一个文件去站长平台提交是一件很麻烦的事，还有一种更方便的方法，将所有sitemap文件打包提交，如下格式：
```
<?xml version="1.0" encoding="utf-8"?>
<!-- XML文件需以utf-8编码-->
<sitemapindex>
<!--必填，以 <sitemapindex> 开始标记作为开始，以 </sitemapindex> 结束标记作为结束-->
    <sitemap>
        <!--必填，以<sitemap>标签提交一个子sitemap文件-->
        <loc>http://example.com/sitemap.xml</loc>
        <!--必填，识别sitemap的位置-->
        <lastmod>2021-1-1</lastmod>
        <!--选填，识别相对sitemap文件的修改时间-->
    </sitemap>
    <!--必填，标签闭合-->
</sitemapindex>
<!--必填，标签闭合-->
```
只要复制`<sitemap>`标签，添加更多的sitemap文件路径就可以，最后提交单个sitemap索引文件就可以。

## Sitemap的作用

说了这么多，应该明白sitemap的作用是什么了吧，其实就是让爬虫爬取网站内容节省时间，让爬虫对网站的结构有整体的认识，这也是SEO优化的一个基本操作，网上也有很多在线生成sitemap的网站，不需要手动去生成。 还有其它**关于sitemap**不懂的地方可以留言给我。
