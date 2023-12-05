import type { DefaultTheme, PageData, TransformPageContext } from 'vitepress'
import { localSearchOptions } from './search/local-search'
import { getSubdirNames, readFile } from '.vitepress/theme/utils'
import path from 'path'
import matter from 'gray-matter'
import { androidComposeSidebar } from './sidebar/android-compose.sidebar'
import { androidFaqSidebar } from './sidebar/android-faq.sidebar'
import { seoSidebar } from './sidebar/seo.sidebar'
import { nestJsFaqSidebar } from './sidebar/nestjs-faq.sidebar'
import { nestJsBeginnerSidebar } from './sidebar/nestjs-beginner.sidebar'
import { nestJsMasterSidebar } from './sidebar/nestjs-master.sidebar'

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
			text: 'NestJS',
			activeMatch: '/nestjs/*',
			items: [
				{
					text: 'NestJS基础',
					link: '/nestjs/beginner/nestjs-learning-for-beginners-basic-knowledge/',
					activeMatch: '/nestjs/beginner/*',
				},
				{
					text: 'NestJS进阶',
					link: '/nestjs/master/clean-architecture-with-nestjs-best-practice-init/',
					activeMatch: '/nestjs/master/*',
				},
				// {
				// 	text: 'NestJS开发FAQ',
				// 	link: '/nestjs/faq/nestjs-providers-imports-exports/',
				// 	activeMatch: '/nestjs/faq/*',
				// },
			],
		},
		{
			text: 'Android',
			activeMatch: '/android/*',
			items: [
				{
					text: 'Jetcpack Compose',
					link: '/android/jetpack-compose/jetpack-compose-introduction',
					activeMatch: '/android/jetpack-compose/*',
				},
				{
					text: 'Android开发FAQ',
					link: '/android/faq/android-faq-aar-not-work/',
					activeMatch: '/android/faq/*',
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
		'/android/': androidComposeSidebar(),
		'/android/faq/': androidFaqSidebar(),
		'/seo/': seoSidebar(),
		// '/nestjs/faq': nestJsFaqSidebar(),
		'/nestjs/beginner': nestJsBeginnerSidebar(),
		'/nestjs/master': nestJsMasterSidebar(),
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
		icpRecordCode: '闽ICP备2021000243号', // ICP备案号
		publicSecurityRecordCode: '闽公网安备 35070202100199号', // 联网备案号
		copyright: `Copyright © 2021-${new Date().getFullYear()} Hello Yu`, // 版权信息
	},
	notFound: {
		title: '页面未找到',
		quote: '哎呀，不好意思，你访问的页面走丢了。',
		linkText: '返回首页',
		linkLabel: '返回首页',
	},
}
