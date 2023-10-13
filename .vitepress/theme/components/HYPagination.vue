<template>
  <nav aria-label="Page navigation ">
    <ul class="list-style-none flex">
      <li v-if="page !== firstPage">
        <a class="relative block rounded bg-transparent h-[35px] px-2 flex items-center justify-center text-center text-xs sm:text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          :href="props.url + (page - 1)">上一页</a>
      </li>
      <li v-for="item of pagination">
        <a v-if="item !== moreMark"
          class="relative block rounded w-[35px] h-[35px] flex items-center justify-center text-center text-xs sm:text-sm transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          :href="props.url + item" :class="{
            'bg-green-400 text-white pointer-events-none': item === page
          }
            ">{{ item }}</a>
        <span v-if="item == moreMark">{{ item }}</span>
      </li>
      <li v-if="page !== lastPage">
        <a class="relative block rounded bg-transparent h-[35px]  px-2 flex items-center justify-center text-center text-xs sm:text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          :href="props.url + (page + 1)">下一页</a>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { inBrowser, useData } from 'vitepress';

const props = defineProps({
  totalPage: {
    type: Number
  },
  url: {
    type: String,
    default: '/page/'
  }
})

const { params } = useData()
const { page } = params.value || { page: 1 }
const lastPage = props.totalPage || 1
const firstPage = 1
const pagination: any[] = []
let padding = 3
const moreMark = "..."
let leftMoreMarkAdded = false
let rightMoreMarkAdded = false

if (inBrowser) {
  if (window.innerWidth <= 760) {
    padding = 2
  }
}


// TODO: 是否有更优雅的方式？
for (let i = firstPage; i <= lastPage; i++) {
  const showNumber = (i > page - padding && i < page + padding) || (i === firstPage) || (i === lastPage)
  const showLeftMore = (i <= page - padding && i > firstPage)
  const showRightMore = (i >= page + padding && i < lastPage)

  if (showNumber) {
    pagination.push(i)
  }

  if (showLeftMore && !leftMoreMarkAdded) {
    pagination.push(moreMark)
    leftMoreMarkAdded = true
  }

  if (showRightMore && !rightMoreMarkAdded) {
    pagination.push(moreMark)
    rightMoreMarkAdded = true
  }
}

</script>
