module.exports = {
	publicPath: '',
	devServer: {
		Proxy: {
			'/api': {
				target: 'https://www.fastmock.site/',
				ws: true,
				changeOrigin: true, // 跨域
				pathRewrite: {
					'^/api':''
				}
			}
		}
	}
}