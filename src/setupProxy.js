const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app){
    console.log(app)
    app.use(createProxyMiddleware('/api', {
        target: 'https://www.freetogame.com',
        changeOrigin: true
    }))
}


// {
//     target: 'https://www.freetogame.com',
//         changeOrigin: true,
//     pathRewrite: {
//     '^/api': ''
// }