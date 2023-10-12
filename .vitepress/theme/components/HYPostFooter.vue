<script setup lang="ts">
import { useData } from 'vitepress'
import { usePosts } from '../composables/usePosts';

const { theme } = useData()
const { prevPost, nextPost } = usePosts()

</script>

<template>
  <footer class="VPDocFooter">
    <nav v-if="prevPost?.url || nextPost?.url" class="prev-next">
      <div class="pager">
        <a v-if="prevPost?.url" class="pager-link prev" :href="prevPost.url">
          <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
          <span class="title" v-html="prevPost.title"></span>
        </a>
      </div>
      <div class="pager">
        <a v-if="nextPost?.url" class="pager-link next" :href="nextPost.url">
          <span class="desc" v-html="theme.docFooter?.next || 'Next page'"></span>
          <span class="title" v-html="nextPost.title"></span>
        </a>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.edit-info {
  padding-bottom: 18px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}
</style>
