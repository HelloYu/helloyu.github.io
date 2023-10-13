
<template>
  <div ref="$h1Custom">
    <h1 :id="page.title" tabindex="-1">
      {{ page.title }}
    </h1>
    <Metadata :categories="frontmatter.categories" :tags="frontmatter.tags" :published-at="frontmatter.date" />
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress';
import Metadata from './HYPostMetadata.vue'
import { nextTick, onMounted, ref, watch } from 'vue';
const $h1Custom = ref()
const { page, frontmatter } = useData()

watch(page, (value, oldValue) => {
  nextTick(() => {
    processH1Element()
  })
})

onMounted(() => {
  processH1Element()
})

function processH1Element() {
  const docDomContainer = window.document.querySelector('#VPContent')
  if (!docDomContainer) return
  const vpDoc = docDomContainer.querySelector('main .vp-doc div')
  vpDoc?.insertAdjacentElement('afterbegin', $h1Custom.value)
}

</script>
