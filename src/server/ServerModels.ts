import {Socket} from "socket.io"
import {GameDataDTO} from "../shared/DTOs"

export interface DomainSocket extends Socket {

}

export class ServerGameData {
    private readonly width: number = 4000
    private readonly height: number = 4000

    update(): void {

    }

    toDTO(): GameDataDTO {
        return {
            width: this.width,
            height: this.height
        }
    }
}
