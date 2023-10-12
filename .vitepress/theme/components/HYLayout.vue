
<template>
  <Layout>
    <template #doc-before>
      <PostHeader />
    </template>
    <template #doc-footer-before>
      <ClientOnly>
        <Copyright />
      </ClientOnly>
    </template>
    <template #doc-after>
      <PostFooter v-if="frontmatter.articleType == 'post'" />
    </template>
    <template #aside-top>
    </template>
    <template #aside-bottom>
    </template>
    <template #layout-bottom>
      <Footer v-if="showFooter && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" />
    </template>
  </Layout>
  <div class="progress" />
</template>
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import PostHeader from './HYPostHeader.vue'
import PostFooter from './HYPostFooter.vue'
import Footer from './HYFooter.vue'
import Copyright from './HYCopyright.vue'
import { useData, inBrowser } from 'vitepress';
import { computed, nextTick, provide } from 'vue'

const { Layout } = DefaultTheme
const { isDark, frontmatter, theme } = useData()

const showFooter = computed(() => {
  return frontmatter.value.articleType == 'post' || frontmatter.value.layout === 'home'
})

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]


  // @ts-ignore
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )


})



</script>
<style>
/* progress animations */
.progress {
  height: 4px;
  background: transparent;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transform-origin: 0 50%;
  z-index: 99999;
  animation: scaleProgress auto linear, colorChange auto linear;
  animation-timeline: scroll(root);
}

@keyframes scaleProgress {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}

@keyframes colorChange {
  0% {
    background-color: blue;
  }

  50% {
    background-color: yellow;
  }

  100% {
    background-color: red;
  }
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>