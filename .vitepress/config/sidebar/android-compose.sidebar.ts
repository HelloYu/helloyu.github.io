export function androidComposeSidebar() {
	return [
		{
			text: '基础知识',
			items: [
				{
					text: '初识Jetpack Compose',
					link: '/android/jetpack-compose/jetpack-compose-introduction',
				},
				{
					text: 'Compose中的State状态管理',
					link: '/android/jetpack-compose/jetpack-compose-remember-mutablestateof-derivedstateof-remembersaveable/',
				},
			],
		},
		{
			text: '基础组件相关',
			items: [
				{
					text: '集成Hilt进行依赖注入-代码解耦',
					link: '/android/jetpack-compose/jetpack-compose-hilt-dependency-injection/',
				},
				{
					text: '集成Room进行本地数据存储',
					link: '/android/jetpack-compose/jetpack-compose-persist-data-with-room/',
				},
				{
					text: '集成Retrofit进行JWT授权和自动刷新Token',
					link: '/android/jetpack-compose/jetpack-compose-jwt-authentication-and-refresh-token-in-android-with-retrofit-interceptor-authenticator/',
				},
				{
					text: '集成Paging3进行数据分页查询',
					link: '/android/jetpack-compose/jetpack-compose-pagination-with-paging3/',
				},
				{
					text: '集成Navigation页面路由导航',
					link: '/android/jetpack-compose/jetpack-compose-navigation/',
				},
			],
		},
		{
			text: '摄像头图库相关',
			items: [
				{
					text: '获取Camera相应权限',
					link: '/android/jetpack-compose/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-one-device-permissions/',
				},
				{
					text: '使用CameraX进行相机预览',
					link: '/android/jetpack-compose/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-two-preview/',
				},
				{
					text: '使用CameraX进行相机截图',
					link: '/android/jetpack-compose/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-three-capture-picture/',
				},
				{
					text: '从图库中选择图片',
					link: '/android/jetpack-compose/jetpack-compose-building-photo-app-with-camerax-and-coroutines-part-four-select-photo/',
				},
			],
		},
	]
}
