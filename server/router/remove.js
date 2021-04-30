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
    const praise = require('../mongodb/praise.js')
    const done = require('../mongodb/done-praise.js')
    const count = require('../mongodb/count.js')

    async function remove() {
        // await Mood.remove()
        // await comment.remove()
        await reply.remove()
        await count.remove()
        // await info.remove()
        // await user.remove()
        await praise.remove()
        await done.remove()
        console.log('end')
    }

    // remove()

    app.use(router)
}
