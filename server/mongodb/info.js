const mongoose = require('mongoose')

const InfoSchema = new mongoose.Schema({
    nickname: {
        type: String,
        default: '高端用户'
    },
    photoUrl: {
        type: String,
        default: null
    },
    sex: {
        type: String,
        default: 'man'
    },
    games: {
        type: Array,
        default: []
    },
    username: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

const Info = mongoose.model('Info', InfoSchema)

module.exports = Info
