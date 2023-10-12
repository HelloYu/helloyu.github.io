import { PageData, TransformPageContext, defineConfig } from 'vitepress'
import { themeConfig } from './config/theme'
import { generateArticleType, generateDescription } from './theme/utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: 'zh-CN',
	title: 'Hello Yu',
	description: '一位喜欢编程的大叔，善于利用软件解决实际问题！',
	themeConfig,
	async transformPageData(pageData: PageData, ctx: TransformPageContext) {
		await generateArticleType(pageData, ctx)
		await generateDescription(pageData, ctx)
	},
	cleanUrls: true,
	lastUpdated: true,
})