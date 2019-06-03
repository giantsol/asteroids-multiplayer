import {GameDataDTO, PlayerDTO} from "../shared/DTOs"
import P5Functions from "./P5Functions"
import Utils from "../shared/Utils"
import {RGBColor} from "react-color"
import {Constants} from "../shared/Constants"

export class ClientGameData {
    private readonly p5: P5Functions
    private readonly players: ClientPlayer[] = []

    constructor(p5: P5Functions) {
        this.p5 = p5
    }

    update(newData: GameDataDTO): void {
        Utils.updateArrayData(this.players, newData.players,
            (e, n) => e.id === n.id,
            (e, n) => e.update(n),
            n => new ClientPlayer(n, this.p5)
        )
    }

    draw(myId: string | null): void {
        const p5 = this.p5
        p5.background(0)

        p5.save()
        for (let player of this.players) {
            player.draw()
        }
        p5.restore()
    }
}

export class ClientPlayer {
    readonly id: string
    private readonly name: string
    private readonly size: number
    private readonly vertices: number[][]
    private readonly nameOffset: number
    private readonly tailSize: number
    private readonly tailMinRotation = Constants.QUARTER_PI
    private readonly tailMaxRotation = 3 * Constants.QUARTER_PI

    private color: RGBColor
    private x: number
    private y: number
    private heading: number
    private showTail: boolean

    private readonly p5: P5Functions

    constructor(dto: PlayerDTO, p5: P5Functions) {
        this.id = dto.id
        this.name = dto.name
        this.size = dto.size
        this.vertices = dto.vertices
        this.nameOffset = -this.size * 2
        this.tailSize = this.size * 1.3

        this.color = dto.color
        this.x = dto.x
        this.y = dto.y
        this.heading = dto.heading
        this.showTail = dto.showTail

        this.p5 = p5
    }

    update(newData: PlayerDTO): void {
        this.x = newData.x
        this.y = newData.y
        this.color = newData.color
        this.heading = newData.heading
        this.showTail = newData.showTail
    }

    draw(): void {
        const p5 = this.p5
        p5.save()
        p5.translate(this.x, this.y)

        // write name above
        p5.save()
        p5.translate(0, this.nameOffset)
        p5.fill(255)
        p5.text(this.name, 0, 0, 24)
        p5.restore()

        const color = this.color
        p5.fill(color.r, color.g, color.b)
        p5.stroke(color.r, color.g, color.b)

        p5.rotate(this.heading - Constants.HALF_PI)
        const vertices = this.vertices
        p5.triangle(vertices[0][0], vertices[0][1],
            vertices[1][0], vertices[1][1],
            vertices[2][0], vertices[2][1])

        if (this.showTail) {
            p5.save()
            p5.stroke(color.r, color.g, color.b)
            p5.strokeWeight(3)
            p5.translate(0, this.size)
            p5.rotate(Utils.map(Math.random(), 0, 1, this.tailMinRotation, this.tailMaxRotation))
            p5.line(0, 0, this.tailSize, 0)
            p5.restore()
        }

        p5.restore()
    }
}