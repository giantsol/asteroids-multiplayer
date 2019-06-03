import {
    GameDataEvent,
    GameDataEventCallback,
    LoggedInEvent,
    LoggedInEventCallback, TryLoggingInEvent
} from "../shared/SocketEvents"
import {RGBColor} from "react-color"

export class ClientSocketEventsHelper {

    public static subscribeLoggedInEvent(socket: SocketIOClient.Emitter, callback: LoggedInEventCallback): void {
        socket.on(LoggedInEvent.key, callback)
    }

    public static subscribeGameDataEvent(socket: SocketIOClient.Emitter, callback: GameDataEventCallback): void {
        socket.on(GameDataEvent.key, callback)
    }

    public static sendTryLoggingInEvent(socket: SocketIOClient.Emitter, name: string, color: RGBColor): void {
        socket.emit(TryLoggingInEvent.key, ...TryLoggingInEvent.emitterParams(name, color))
    }
}
