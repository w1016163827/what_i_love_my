const HTTPBaseError = require('../errors/http_errors/http_base_error')
const logger = require('../utils/loggers/logger')
module.exports = (options) => {
    return (err, req, res, next) => {
        if(err instanceof HTTPBaseError){
            const errMeta = {
                query: req.query,
                url: req.originalUrl,
                userInfo: req.user,
            }
            logger.error(err.message,errMeta)
            res.statusCode = err.httpStatusCode
            res.json({
                code:err.errorCode,
                msg:err.httpMsg
            })
        }else {
            next(err)
        }
    }
}