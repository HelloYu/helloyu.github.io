import { PageData, TransformPageContext } from 'vitepress'
import fs from 'fs'
import matter from 'gray-matter'
import { markdownToTxt } from 'markdown-to-txt'
import path from 'path'

/**
 * 生成文章描述信息
 */
export async function generatePageMeta(
	pageData: PageData,
	ctx: TransformPageContext
) {
	const content = readFile(pageData.filePath)
	if (!content) return

	const data = matter(content)

	pageData.frontmatter.articleType = generateArticleType(pageData, ctx)
	pageData.description = generateArticleDescription(data.content)
}

/**
 * 根据条件标记文章类型
 */
function generateArticleType(pageData: PageData, ctx: TransformPageContext) {
	const config = ctx?.siteConfig?.site?.themeConfig
	const postsPattern = 'blog/'
	if (pageData.frontmatter.layout == 'home') return
	if (pageData.relativePath.includes(postsPattern)) {
		return 'post'
	} else {
		return 'topic'
	}
}

function generateArticleDescription(content: string): string {
	// 移除所有html标签
	const data = content.replace(/<[^>]+>/g, '')
	// 移除所有连续空格
	const result = markdownToTxt(data).replace(/\s+/g, ' ')
	return result.length > 200 ? result.slice(0, 180) : result
}

// 读取子目录名称
export function getSubdirNames(dirPath: string): string[] {
	return fs
		.readdirSync(dirPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
}

export function getSidebar(sidebarDir: string) {
	const seoDir = path.join(__dirname, `../../${sidebarDir}/`)
	const subDirs = getSubdirNames(seoDir)
	const sidebar: any[] = []
	subDirs.forEach((subdirectory) => {
		const subdirectoryPath = path.join(seoDir, subdirectory)
		const indexPath = path.join(subdirectoryPath, 'index.md')
		const indexMdContent = readFile(indexPath)
		if (!indexMdContent) return
		const page: any = matter(indexMdContent)

		if (page) {
			sidebar.push({
				text: page.data?.title,
				link: `/${sidebarDir}/${subdirectory}/`,
				order: page.data?.order ?? 9999,
			})
		} else {
			console.log(`${sidebarDir} Subdirectory: ${subdirectory}`)
			console.log(`Index.md not found in this ${sidebarDir} subdirectory.`)
			console.log('-----------------------')
		}
	})

	return sidebar.sort((a, b) => a.order - b.order)
}

export function readFile(filepath: string): string | null {
	if (fs.existsSync(filepath)) {
		const content = fs.readFileSync(filepath, 'utf-8')
		return content
	}
	return null
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
