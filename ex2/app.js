import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan' 
import axios from 'axios'

import createError from 'http-errors'

import path, { join } from 'path'
const __dirname = path.resolve(path.dirname(''));

import mongoose from 'mongoose'
const mongoDB = 'mongodb://127.0.0.1:27017/dbDawSpec2020'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//app.use(express.static(join(__dirname, 'public')))

let token = "Token Missing"
axios.post('http://clav-api.di.uminho.pt/v2/users/login', {
    username: "daw2020@teste.uminho.pt",
    password: "232"
}, {
    headers: {
        ['Content-Type']: 'application/json'
    }
}).then(resp => { token = resp.data.token ; console.log('Token done')})

app.get('/', async (req,res,next)=>{
    try{
        res.render('landing')}
    catch(err) {
        res.render('error',{error: err})
    }
})

app.get('/classes', async (req,res,next)=>{
    try{
    const resp = await axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token='+token)
    
    res.render('classes',{classes: resp.data})}
    catch(err) {
        console.log(err.response?.data || err)
        res.render('error',{error: err})
    }
})

app.get('/termosIndice', async (req,res,next)=>{
    try{
    const resp = await axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token='+token)
    
    res.render('termos',{termos: resp.data})}
    catch(err) {
        console.log(err.response?.data || err)
        res.render('error',{error: err})
    }
})

app.get('/classes/:codigo', async (req, res, next) => {
    try {
        const classe = (await axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.codigo + '?token=' + token)).data
        const descendencia = (await axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.codigo + '/descendencia' + '?token=' + token)).data
        
        res.render('classe', {classe, descendencia})
    } catch (err) {
        console.log(err.response?.data || err)
        res.render('error', { error: err })
    }
})

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, _) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

export default app
