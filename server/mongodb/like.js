const mongoose = require('mongoose')

const Like = mongoose.model(
    'Like',
    new mongoose.Schema({
        count: {
            type: Number,
            required: true,
            default: 0
        },
        id: {
            // 回复 或 评论 或者 心情id。
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        }
    })
)

module.exports = Like
