
<template>
  <h1 :id="page.title" tabindex="-1" ref="$h1Custom">
    {{ page.title }}
  </h1>
  <div ref="$metadata">
    <Metadata :categories="frontmatter.categories" :tags="frontmatter.tags" :published-at="frontmatter.date" />
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress';
import Metadata from './HYPostMetadata.vue'
import { onMounted, ref, watch, nextTick } from 'vue';
const $metadata = ref()
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
  const h1Element = docDomContainer.querySelector('main h1')
  if (h1Element) {
    h1Element?.parentNode?.removeChild(h1Element)
  }
  const vpDoc = docDomContainer.querySelector('main .vp-doc div')
  vpDoc?.insertAdjacentElement('afterbegin', $h1Custom.value)
  $h1Custom.value?.after($metadata.value)
}

</script>
