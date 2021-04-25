const mongoose = require('mongoose')

const Comment = mongoose.model(
    'Comment',
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
        type: {
            //关于某类，mood类型
            type: String,
            required: true
        },
        moodId: {
            //为mood的id。
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },

        reviewer: {
            //评论者info
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Info'
        },
        time: {
            type: Date,
            default: Date.now()
        }
    })
)

module.exports = Comment
