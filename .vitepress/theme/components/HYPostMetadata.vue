<template>
  <div class="meta-wrapper">
    <div class="meta-item w-full sm:w-fit" v-if="publishedAt">
      <span class="meta-icon date">
        <svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <title>发布时间</title>
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
          </path>
          <path
            d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z">
          </path>
        </svg>
      </span>
      <time class="meta-content" :datetime="publishedAt">{{
        publishedAt
      }}</time>
    </div>
    <div class="meta-item w-full sm:w-fit" v-if="showCategory && categories?.length">
      <span class="meta-icon category">
        <svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <title>所属分类</title>
          <path
            d="M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 0 0-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256z m635.3 512H159l103.3-256h612.4L771.3 768z">
          </path>
        </svg>
      </span>
      <span class="meta-content ">
        <span v-for="(category, index) in categories" :key="index">
          <a :href="withBase(`/archives?category=${category}`)" target="_blank" :title="category">{{ category }}</a>
          <span v-if="index != categories?.length - 1">, </span>
        </span>
      </span>
    </div>
    <div class="meta-item tag w-full sm:w-fit" v-if="tags?.length">
      <span class="meta-icon tag">
        <svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <title>标签列表</title>
          <path
            d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8a8.03 8.03 0 0 0 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z m60.16 186.23a48 48 0 1 0 67.88-67.89 48 48 0 1 0-67.88 67.89zM889.7 539.8l-39.6-39.5a8.03 8.03 0 0 0-11.3 0l-362 361.3-237.6-237a8.03 8.03 0 0 0-11.3 0l-39.6 39.5a8.03 8.03 0 0 0 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z">
          </path>
        </svg>
      </span>
      <span class="meta-content ">
        <span v-for="(tag, index) in tags" :key="index">
          <a :href="withBase(`/archives?tag=${tag}`)" target="_blank" :title="tag">{{ tag
          }}</a>
          <span v-if="index != tags?.length - 1">, </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRef, toRefs } from 'vue';
import { withBase } from 'vitepress';

// 定义文章属性
const props = defineProps<{
  publishedAt: string,
  categories: string[],
  tags: string[],
  showCategory?: Boolean
}>();

const { publishedAt, categories, tags } = toRefs(props)
const showCategory = toRef(props.showCategory ?? true)
</script>

<style scoped>
.meta-item {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color: var(--vp-c-text-2);
  cursor: default;
  font-size: 14px;
}

.meta-item:not(.tag) {
  margin-right: 1rem;
}

.meta-icon,
meta-content {
  display: inline-block;
  margin-right: .375rem;
  vertical-align: middle;
}

.meta-icon {
  position: relative;
  bottom: 1.5px;
}

.meta-icon.date {
  bottom: 1.3px;
}

.meta-icon svg {
  fill: var(--vp-c-text-2);
  height: 16px;
  width: 16px;
}

.meta-content a {
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.meta-content a:hover {
  color: var(--vp-c-brand);
}
</style>