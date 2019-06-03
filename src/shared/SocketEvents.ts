import {DomainSocket} from "../server/ServerModels"

export type ConnectedEventCallback = (socket: DomainSocket) => void
export class ConnectedEvent {
    static readonly key = "connection"
}

export type DisconnectedEventCallback = () => void
export class DisconnectedEvent {
    static readonly key = "disconnect"
}
