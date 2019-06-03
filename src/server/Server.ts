import {Request, Response} from "express"
import {ServerSocketEventsHelper} from "./ServerSocketEventsHelper"
import {DomainSocket} from "./ServerModels"

const paths = require('../../config/paths');
const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || '3000'
const io = require('socket.io')(http)

app.use(express.static('build'))

app.get('/', (req: Request, res: Response) => {
    res.sendFile(paths.appHtml, { root: paths.appBuild })
})

class Server {
    start(port: string): void {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`)
        })

        ServerSocketEventsHelper.subscribeConnectedEvent(io, socket => {
            this.onConnectedEvent(socket)
        })
    }

    private onConnectedEvent(socket: DomainSocket): void {
        console.log(`socket id ${socket.id} connected`)

        ServerSocketEventsHelper.subscribeDisconnectedEvent(socket, () => {
            this.onDisconnectedEvent(socket)
        })
    }

    private onDisconnectedEvent(socket: DomainSocket): void {
        console.log(`socket id ${socket.id} disconnected`)
    }

}

const server = new Server()
server.start(port)
