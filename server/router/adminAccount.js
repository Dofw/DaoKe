module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const router = express.Router()
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    const User = require('../mongodb/user.js')
    const Info = require('../mongodb/info.js')

    // 注册
    router.post('/admin/account/regist', async (req, res) => {
        const { username, pwd } = req.body.data

        // 是否已注册
        const oldUser = await User.findOne({ username: username })
        assert(!oldUser, 403, '用户存在')

        // 存数据
        const newUser = new User({
            // 模型中，对密码进行散列了。set(){}
            username: username,
            pwd: pwd
        })
        // 新用户的数据，也是注册后建立的。
        const info = await Info.create({})
        info.username = newUser._id
        await info.save()

        try {
            await newUser.save()
        } catch (error) {
            assert(!error, 403, '用户存在')
        }

        res.status(200).send({ message: '注册成功' })
    })

    // 登录
    router.post('/admin/account/login', async (req, res) => {
        const { username, pwd } = req.body.data
        const user = await User.findOne({ username }).select('+pwd')
        assert(user, 401, '用户不存在')

        // 存在后，校验密码。
        const isCorrect = bcrypt.compareSync(pwd, user.pwd)
        assert(isCorrect, 401, '密码错误')

        // 校验成功后，生成token  这里的secret是加强安全性的。
        const token = jwt.sign(
            {
                id: user._id
            },
            app.get('secret')
        )

        res.send({ token })
    })

    app.use(router)
}
