import {Request, Response} from "express"

const paths = require('../../config/paths');
const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || '3000'

app.use(express.static('build'))

app.get('/', (req: Request, res: Response) => {
    res.sendFile(paths.appHtml, { root: paths.appBuild })
})

class Server {
    start(port: string): void {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`)
        })
    }

}

const server = new Server()
server.start(port)
