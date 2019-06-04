// Data Transfer Objects
import {RGBColor} from "react-color"

export interface GameDataDTO {
    height: number
    width: number
    players: PlayerDTO[]
    bullets: BulletDTO[]
    asteroids: AsteroidDTO[]
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

export interface BulletDTO {
    id: string
    x: number
    y: number
    heading: number
    vertices: number[][]
    color: RGBColor
}

export interface AsteroidDTO {
    id: string
    x: number
    y: number
    rotation: number
    vertices: number[][]
}
