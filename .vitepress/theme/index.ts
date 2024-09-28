// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './style.css'
import HYLayout from './components/HYLayout.vue'
import HYHome from './components/HYHome.vue'
import HYTags from './components/HYTags.vue'
import HYArchives from './components/HYArchives.vue'
import { EnhanceAppContext } from 'vitepress'
import 'viewerjs/dist/viewer.min.css'
import imageViewer from 'vitepress-plugin-image-viewer'
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'
import { useRoute } from 'vitepress'

export default {
	...DefaultTheme,
	Layout: HYLayout,
	enhanceApp({ app, router, siteData }: EnhanceAppContext) {
		DefaultTheme.enhanceApp({ app, router, siteData })
		app.component('HYHome', HYHome)
		app.component('HYTags', HYTags)
		app.component('HYArchives', HYArchives)
		app.component('vImageViewer', vImageViewer)
	},
	setup() {
		const route = useRoute()
		// Using
		imageViewer(route)
	},
}
