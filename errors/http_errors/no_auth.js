const HTTPBaseError = require('./http_base_error')

const errorCode = 4010001

class NoAuth extends HTTPBaseError{
    constructor(token){
        super(401,'您没有权限访问该资源',errorCode,`no auth token:${token}`)
    }
}



module.exports = NoAuth