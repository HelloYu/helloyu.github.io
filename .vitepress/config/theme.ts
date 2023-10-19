import type { DefaultTheme, PageData, TransformPageContext } from 'vitepress'
import { localSearchOptions } from './search/local-search'
import { getSubdirNames, readFile } from '.vitepress/theme/utils'
import path from 'path'
import matter from 'gray-matter'

export const themeConfig: DefaultTheme.Config = {
	logo: '/logo.png',
	outline: {
		level: 'deep', // 右侧大纲标题层级
		label: '目录', // 右侧大纲标题文本配置
	},
	darkModeSwitchLabel: '切换日光/暗黑模式',
	sidebarMenuLabel: '文章',
	returnToTopLabel: '返回顶部',
	lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
	// 文档页脚文本配置
	docFooter: {
		prev: '上一篇',
		next: '下一篇',
	},
	// 编辑链接配置
	editLink: {
		pattern: 'https://github.com/HelloYu/helloyu.github.io/edit/main/:path',
		text: '如有不妥，请提PR修正，感谢！',
	},
	nav: [
		{
			text: 'Android',
			activeMatch: '/android/',
			items: [
				{
					text: 'Jetcpack Compose',
					link: '/android/jetpack-compose-introduction',
					activeMatch: '/android/',
				},
			],
		},
		{
			text: 'SEO优化',
			activeMatch: '/seo/',
			link: '/seo/seo-course-first-step/',
		},
		{
			text: '标签',
			link: '/tags',
			activeMatch: '/tags',
		},
		{
			text: '归档',
			link: '/archives',
			activeMatch: '/archives',
		},
	],
	sidebar: {
		'/android/': sidebarAndroid(),
		'/seo/': sidebarSEO(),
	},
	search: {
		// 搜索配置（二选一）
		// provider: 'algolia',
		// options: algoliaSearchOptions,
		// 本地离线搜索
		provider: 'local',
		options: localSearchOptions,
	},
	// 导航栏右侧社交链接配置
	socialLinks: [{ icon: 'github', link: 'https://github.com/HelloYu' }],
	// 自定义扩展: 页脚配置
	// @ts-ignore
	footerConfig: {
		showFooter: true, // 是否显示页脚
		icpRecordCode: '', // ICP备案号
		publicSecurityRecordCode: '', // 联网备案号
		copyright: `Copyright © 2021-${new Date().getFullYear()} 哈喽鱼`, // 版权信息
	},
	notFound: {
		title: '页面未找到',
		quote: '哎呀，不好意思，你访问的页面走丢了。',
		linkText: '返回首页',
		linkLabel: '返回首页',
	},
}
function sidebarAndroid() {
	return [
		{
			text: '基础知识',
			items: [
				{
					text: '初识Jetpack Compose',
					link: '/android/jetpack-compose-introduction',
				},
				{
					text: 'Compose中的State状态管理',
					link: '/android/jetpack-compose-remember-mutablestateof-derivedstateof-remembersaveable/',
				},
			],
		},
		{
			text: '基础组件相关',
			items: [
				{
					text: '集成Hilt进行依赖注入-代码解耦',
					link: '/android/jetpack-compose-hilt-dependency-injection/',
				},
				{
					text: '集成Room进行本地数据存储',
					link: '/android/jetpack-compose-persist-data-with-room/',
				},
				{
					text: '集成Retrofit进行JWT授权和自动刷新Token',
					link: '/android/jetpack-compose-jwt-authentication-and-refresh-token-in-android-with-retrofit-interceptor-authenticator/',
				},
				{
					text: '集成Paging3进行数据分页查询',
					link: '/android/jetpack-compose-pagination-with-paging3/',
				},
				{
					text: '集成Navigation页面路由导航',
					link: '/android/jetpack-compose-navigation/',
				},
			],
		},
		{
			text: '摄像头图库相关',
			items: [
				{
					text: '获取Camera相应权限',
					link: '/android/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-one-device-permissions/',
				},
				{
					text: '使用CameraX进行相机预览',
					link: '/android/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-two-preview/',
				},
				{
					text: '使用CameraX进行相机截图',
					link: '/android/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-three-capture-picture/',
				},
				{
					text: '从图库中选择图片',
					link: '/android/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-four-select-photo/',
				},
			],
		},
	]
}

function sidebarSEO() {
	const seoDir = path.join(__dirname, '../../seo')
	const seoSubDirs = getSubdirNames(seoDir)
	const sidebar: any[] = []
	seoSubDirs.forEach((subdirectory) => {
		const subdirectoryPath = path.join(seoDir, subdirectory)
		const indexPath = path.join(subdirectoryPath, 'index.md')
		const indexMdContent = readFile(indexPath)
		if (!indexMdContent) return
		const page: any = matter(indexMdContent)

		if (page) {
			sidebar.push({
				text: page.data?.title,
				link: `/seo/${subdirectory}/`,
				order: page.data?.order ?? 9999,
			})
		} else {
			console.log(`SEO Subdirectory: ${subdirectory}`)
			console.log('Index.md not found in this SEO subdirectory.')
			console.log('-----------------------')
		}
	})

	return sidebar.sort((a, b) => a.order - b.order)
}
