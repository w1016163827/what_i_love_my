const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const mongoSetting = require('../setting').mongo
const logger = require('../utils/loggers/logger')

const {uri} = mongoSetting
mongoose.connect(uri,{ useNewUrlParser: true });
const db = mongoose.connection
db.on('error',(error)=>{
    logger.error(`error connecting to mongodb`,{error},{uri})
})
db.on('open',()=>{
    logger.info(`success connecting to mongodb`,{uri})
})

module.exports = db