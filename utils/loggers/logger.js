const winston = require('winston')
require('winston-daily-rotate-file')
const {createLogger,transports} = winston
const {DailyRotateFile,Console} = transports

const logger = createLogger({
    transports:[
        new DailyRotateFile({
            name: 'base_logger',
            filename: `logs/info.log`,
            prepend: false,
            datePattern: 'YYYY-MM-dd',
            level: 'info',
        }),
        new DailyRotateFile({
            name: 'error_logger',
            filename: `logs/error.log`,
            prepend: false,
            datePattern: 'YYYY-MM-dd',
            level: 'error',
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger