const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        pwd: {
            type: String,
            select: false, // 前端页面中，密码不被查出来。只显示username。
            required: true,
            set(val) {
                const salt = require('bcrypt').genSaltSync(6)
                return require('bcrypt').hashSync(val, salt)
            }
        }
    },
    {
        toJSON: { virtuals: true }
    }
)

UserSchema.virtual('mood', {
    ref: 'Mood',
    localField: '_id',
    foreignField: 'username',
    justOne: false
})

UserSchema.virtual('info', {
    ref: 'Info',
    localField: '_id',
    foreignField: 'username',
    justOne: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User
