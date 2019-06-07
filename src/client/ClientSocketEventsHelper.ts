import {
    GameDataEvent,
    GameDataEventCallback,
    KilledByAsteroidEvent,
    KilledByAsteroidEventCallback,
    KilledByPlayerEvent,
    KilledByPlayerEventCallback,
    LoggedInEvent,
    LoggedInEventCallback,
    NewPlayerJoinedEvent,
    NewPlayerJoinedEventCallback,
    OtherPlayerKilledByAsteroidEvent,
    OtherPlayerKilledByAsteroidEventCallback,
    OtherPlayerKilledByPlayerEvent,
    OtherPlayerKilledByPlayerEventCallback,
    PlayerInputEvent,
    PlayerLeftEvent,
    PlayerLeftEventCallback,
    TryLoggingInEvent
} from "../shared/SocketEvents"
import {RGBColor} from "react-color"
import {PlayerInputDTO} from "../shared/DTOs"

export class ClientSocketEventsHelper {

    public static subscribeLoggedInEvent(socket: SocketIOClient.Emitter, callback: LoggedInEventCallback): void {
        socket.on(LoggedInEvent.key, callback)
    }

    public static subscribeGameDataEvent(socket: SocketIOClient.Emitter, callback: GameDataEventCallback): void {
        socket.on(GameDataEvent.key, callback)
    }

    public static subscribeNewPlayerJoinedEvent(socket: SocketIOClient.Emitter, callback: NewPlayerJoinedEventCallback): void {
        socket.on(NewPlayerJoinedEvent.key, callback)
    }

    public static subscribeKilledByAsteroidEvent(socket: SocketIOClient.Emitter, callback: KilledByAsteroidEventCallback): void {
        socket.on(KilledByAsteroidEvent.key, callback)
    }

    public static subscribeOtherPlayerKilledByAsteroidEvent(socket: SocketIOClient.Emitter, callback: OtherPlayerKilledByAsteroidEventCallback):void {
        socket.on(OtherPlayerKilledByAsteroidEvent.key, callback)
    }

    public static subscribeKilledByPlayerEvent(socket: SocketIOClient.Emitter, callback: KilledByPlayerEventCallback): void {
        socket.on(KilledByPlayerEvent.key, callback)
    }

    public static subscribeOtherPlayerKilledByPlayerEvent(socket: SocketIOClient.Emitter, callback: OtherPlayerKilledByPlayerEventCallback):void {
        socket.on(OtherPlayerKilledByPlayerEvent.key, callback)
    }

    public static subscribePlayerLeftEvent(socket: SocketIOClient.Emitter, callback: PlayerLeftEventCallback): void {
        socket.on(PlayerLeftEvent.key, callback)
    }

    public static sendTryLoggingInEvent(socket: SocketIOClient.Emitter, name: string, color: RGBColor): void {
        socket.emit(TryLoggingInEvent.key, ...TryLoggingInEvent.emitterParams(name, color))
    }

    public static sendPlayerInput(socket: SocketIOClient.Emitter, playerInput: PlayerInputDTO): void {
        socket.emit(PlayerInputEvent.key, ...PlayerInputEvent.emitterParams(playerInput))
    }

}
