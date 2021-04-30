const mongoose = require('mongoose')

const Praise = mongoose.model(
    // 称赞
    'Praise',
    new mongoose.Schema({
        count: {
            type: Number,
            required: true
        },
        id: {
            // moodid
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        }
    })
)

module.exports = Praise
