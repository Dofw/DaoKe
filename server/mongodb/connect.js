module.exports = () => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost/brigthSpot', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
