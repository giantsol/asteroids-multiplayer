import {Request, Response} from "express"
import {ServerSocketEventsHelper} from "./ServerSocketEventsHelper"
import {DomainSocket, ServerGameData} from "./ServerModels"
import {RGBColor} from "react-color"
import {PlayerInputDTO} from "../shared/DTOs"

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
    private readonly gameUpdateInterval = 1000 / 60
    private readonly connectedSockets: DomainSocket[] = []

    private readonly gameData: ServerGameData = new ServerGameData()

    constructor() {
        this.gameUpdateLoop = this.gameUpdateLoop.bind(this)
    }

    start(port: string): void {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`)
        })

        ServerSocketEventsHelper.subscribeConnectedEvent(io, socket => {
            this.onConnectedEvent(socket)
        })

        setTimeout(this.gameUpdateLoop, this.gameUpdateInterval)
    }

    private onConnectedEvent(socket: DomainSocket): void {
        console.log(`socket id ${socket.id} connected`)
        this.connectedSockets.push(socket)

        ServerSocketEventsHelper.subscribeDisconnectedEvent(socket, () => {
            this.onDisconnectedEvent(socket)
        })

        ServerSocketEventsHelper.subscribeTryLoggingInEvent(socket, (name, color) => {
            this.onTryLoggingInEvent(socket, name, color)
        })

        ServerSocketEventsHelper.subscribePlayerInputEvent(socket, playerInput => {
            this.onPlayerInputEvent(socket, playerInput)
        })
    }

    private onDisconnectedEvent(socket: DomainSocket): void {
        console.log(`socket id ${socket.id} disconnected`)
        const i = this.connectedSockets.findIndex(value => value.id === socket.id)
        if (i >= 0) {
            this.connectedSockets.splice(i, 1)
        }

        if (socket.me) {
            this.gameData.removePlayer(socket.me)
        }
    }

    private onTryLoggingInEvent(socket: DomainSocket, name: string, color: RGBColor): void {
        if (socket.me) {
            return
        }

        const newPlayer = this.gameData.addPlayer(socket.id, name, color)
        socket.me = newPlayer

        ServerSocketEventsHelper.sendLoggedInEvent(socket, newPlayer.dtoObject)
    }

    private onPlayerInputEvent = (socket: DomainSocket, playerInput: PlayerInputDTO) => {
        if (socket.me) {
            socket.me.applyInput(playerInput)
        }
    }

    private gameUpdateLoop(): void {
        const gameData = this.gameData
        gameData.update()

        const gameDataDTO = gameData.dtoObject
        for (let socket of this.connectedSockets) {
            ServerSocketEventsHelper.sendGameDataEvent(socket, gameDataDTO)
        }

        // recursively call myself
        setTimeout(this.gameUpdateLoop, this.gameUpdateInterval)
    }

}

const server = new Server()
server.start(port)
