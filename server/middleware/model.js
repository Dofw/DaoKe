module.exports = () => {
    const upper = require('../utils/upperStart.js')

    return async (req, res, next) => {
        console.log(req.params.model)
        req.model = require(`../mongodb/${req.params.model}.js`)
        next()
    }
}
