import {Socket} from "socket.io"
import {GameDataDTO, PlayerDTO, PlayerInputDTO} from "../shared/DTOs"
import {RGBColor} from "react-color"
import {Constants} from "../shared/Constants"
import Victor = require("victor")

export interface DomainSocket extends Socket {
    me: ServerPlayer
}

export class ServerGameData {
    private readonly width: number = 4000
    private readonly height: number = 4000

    private readonly players: ServerPlayer[] = []

    update(): void {
        const width = this.width
        const height = this.height
        const players = this.players

        players.forEach(player => player.update(width, height))
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
    private static readonly maxSpeed = 8

    readonly id: string
    private readonly name: string
    private readonly color: RGBColor
    private readonly size: number = 15
    private x: number
    private y: number
    private heading: number = Constants.HALF_PI
    private readonly vertices: number[][] = []
    private showTail: boolean = false

    private readonly velocity = new Victor(0, 0)
    private readonly acceleration = new Victor(0, 0)
    private readonly boostingForce = new Victor(0, 0)
    private rotation = 0
    private isBoosting = false

    private isFiring = false
    private readonly fireInterval = 1000 / 4
    private now = 0
    private then = Date.now()
    private fireDelta = 0

    constructor(id: string, name: string, color: RGBColor, x: number, y: number) {
        this.id = id
        this.name = name
        this.color = color
        this.x = x
        this.y = y

        const size = this.size
        this.vertices.push([-size, size], [size, size], [0, -size])
    }

    toDTO(): PlayerDTO {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            x: this.x,
            y: this.y,
            size: this.size,
            heading: this.heading,
            vertices: this.vertices,
            showTail: this.showTail
        }
    }

    applyInput(input: PlayerInputDTO): void {
        this.isBoosting = input.up

        if (input.left) {
            this.rotation = -0.08
        } else if (input.right) {
            this.rotation = 0.08
        } else if (!input.left && !input.right) {
            this.rotation = 0
        }

        this.isFiring = input.fire
    }

    update(width: number, height: number): void {
        this.heading += this.rotation

        this.updateBoostingForce(this.isBoosting)
        this.acceleration.add(this.boostingForce)
        this.velocity.add(this.acceleration)
        if (this.velocity.magnitude() > ServerPlayer.maxSpeed) {
            this.velocity.norm().multiplyScalar(ServerPlayer.maxSpeed)
        }
        this.velocity.multiplyScalar(0.99)
        this.x += this.velocity.x
        this.y += this.velocity.y

        this.checkEdges(width, height)

        this.acceleration.multiplyScalar(0)

        if (this.isFiring) {
            this.now = Date.now()
            this.fireDelta = this.now - this.then
            if (this.fireDelta > this.fireInterval) {
                this.then = this.now

                // todo: fire bullet!
            }
        }

        this.showTail = this.velocity.magnitude() > 1
    }

    private updateBoostingForce(isBoosting: boolean): void {
        if (isBoosting) {
            this.boostingForce.addScalar(1).rotateBy(this.heading + Constants.HALF_PI).normalize().multiplyScalar(0.1)
        } else {
            this.boostingForce.multiplyScalar(0)
        }
    }

    private checkEdges(width: number, height: number): void {
        const r = this.size

        if (this.x > width + r) {
            this.x = -r
        } else if (this.x < -r) {
            this.x = width + r
        }

        if (this.y > height + r) {
            this.y = -r
        } else if (this.y < -r) {
            this.y = height + r
        }
    }
}
