import {Socket} from "socket.io"
import {GameDataDTO, PlayerDTO} from "../shared/DTOs"
import {RGBColor} from "react-color"

export interface DomainSocket extends Socket {
    me: ServerPlayer
}

export class ServerGameData {
    private readonly width: number = 4000
    private readonly height: number = 4000

    private readonly players: ServerPlayer[] = []

    update(): void {

    }

    toDTO(): GameDataDTO {
        return {
            width: this.width,
            height: this.height,
            players: this.players.map(value => value.toDTO())
        }
    }

    addPlayer(id: string, name: string, color: RGBColor): ServerPlayer {
        const newPlayer = new ServerPlayer(id, name, color, this.width / 2, this.height / 2)
        this.players.push(newPlayer)
        return newPlayer
    }

    removePlayer(player: ServerPlayer): void {
        const index = this.players.findIndex(value => player.id === value.id)
        if (index >= 0) {
            this.players.splice(index, 1)
        }
    }
}

export class ServerPlayer {
    readonly id: string
    private readonly name: string
    private readonly color: RGBColor
    private x: number
    private y: number

    constructor(id: string, name: string, color: RGBColor, x: number, y: number) {
        this.id = id
        this.name = name
        this.color = color
        this.x = x
        this.y = y
    }

    toDTO(): PlayerDTO {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            x: this.x,
            y: this.y
        }
    }
}
