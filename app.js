const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./utils/loggers/logger');
const NotFoundError = require('./errors/http_errors/resource_not_found_error')
const httpErrorHandler = require('./middlewares/http_error_handler')
require('./services/mongodb_connection')

const indexRouter = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/static')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    if (!res.headersSent) {
        next(new NotFoundError(req.path,req.method));
    }
});

// http error handler
app.use(httpErrorHandler());

process.on('uncaughtException', (err) => {
    logger.error('uncaught exception', { err });
});

process.on('unhandledRejection', (reason, p) => {
    logger.error('unhandledRejection', { reason, p });
});
module.exports = app;
