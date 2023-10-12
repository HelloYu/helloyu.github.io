import { PageData, TransformPageContext } from 'vitepress'
import fs from 'fs'
import matter from 'gray-matter'
import { markdownToTxt } from 'markdown-to-txt'

/**
 * 根据条件标记文章类型
 */
export async function generateArticleType(
	pageData: PageData,
	ctx: TransformPageContext
) {
	const config = ctx?.siteConfig?.site?.themeConfig
	const postsPattern = 'blog/'
	if (pageData.frontmatter.layout == 'home') return
	if (pageData.relativePath.includes(postsPattern)) {
		pageData.frontmatter.articleType = 'post'
	} else {
		pageData.frontmatter.articleType = 'topic'
	}
}

/**
 * 生成文章描述信息
 */
export async function generateDescription(
	pageData: PageData,
	ctx: TransformPageContext
) {
	const filepath = pageData.filePath
	if (fs.existsSync(filepath)) {
		const content = fs.readFileSync(filepath, 'utf-8')
		const data = matter(content)
		const result = markdownToTxt(data.content.replace(/<[^>]+>/g, '')).replace(
			/\s+/g,
			' '
		)
		pageData.description = result.length > 200 ? result.slice(0, 180) : result
	}
}

/**
 * 获取生肖图标
 *
 * @param year 年份
 */
export function getChineseZodiac(year: string) {
	const arr = [
		'monkey',
		'rooster',
		'dog',
		'pig',
		'rat',
		'ox',
		'tiger',
		'rabbit',
		'dragon',
		'snake',
		'horse',
		'goat',
	]
	return arr[parseInt(year) % 12]
}

/**
 * 获取生肖名称
 *
 * @param year 年份
 */
export function getChineseZodiacAlias(year: string) {
	const arr = [
		'猴年',
		'鸡年',
		'狗年',
		'猪年',
		'鼠年',
		'牛年',
		'虎年',
		'兔年',
		'龙年',
		'蛇年',
		'马年',
		'羊年',
	]
	return arr[parseInt(year) % 12]
}
