import {DomainSocket} from "../server/ServerModels"
import {GameDataDTO, PlayerDTO} from "./DTOs"
import {RGBColor} from "react-color"

export type ConnectedEventCallback = (socket: DomainSocket) => void
export class ConnectedEvent {
    static readonly key = "connection"
}

export type DisconnectedEventCallback = () => void
export class DisconnectedEvent {
    static readonly key = "disconnect"
}

export type LoggedInEventCallback = (you: PlayerDTO) => void
export class LoggedInEvent {
    static readonly key = "logged_in"
    static emitterParams(you: PlayerDTO): any[] {
        return [you]
    }
}

export type GameDataEventCallback = (gameData: GameDataDTO) => void
export class GameDataEvent {
    static readonly key = "game_data"
    static emitterParams(gameData: GameDataDTO): any[] {
        return [gameData]
    }
}

export type TryLoggingInEventCallback = (name: string, color: RGBColor) => void
export class TryLoggingInEvent {
    static readonly key = "try_logging_in"
    static emitterParams(name: string, color: RGBColor): any[] {
        return [name, color]
    }
}
