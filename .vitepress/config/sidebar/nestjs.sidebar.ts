import { getSubdirNames, readFile } from '.vitepress/theme/utils'
import matter from 'gray-matter'
import path from 'path'

export function nestJsSidebar() {
	const dir = path.join(__dirname, '../../../nestjs')
	const subdir = getSubdirNames(dir)
	const sidebar: any[] = []
	subdir.forEach((subdirectory) => {
		const subdirectoryPath = path.join(dir, subdirectory)
		const indexPath = path.join(subdirectoryPath, 'index.md')
		const indexMdContent = readFile(indexPath)
		if (!indexMdContent) return
		const page: any = matter(indexMdContent)

		if (page) {
			sidebar.push({
				text: page.data?.title,
				link: `/nestjs/${subdirectory}/`,
				order: page.data?.order ?? 9999,
			})
		} else {
			console.log(`NestJS Subdirectory: ${subdirectory}`)
			console.log('Index.md not found in this NestJS subdirectory.')
			console.log('-----------------------')
		}
	})

	return sidebar.sort((a, b) => a.order - b.order)
}
