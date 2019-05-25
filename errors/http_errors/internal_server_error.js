const HTTPBaseError = require('./http_base_error')

const errorCode = 5000000

class InternalServerError extends HTTPBaseError{
    constructor(msg){
        super(500,`服务器好像开了点小差，稍后在访问吧！`,errorCode,`servers wrong: ${msg}`)
    }
}

module.exports = InternalServerError