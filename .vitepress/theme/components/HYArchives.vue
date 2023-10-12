<template>
  <div class="timeline-wrap container mx-auto  px-8 md:px-20 lg:px-36 xl:px-80 ">
    <!-- 时间轴头部 -->
    <div class="timeline-header">
      <div v-if="$category" class="content">
        分类：{{ $category }} (共 {{ $articleData.length }} 篇)
      </div>
      <div v-else-if="$tag" class="content">
        标签：{{ $tag }} (共 {{ $articleData.length }} 篇)
      </div>
      <div v-else-if="$year" class="content">
        {{ $year }}年 (共 {{ $articleData.length }} 篇)
      </div>
      <div v-else class="content">
        共 {{ articleData.length }} 篇，未完待续······
      </div>
    </div>

    <!-- 时间轴主体 -->
    <div class="timeline-item" v-for="(item, year) in (archiveData as Record<string, any>)" :key="year">
      <div class="year">
        <img class="chinese-zodiac"
          :src="withBase('/img/chinese-zodiac/' + getChineseZodiac(year.replace('年', '')) + '.svg')"
          :title="getChineseZodiacAlias(year.replace('年', ''))" alt="生肖">
        <span>{{ year }}</span>
      </div>
      <div class="timeline-item-content">
        <div v-for="( articles, month ) in item">
          <span class="month">
            {{ month }}
          </span>
          <div class="articles">
            <span v-for=" article  in articles" class="article">
              <a :href="withBase(article.url)" class="title inline-block text-base" target="_blank">{{
                article.title
              }}</a>
              <Metadata :post="article" />
            </span>
          </div>
        </div>
      </div>
      <div id="main"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { data as articleData } from '../composables/posts.data.js'
import type { Post } from '../composables/posts.data';
import Metadata from './HYPostMetadata.vue'
import { inBrowser, withBase } from 'vitepress';
import { getChineseZodiac, getChineseZodiacAlias } from '../utils';
// 文章原始数据和归档数据
let $articleData: Post[];
let archiveData: any;

// 要筛选的分类、标签、年份
let $category: string | null;
let $tag: string | null;
let $year: string | null;

/**
 * 初始化时间轴
 */
function initTimeline() {
  $articleData = [];
  archiveData = {};

  if (inBrowser) {
    const params = new URLSearchParams(window.location.search)
    $category = params.get('category');
    $tag = params.get('tag');
    $year = params.get('year');
  }

  if ($category && $category.trim() != '') {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i];
      if (article.categories && article.categories.includes($category)) {
        $articleData.push(article);
      }
    }
  } else if ($tag && $tag.trim() != '') {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i];
      if (article.tags && article.tags.includes($tag)) {
        $articleData.push(article);
      }
    }
  } else if ($year) {
    for (let i = 0; i < articleData.length; i++) {
      let article = articleData[i];
      if (article.date && new Date(article.date.formatted).getFullYear().toString() == $year) {
        $articleData.push(article);
      }
    }
  } else {
    $articleData.push(...articleData);
  }


  // 按年、月进行归档
  for (let i = 0; i < $articleData.length; i++) {
    const article = $articleData[i];
    let year: string = new Date(article.date.formatted).getFullYear() + '年';
    let month: string = (new Date(article.date.formatted).getMonth() + 1) + '月';
    if (!archiveData[year]) {
      archiveData[year] = {};
    }
    if (!(archiveData[year][month])) {
      archiveData[year][month] = [];
    }

    archiveData[year][month].push(article);
  }
}
initTimeline();
</script>

<style scoped>
.chinese-zodiac {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: -10.5px;
  top: -1px;
  background: #fff;
  border: 1px solid #84b9e5;
  border-radius: 50%;
}

.timeline-wrap {
  margin-top: 18px;
  word-break: break-all;
}

.timeline-wrap .timeline-header {
  padding-bottom: 20px;
}

.timeline-wrap .timeline-header .icon {
  fill: var(--vp-c-text-2);
  height: 22px;
  width: 22px;
}

.timeline-wrap .timeline-header .content {
  position: relative;
  left: -17px;
  font-size: 16px;
}

.timeline-wrap .timeline-item {
  padding: 0 0 0 20px;
  border-left: 1px solid #5D9DF0;
  line-height: 1;
  position: relative;
}

.timeline-wrap .timeline-item:not(:last-child) {
  padding-bottom: 20px;
}

.timeline-wrap .timeline-item .year {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.6em;
}

.timeline-wrap .timeline-item .timeline-item-time {
  margin-bottom: 12px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-wrap .timeline-item .month {
  padding: 8px 0 8px 0;
  display: block;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.timeline-wrap .timeline-item .timeline-item-content {
  font-size: 14px;
}

.timeline-wrap .timeline-item .articles {
  line-height: 1;
  padding-top: 7px;
}

.timeline-wrap .timeline-item .articles .article {
  display: block;
  position: relative;
  margin-bottom: 20px;
  line-height: 1.5;
}

.timeline-wrap .timeline-item .articles .article .title::before {
  position: absolute;
  left: -28.5px;
  top: 4.5px;
  background: #fff;
  border: 1px solid #84b9e5;
  border-radius: 50%;
  cursor: pointer;
  content: "";
  width: 1em;
  height: 1em;
}

.timeline-wrap .timeline-item .articles .article span {
  color: var(--vp-c-text-2);
}

.vp-doc a {
  font-weight: 400;
  color: var(--vp-c-text-1);
}

.vp-doc a:hover {
  color: var(--vp-c-brand);
}
</style>