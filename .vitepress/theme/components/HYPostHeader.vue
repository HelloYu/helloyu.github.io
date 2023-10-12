
<template>
  <header class="prose prose-a:no-underline prose-h1:text-2xl	dark:prose-invert">
    <h1 class="mb-1">
      {{ post.title }}
    </h1>
    <Metadata :post="post" />
  </header>
</template>
<script setup lang="ts">
import Metadata from './HYPostMetadata.vue'
import { usePosts } from '../composables/usePosts';

const { post } = usePosts()

</script>
