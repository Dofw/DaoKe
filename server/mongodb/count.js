const mongoose = require('mongoose')

const Count = mongoose.model(
    '   Count',
    new mongoose.Schema({
        count: {
            type: Number,
            required: true
        },
        id: {
            // 回复 或 评论 或者 心情id。
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        }
    })
)

module.exports = Count
