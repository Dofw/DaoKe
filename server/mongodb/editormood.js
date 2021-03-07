const mongoose = require('mongoose')

// 编辑心情 editor-mood

const Editormood = mongoose.model(
    'Editormood',
    mongoose.Schema({
        usename: {
            require: true,
            type: String,
            trim: true
        },
        mood: {
            type: String,
            trim: true,
            default: ''
        },
        updloadMp3: {
            type: String,
            trim: true,
            default: null
        },
        updloadPic: {
            type: String,
            trim: true,
            default: null
        },
        time: {
            type: Date,
            default: new Date(Date.now())
        }
    })
)

module.exports = Editormood
