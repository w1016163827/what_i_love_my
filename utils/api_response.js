const logger = require('./loggers/logger')

module.exports = (req, res) => {
    if(res.headersSent){
        logger.error(`header already sent`,{url:req.originalUrl})
    }else {
        res.json({
            data:res.data,
            code:0
        })
    }
}