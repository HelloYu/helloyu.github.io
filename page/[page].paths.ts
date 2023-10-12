import { PAGE_SIZE, POST_FILES } from '.vitepress/constants'
import glob from 'fast-glob'

export default {
	async paths() {
		// 计算页面数量
		const files = await glob(POST_FILES)
		const pageMax = Math.ceil(files.length / PAGE_SIZE)
		// 创建分页参数
		const pageParams = new Array(pageMax)
			.fill(0)
			.map((_, i) => ({ params: { page: i + 1 } }))

		return pageParams
	},
}
