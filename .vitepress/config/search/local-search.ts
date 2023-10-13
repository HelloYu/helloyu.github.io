import type { DefaultTheme } from 'vitepress'

export const localSearchOptions: DefaultTheme.LocalSearchOptions = {
	locales: {
		root: {
			translations: {
				button: {
					buttonText: '搜索文档',
					buttonAriaLabel: '搜索文档',
				},
				modal: {
					noResultsText: '无法找到相关结果',
					resetButtonTitle: '清除查询条件',
					footer: {
						selectText: '选择',
						navigateText: '切换',
					},
				},
			},
		},
	},
	miniSearch: {
		searchOptions: {
			bm25: {
				k: 1.2,
				b: 2,
				d: 0.5,
			},
			prefix: true,
			fuzzy: true,
			fields: ['title', 'text'],
			boost: {
				title: 2,
			},
		},
	},
	_render(src, env, md) {
		const html = md.render(src, env)
		if (env.frontmatter?.title && html.indexOf('h1') == -1)
			return md.render(`# ${env.frontmatter.title}`) + html
		return html
	},
}
