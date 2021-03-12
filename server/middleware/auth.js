module.exports = () => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const User = require('../mongodb/accountUser.js')

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '')
            .split(' ')
            .pop()

        assert(token, 401, '请登录，token验证失败')

        const { id } = jwt.verify(token, req.app.get('secret'))
        req.id = id
        req.user = await User.findOne({ _id: id })
            .select('+pwd')
            .populate('info')
            .lean()

        console.log(req.user)

        assert(req.user, 401, '用户不存在')

        await next()
    }
}
