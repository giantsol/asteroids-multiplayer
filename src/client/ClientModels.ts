import {GameDataDTO} from "../shared/DTOs"
import P5Functions from "./P5Functions"

export class ClientGameData {
    private readonly p5: P5Functions

    constructor(p5: P5Functions) {
        this.p5 = p5
    }

    update(newData: GameDataDTO): void {

    }

    draw(myId: string | null): void {
        const p5 = this.p5
        p5.background(0)
        p5.fill(255)
        if (myId) {
            p5.text(myId, p5.height, p5.width, 20)
        } else {
            p5.text('no myId', p5.height, p5.width, 20)
        }
    }
}