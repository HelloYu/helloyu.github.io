<template>
  <article class="home-post vp-doc ">
    <div class="home-post-header">
      <h2>
        <a :href="post.url">{{
          post.title
        }}</a>
      </h2>
    </div>
    <div class="home-post-excerpt" v-html="post.excerpt"></div>
    <div class="home-post-footer flex justify-between content-center flex-col md:flex-row">
      <Metadata :categories="post.categories" :tags="post.tags" :published-at="post.date.formatted" />
      <a class="" aria-label="read more" :href="post.url">阅读全文 →</a>
    </div>
  </article>
</template>
<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { Post } from '../composables/posts.data';
import Metadata from './HYPostMetadata.vue'

const props = defineProps<{
  post: Post
}>()

const { post } = toRefs(props)

post.value.excerpt = post.value?.excerpt?.replace(/<h1[^>]*>.*?<\/h1>/g, '');

</script>