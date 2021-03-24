const mongoose = require('mongoose')

const Comment = mongoose.model(
    'Comment',
    new mongoose.Schema({
        content: {
            type: String
        },
        reviewer: {
            //评论者info
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Info'
        },
        type: {
            //关于某类，评论
            type: String,
            required: true
        },
        auther: {
            //该作者，评论。
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        time: {
            type: Date,
            default: new Date(Date.now())
        }
    })
)

module.exports = Comment
