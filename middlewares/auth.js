const JWT = require('jsonwebtoken')
const {privateKey} = require('../crypto/JWT_config')
const NoAuthError = require('../errors/http_errors/no_auth')

module.exports = (options) => {
    return (req, res, next) => {
        const authorization = req.get('Authorization')
        if(!authorization || authorization.indexOf('Bearer') === -1) {
            next(new NoAuthError(null))
        }

        const token = authorization.split(' ')[1]
        if (!token) {
            throw new NoAuthError(null);
        }
        try {
            const user = JWT.verify(token, privateKey)
        }catch (e) {
            next(new NoAuthError(token))
        }
        next()
    }
}



