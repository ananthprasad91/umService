const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/keys')
const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send({ message: 'Acces Denied' })
    }
    try {
        const verified = jwt.verify(token, SECRET)
        req.user = verified
        next()
    } catch (e) {
        res.status(401).send({ message: 'Unauthorized' })
    }
}

module.exports = {
    auth
}