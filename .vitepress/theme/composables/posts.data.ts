import { createContentLoader } from 'vitepress'
import { EXCERPT_LENGTH, EXCERPT_MARK, POST_FILES } from '../../constants'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { parse } from 'path'

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
					excerpt: updateImageSrc(excerpt, url),
					date: formatDate(frontmatter.date),
				}
			})
			.sort((a, b) => b.date.time - a.date.time)
	},
})

/**
 * 更新 excerpt 中 <img> 标签的 src 属性
 * @param {string} excerpt - 原始的 excerpt 字符串
 * @param {string} urlPrefix - 要拼接的 URL 前缀
 * @returns {string} 更新后的 excerpt 字符串
 */
function updateImageSrc(excerpt: string | undefined, urlPrefix: string) {
	if (excerpt == undefined) return

	return excerpt.replace(
		/<img\s+([^>]*?)src=["']\.\/([^"']*?)["']([^>]*?)>/gi,
		(match, p1, p2, p3) => {
			const imageUrl = fileToUrl(urlPrefix + p2)
			return `<img ${p1}src="${imageUrl}"${p3}>`
		}
	)
}

function fileToUrl(file: string) {
	if (process.env.NODE_ENV !== 'production') return file
	const path = fileURLToPath(new URL('../../../' + file, import.meta.url))
	const parsed = parse(path)
	const hash = createHash('sha256')
		.update(readFileSync(path))
		.digest('hex')
		.slice(0, 8)
	return `/assets/${parsed.name}.${hash}${parsed.ext}`
}

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
