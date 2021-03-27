const mongoose = require('mongoose')

const Reply = mongoose.model(
    'Reply',
    new mongoose.Schema({
        content: {
            type: String,
            required: true
        },
        auther: {
            //该作者或评论。
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Info'
        },
        commentId: {
            // 双层模式
            // 绑定在对应评论下。
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        tier: {
            // 辨别 回复的回复，还是评论的回复。
            type: Number,
            required: true,
            default: 1 //回复的回复
        },

        reviewer: {
            //评论者info
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Info'
        },
        time: {
            type: Date,
            default: new Date(Date.now())
        }
    })
)

module.exports = Reply
