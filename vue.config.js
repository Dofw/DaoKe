module.exports = {
    outputDir: __dirname + '/server/daoke',
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    devServer: {
        open: true,
        port: 4000,
        proxy: {
            '/admin': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        // devtool: 'source-map'
    }
}
