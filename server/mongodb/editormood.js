const mongoose = require('mongoose')

// 编辑心情 editor-mood

const Editormood = mongoose.model(
    'Editormood',
    mongoose.Schema({
        usename: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        mood: {
            type: String,
            trim: true,
            required: true
        },
        updloadMp3: {
            type: String,
            default: null
        },
        updloadPic: {
            type: String,
            default: null
        },
        time: {
            type: Date,
            default: new Date(Date.now())
        }
    })
)

module.exports = Editormood
