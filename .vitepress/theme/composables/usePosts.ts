import { useRoute, withBase } from 'vitepress'
import { data as posts } from './posts.data'
import { computed } from 'vue'

export function usePosts() {
	const route = useRoute()
	const path = route.path

	function findCurrentIndex() {
		// 因为使用了rewrites重写了url，所以无法完全匹配url，使用includes来判断
		const result = posts.findIndex((p) => withBase(p.url).includes(route.path))
		if (result === -1) console.error(`blog post missing: ${route.path}`)
		return result
	}

	const post = computed(() => posts[findCurrentIndex()])
	const nextPost = computed(() => posts[findCurrentIndex() - 1])
	const prevPost = computed(() => posts[findCurrentIndex() + 1])

	return { posts, post, nextPost, prevPost, path }
}
