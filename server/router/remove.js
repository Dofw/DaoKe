module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    const Mood = require('../mongodb/mood')
    const comment = require('../mongodb/comment.js')
    const reply = require('../mongodb/comment-reply.js')
    const info = require('../mongodb/info.js')
    const user = require('../mongodb/user.js')

    async function remove() {
        await Mood.remove()
        await comment.remove()
        await reply.remove()
        await info.remove()
        await user.remove()
    }

    // remove()

    app.use(router)
}
