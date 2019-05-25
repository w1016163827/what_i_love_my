class HTTPBaseError extends Error{
    constructor(httpStatusCode,httpMsg,errorCode,msg){
        super(`HTTP_error: ${msg}`)
        this.httpStatusCode = httpStatusCode
        this.httpMsg = httpMsg
        this.errorCode = errorCode
    }
}
module.exports = HTTPBaseError