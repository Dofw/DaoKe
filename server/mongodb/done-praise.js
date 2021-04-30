const mongoose = require('mongoose')

const DonePraise = mongoose.model(
    // 称赞
    'Done',
    new mongoose.Schema({
        done: {
            type: Boolean,
            required: true
        },
        id: {
            //点赞者
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        praise: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Praise'
        }
    })
)

module.exports = DonePraise
