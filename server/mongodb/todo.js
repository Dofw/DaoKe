const mongoose = require('mongoose')

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
