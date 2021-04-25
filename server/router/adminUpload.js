module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    const authMiddleware = require('../middleware/auth.js')
    const uploadMiddleware = require('../middleware/upload.js')

    // 文件上传的接口。
    router.post(
        '/',
        authMiddleware(),
        uploadMiddleware().fields([
            { name: 'mp3', maxCount: 1 }, // 心情部分
            { name: 'picture', maxCount: 1 },
            { name: 'photo', maxCount: 1 } // 头像部分
        ]),
        (req, res) => {
            const fieldKeys = Object.keys(req.files) // 多个文件，就需要for循环。生成路径。

            // 中间件验证的错误msg
            if (req.err) {
                return res.status(500).send({
                    status: 500,
                    message: req.err
                })
            }

            // 生成服务端文件路径
            req.files[fieldKeys[0]][0].url =
                `http://localhost:3000/admin/public/upload/${req.params.category}/` +
                req.files[fieldKeys[0]][0].filename

            res.send({
                status: 200,
                fieldname: fieldKeys[0],
                url: req.files[fieldKeys[0]][0].url,
                filename: req.files[fieldKeys[0]][0].originalname
            })
        }
    )

    app.use('/admin/upload/:category', router)
}
