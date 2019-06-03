import {Socket} from "socket.io"
import {
    ConnectedEvent,
    ConnectedEventCallback, DisconnectedEvent,
    DisconnectedEventCallback, GameDataEvent
} from "../shared/SocketEvents"
import {GameDataDTO} from "../shared/DTOs"
import {DomainSocket} from "./ServerModels"

export class ServerSocketEventsHelper {
    public static subscribeConnectedEvent(socket: Socket, callback: ConnectedEventCallback): void {
        socket.on(ConnectedEvent.key, callback)
    }

    public static subscribeDisconnectedEvent(socket: DomainSocket, callback: DisconnectedEventCallback): void {
        socket.on(DisconnectedEvent.key, callback)
    }

    public static sendGameData(socket: DomainSocket, gameData: GameDataDTO): void {
        socket.emit(GameDataEvent.key, ...GameDataEvent.emitterParams(gameData))
    }
}
