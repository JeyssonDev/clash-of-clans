const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'https://api.clashofclans.com/v1',
		createProxyMiddleware({
			target: 'http://localhost:3000',
			changeOrigin: true,
		})
	);
};
