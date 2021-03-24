const mongoose = require('mongoose')

// 编辑心情 editor-mood

const Todo = mongoose.model(
    'Todo',
    mongoose.Schema({
        todo: {
            type: String
        },
        username: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }
    })
)

module.exports = Todo
