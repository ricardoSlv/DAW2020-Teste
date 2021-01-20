import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import createError from 'http-errors'

import path, { join } from 'path'
const __dirname = path.resolve(path.dirname(''));

import mongoose from 'mongoose'
const mongoDB = 'mongodb://127.0.0.1:27017/daw2021'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

import indexRouter from './routes/index.js'

const app = express()

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static(join(__dirname, 'public')))

app.use('/api', indexRouter)

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, _) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500).jsonp(err.message)
})

export default app
