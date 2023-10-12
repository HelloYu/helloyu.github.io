---
title: "PHP新手入门教程2021（二）：面向接口编程"
date: "2021-04-30"
categories: 
  - "PHP开发"
tags: 
  - "PHP教程"
  - "PHP学习"
coverImage: "maxresdefault.jpeg"
---

SEO禅写的教程文章一般都是从总体到局部，不会急着去介绍细节的东西，也是从今年认认真真的开始写文章，当然在这过程中会出现很多的不足，可能会比较散，所以我尽量一篇文章不写太长，只关注几个点的知识，在不断的写作过程中也是自我提高，自我学习的过程，当然也会犯错，如果有哪里写的不好的地方，还请各位看到的朋友指出，等下个月有空了，就把评论模板做一下，把评论开起来，希望看SEO禅文章的朋友都能留下评论，写下自己的感想。

## PHP面向接口

回到今天的话题，**PHP接口编程**，PHP也是一门面向对象的语言，如果懂的设计模式的朋友，就知道接口在设计模式中应用是非常广泛的，简单的一句话：“不管黑猫白猫，能抓到耗子的就是好猫”，**面向接口编程就是这个逻辑，不管实现细节，只在乎你能不能实现这个功能**。

## 接口实例

下面就拿《Modern PHP》这书里面的代码来举例说明下，面向接口编辑的好处，看下如下代码：
```
class DocumentStore
{
    protected $data = \[\];
    public function addDocument(Documentable $document)
    {
        $key = $document->getId();
        $value = $document->getContent();
        $this->data\[$key\] = $value;
    }

    public function getDocuments()
    {
        return $this->data;
    }
}
```
就把这个简单认为是一个图书馆吧，其中有两个功能，一个是保存文档`addDocument`一个是获取文档`getDocuments`，对于现代的图书馆来说，资源已经除了纸质，其它各种媒介都有可能，所以我们这里有一个`Documentable`的接口，只要使用了这个接口，就可以存到这个虚拟的图书馆里，看下这个接口：
```
interface Documentable
{
   public function getId();
   public function getContent(); 
}
```
我们只要实现上面的接口，就不需要关心文档实际的存储媒介，像如下代码：
```
<?php

$documentStore = new DocumentStore();
// Add HTML document
$htmlDoc = new HtmlDocument('https://php.net');
$documentStore->addDocument($htmlDoc);
// Add video document
$videoDoc = new VideoDocument(fopen('seozen.mp4', 'rb'));
$documentStore->addDocument($videoDoc);
// Add audio document
$audioDoc = new AudioDocument(fopen('seozen.mp3', 'rb'));
$documentStore->addDocument($audioDoc);

print\_r($documentStore->getDocuments());
```
如果以后有新的存储媒介，也只要再实现下这个接口就可以，不需要去改去太多的代码，更多的接口应用会在其它的文章来介绍，这里就先简单的举个例子，让大家有个概念。
