const HTTPBaseError = require('./http_base_error')

const errorCode = 4000000

class HTTPRequestParamError extends HTTPBaseError{
    constructor(paramName,errorReason,msg){
        super(200,errorReason,errorCode,`${paramName} wrong:${msg}`)
    }
}

module.exports = HTTPRequestParamError