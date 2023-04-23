module.exports = {
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '浏览器相关', link: '/browser/eventLoop/' },
    ],
		sidebar: {
			'/browser/': [
				{
					title: '浏览器相关',
					collapsable: true,
					children: [
						{
							title: '事件循环机制',
							path: '/browser/eventLoop/',
							collapsable: true,
						},
						{
							title: '调用栈（Call Stack）',
							path: '/browser/eventLoop/callStack/',
							collapsable: true,
						},
						{
							title: '任务队列（Task Queue）',
							path: '/browser/eventLoop/taskQueue/',
							collapsable: true,
						},
						{
							title: '同步/异步/宏/微任务 与 任务队列和事件循环的关系',
							path: '/browser/eventTaskAnalysis/',
							collapsable: true,
						}
					]
				},
				{
					title: 'url输入到页面渲染的过程',
					path: '/browser/urlParser/',
					collapsable: true,
				},
				
			]
		},
  }
}
