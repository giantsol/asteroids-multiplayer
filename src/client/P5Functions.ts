// custom p5 functions that will wrap canvas api
export default interface P5Functions {
    width: number
    height: number
    background(color: number): void
    background(r: number, g: number, b: number): void
    background(r: number, g: number, b: number, a: number): void
    stroke(color: number): void
    stroke(r: number, g: number, b: number): void
    stroke(r: number, g: number, b: number, a: number): void
    strokeWeight(weight: number): void
    noStroke(): void
    fill(color: number): void
    fill(r: number, g: number, b: number): void
    fill(r: number, g: number, b: number, a: number): void
    noFill(): void
    ellipse(x: number, y: number, width: number, height: number): void
    translate(x: number, y: number): void
    rotate(radian: number): void
    line(x1: number, y1: number, x2: number, y2: number): void
    beginShape(): void
    endShape(): void
    vertex(x: number, y: number): void
    triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void
    save(): void
    restore(): void
    scale(amount: number): void
    text(text: string, x: number, y: number, size: number): void
    rect(x1: number, y1: number, x2: number, y2: number): void
}