import {DomainSocket} from "../server/ServerModels"
import {GameDataDTO, PlayerDTO, PlayerInputDTO} from "./DTOs"
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

export type PlayerInputEventCallback = (playerInput: PlayerInputDTO) => void
export class PlayerInputEvent {
    static readonly key = "player_input"
    static emitterParams(playerInput: PlayerInputDTO): any[] {
        return [playerInput]
    }
}

export type NewPlayerJoinedEventCallback = (player: PlayerDTO) => void
export class NewPlayerJoinedEvent {
    static readonly key = "new_player_joined"
    static emitterParams(player: PlayerDTO): any[] {
        return [player]
    }
}

export type KilledByAsteroidEventCallback = (killedPlayer: PlayerDTO) => void
export class KilledByAsteroidEvent {
    static readonly key = "killed_by_asteroid"
    static emitterParams(killedPlayer: PlayerDTO): any[] {
        return [killedPlayer]
    }
}

export type OtherPlayerKilledByAsteroidEventCallback = (killedPlayer: PlayerDTO) => void
export class OtherPlayerKilledByAsteroidEvent {
    static readonly key = "other_player_killed_by_asteroid"
    static emitterParams(killedPlayer: PlayerDTO): any[] {
        return [killedPlayer]
    }
}

export type KilledByPlayerEventCallback = (killer: PlayerDTO, killed: PlayerDTO) => void
export class KilledByPlayerEvent {
    static readonly key = "killed_by_player"
    static emitterParams(killer: PlayerDTO, killed: PlayerDTO): any[] {
        return [killer, killed]
    }
}

export type OtherPlayerKilledByPlayerEventCallback = (killer: PlayerDTO, killed: PlayerDTO) => void
export class OtherPlayerKilledByPlayerEvent {
    static readonly key = "other_player_killed_by_player"
    static emitterParams(killer: PlayerDTO, killed: PlayerDTO): any[] {
        return [killer, killed]
    }
}

export type PlayerLeftEventCallback = (player: PlayerDTO) => void
export class PlayerLeftEvent {
    static readonly key = "player_left"
    static emitterParams(player: PlayerDTO): any[] {
        return [player]
    }
}
