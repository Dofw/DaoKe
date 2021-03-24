module.exports = app => {
    const mongoose = require('mongoose')

    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    const User = require('../mongodb/user')
    const Mood = require('../mongodb/mood')
    const Todo = require('../mongodb/todo')

    async function abc() {
        //清空
        // await Todo.remove()
        // 插入
        // await Todo.insertMany({
        //     todo: 'qqq'
        // })
        try {
            const res = await Todo.create()
            console.log(1, res)
        } catch (error) {
            console.log(error)
        }

        const restodo = await Todo.find()
        //打印
        console.log('todo部分', restodo)
    }

    // abc()

    app.use(router)
}
