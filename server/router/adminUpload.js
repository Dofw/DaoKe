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
            if (fieldKeys.length === 0) {
                return res.status(200).send({
                    status: 200,
                    msg: '设置个性头像，彰显个人魅力'
                })
            }
            if (req.err) {
                return res.status(500).send({
                    status: 500,
                    msg: req.err
                })
            }
            req.files[fieldKeys[0]][0].url =
                `http://localhost:3000/admin/public/upload/${req.params.category}/` +
                req.files[fieldKeys[0]][0].filename

            res.status(200).send({
                status: 200,
                url: req.files[fieldKeys[0]][0].url
            })
        }
    )

    app.use('/admin/upload/:category', router)
}
