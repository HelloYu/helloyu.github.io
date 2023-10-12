<template>
  <div class="container mx-auto px-6 md:px-20 lg:px-36 xl:px-56 ">
    <ul class="divide-y divide-gray-200 dark:divide-slate-200/5">
      <li class="pb-2 md:pb-6" v-for="post of currentPosts">
        <HomePost :post="post" />
      </li>
    </ul>
    <div class="border-t pt-8">
      <HomePagination :total-page="totalPage" />
    </div>
  </div>
</template>
<script setup lang="ts">
import HomePost from './HYHomePost.vue'
import HomePagination from './HYPagination.vue'
import { data as posts } from '../composables/posts.data.js'
import { useData } from 'vitepress';
import { computed } from 'vue';
import { PAGE_SIZE } from '../../constants';

const { params, theme } = useData()

const currentPosts = computed(() => {
  const { page } = params.value || { page: 1 }
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  return posts.slice(start, end)
})

const totalPage = Math.ceil(posts.length / PAGE_SIZE)

</script>
