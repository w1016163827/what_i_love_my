const HTTPBaseError = require('./http_base_error')

const errorCode = 4040000

class InternalServerError extends HTTPBaseError{
    constructor(sourcePath,method){
        super(404,`没有找到您要的资源哦`,errorCode,`not found source sourcePath:${sourcePath} method:${method}`)
    }
}

module.exports = InternalServerError