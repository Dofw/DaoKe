const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.set('secret', 'abcdef') // 提供全局变量
app.use(cors()) // 处理 跨域的问题。
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
    '/admin/public/upload/',
    express.static(path.join(__dirname, '/public/upload/'))
)

require('./mongodb/connect.js')()
require('./router/adminUpload.js')(app)
require('./router/adminResourceCRUD.js')(app)
require('./router/adminAccount.js')(app)
require('./router/remove.js')(app)
require('./router/comment-router.js')(app)
require('./router/count.js')(app)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})

app.listen('3000', () => {
    console.log('localhost:3000  连接成功')
})
