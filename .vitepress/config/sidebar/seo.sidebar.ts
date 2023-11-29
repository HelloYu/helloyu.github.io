import { getSubdirNames, readFile } from '.vitepress/theme/utils'
import matter from 'gray-matter'
import path from 'path'

export function seoSidebar() {
	const seoDir = path.join(__dirname, '../../../seo')
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
