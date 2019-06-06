import {Socket} from "socket.io"
import {
    ConnectedEvent,
    ConnectedEventCallback,
    DisconnectedEvent,
    DisconnectedEventCallback,
    GameDataEvent,
    KilledByAsteroidEvent,
    KilledByPlayerEvent,
    LoggedInEvent,
    NewPlayerJoinedEvent,
    OtherPlayerKilledByAsteroidEvent,
    OtherPlayerKilledByPlayerEvent,
    PlayerInputEvent,
    PlayerInputEventCallback,
    PlayerLeftEvent,
    TryLoggingInEvent,
    TryLoggingInEventCallback
} from "../shared/SocketEvents"
import {GameDataDTO, PlayerDTO} from "../shared/DTOs"
import {DomainSocket} from "./ServerModels"

export class ServerSocketEventsHelper {
    public static subscribeConnectedEvent(socket: Socket, callback: ConnectedEventCallback): void {
        socket.on(ConnectedEvent.key, callback)
    }

    public static subscribeDisconnectedEvent(socket: DomainSocket, callback: DisconnectedEventCallback): void {
        socket.on(DisconnectedEvent.key, callback)
    }

    public static subscribeTryLoggingInEvent(socket: DomainSocket, callback: TryLoggingInEventCallback): void {
        socket.on(TryLoggingInEvent.key, callback)
    }

    public static subscribePlayerInputEvent(socket: Socket, callback: PlayerInputEventCallback): void {
        socket.on(PlayerInputEvent.key, callback)
    }

    public static sendGameDataEvent(socket: DomainSocket, gameData: GameDataDTO): void {
        socket.emit(GameDataEvent.key, ...GameDataEvent.emitterParams(gameData))
    }

    public static sendLoggedInEvent(socket: Socket, player: PlayerDTO): void {
        socket.emit(LoggedInEvent.key, ...LoggedInEvent.emitterParams(player))
        socket.broadcast.emit(NewPlayerJoinedEvent.key, ...NewPlayerJoinedEvent.emitterParams(player))
    }

    public static sendKilledByAsteroidEvent(socket: Socket, killedPlayer: PlayerDTO): void {
        socket.emit(KilledByAsteroidEvent.key, ...KilledByAsteroidEvent.emitterParams(killedPlayer))
        socket.broadcast.emit(OtherPlayerKilledByAsteroidEvent.key,
            ...OtherPlayerKilledByAsteroidEvent.emitterParams(killedPlayer))
    }

    public static sendKilledByPlayerEvent(socket: Socket, killer: PlayerDTO, killed: PlayerDTO): void {
        socket.emit(KilledByPlayerEvent.key, ...KilledByPlayerEvent.emitterParams(killer, killed))
        socket.broadcast.emit(OtherPlayerKilledByPlayerEvent.key,
            ...OtherPlayerKilledByPlayerEvent.emitterParams(killer, killed))
    }

    public static sendPlayerLeftEvent(socket: Socket, player: PlayerDTO): void {
        socket.broadcast.emit(PlayerLeftEvent.key, ...PlayerLeftEvent.emitterParams(player))
    }
}
