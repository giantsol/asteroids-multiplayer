import {Socket} from "socket.io"
import {
    ConnectedEvent,
    ConnectedEventCallback, DisconnectedEvent,
    DisconnectedEventCallback
} from "../shared/SocketEvents"

export class ServerSocketEventsHelper {
    public static subscribeConnectedEvent(socket: Socket, callback: ConnectedEventCallback): void {
        socket.on(ConnectedEvent.key, callback)
    }

    public static subscribeDisconnectedEvent(socket: Socket, callback: DisconnectedEventCallback): void {
        socket.on(DisconnectedEvent.key, callback)
    }
}
