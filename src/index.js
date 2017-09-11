import http from 'http'
import path from 'path'

import express from 'express'
import rd from 'rd'

import config from './configuration'

import uploader from 'uploader'

let app = express()
let router = express.Router();

router.get('/', async (req, res, next)=> {
    res.send('hello')
    next()
})

router.post('/', uploader.array('files', 12), async (req, res, next)=> {
    try {
        let uploadFiles = req.files.map((file)=> {
            return path.join(req.query.category || '',file.filename)
        })
        res.send(uploadFiles)
    } catch (err) {
        next(err)
    }
})

app.use(router)

http.createServer(app).listen(8082)

