const mongoose = require('mongoose')

// 编辑心情 editor-mood

const Mood = mongoose.model(
    'Mood',
    mongoose.Schema({
        username: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        info: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Info'
        },
        mood: {
            type: String,
            trim: true,
            required: true
        },
        mp3Url: {
            type: String,
            default: null
        },
        pictureUrl: {
            type: String,
            default: null
        },
        time: {
            type: Date,
            default: new Date(Date.now())
        }
    })
)

module.exports = Mood
