import {GameDataEvent, GameDataEventCallback} from "../shared/SocketEvents"

export class ClientSocketEventsHelper {

    public static subscribeGameDataEvent(socket: SocketIOClient.Emitter, callback: GameDataEventCallback): void {
        socket.on(GameDataEvent.key, callback)
    }
}
