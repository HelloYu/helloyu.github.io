import { createContentLoader } from 'vitepress'
import { EXCERPT_LENGTH, EXCERPT_MARK, POST_FILES } from '../../constants'

export interface Post {
	title: string
	url: string
	categories: string[]
	tags: string[]
	date: {
		time: number
		formatted: string
	}
	excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader(POST_FILES, {
	excerpt: (file) => {
		const index = file.content.indexOf(EXCERPT_MARK)

		// TODO: image 返回的路径未解析，还是相对路径，渲染出来后会找不到图片
		file.excerpt = file.content.substring(
			0,
			index == -1 ? EXCERPT_LENGTH : index
		)
	},
	includeSrc: true,
	transform(raw): Post[] {
		return raw
			.map(({ url, frontmatter, excerpt, src }) => {
				return {
					title: generateTitle(frontmatter, src),
					categories: frontmatter?.categories ?? [],
					tags: frontmatter.tags ?? [],
					url: url,
					excerpt,
					date: formatDate(frontmatter.date),
				}
			})
			.sort((a, b) => b.date.time - a.date.time)
	},
})

function generateTitle(
	frontmatter: Record<string, any>,
	src: string | undefined
): string {
	if (frontmatter?.title && frontmatter.title !== '') return frontmatter.title
	if (src) {
		const regex = /^# (.+)$/gm
		const match = regex.exec(src)

		if (match) {
			return match[1]
		}
	}

	return ''
}

function formatDate(raw: string): Post['date'] {
	const date = new Date(raw)
	const seperator = '-'
	return {
		time: +date,
		formatted: date
			.toLocaleDateString('zh-CN', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			})
			.replace(/\//g, seperator),
	}
}
