// Data Transfer Objects
import {RGBColor} from "react-color"

export interface GameDataDTO {
    height: number
    width: number
    players: PlayerDTO[]
}

export interface PlayerDTO {
    id: string
    name: string
    color: RGBColor
    x: number
    y: number
    size: number
    heading: number
    vertices: number[][]
    showTail: boolean
}

export interface PlayerInputDTO {
    left: boolean
    right: boolean
    up: boolean
    fire: boolean
}
