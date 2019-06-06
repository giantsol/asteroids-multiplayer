import {CollidingObject} from "../server/ServerModels"

export default class Utils {

    static updateArrayData<E, N>(es: E[], ns: N[],
                                 comparator: (e: E, n: N) => boolean,
                                 updater: (e: E, n: N) => void,
                                 creator: (n: N) => E): void {
        let i = es.length
        while (i--) {
            const e = es[i]
            const ni = ns.findIndex(n => comparator(e, n))
            if (ni < 0) {
                es.splice(i, 1)
            } else {
                const n = ns[ni]
                updater(e, n)
                ns.splice(ni, 1)
            }
        }

        for (let n of ns) {
            es.push(creator(n))
        }
    }

    static map(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    }

    static pickRandom<A>(as: A[]): A | null {
        if (as.length <= 0) {
            return null
        } else {
            const randIndex = Utils.randInt(0, as.length - 1)
            return as[randIndex]
        }
    }


    // min&max inclusive
    // min and max must be integers
    static randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static checkCollidedWith(me: CollidingObject, othersArray: CollidingObject[][]): void {
        for (let objects of othersArray) {
            if (objects.length === 0) {
                continue
            }

            // first, sort objects by closest order
            const myX = me.x
            const myY = me.y
            objects.sort((a: CollidingObject, b: CollidingObject) => {
                return Utils.distance(myX, myY, a.x, a.y) - Utils.distance(myX, myY, b.x, b.y)
            })

            for (let object of objects) {
                if (me.isCollisionTarget(object)) {
                    const dist = Utils.distance(myX, myY, object.x, object.y)
                    if (dist > me.maxCollidingDistance + object.maxCollidingDistance) {
                        // it's too far that it's not worth checking line intersection
                        break
                    } else if (dist < me.minCollidingDistance + object.minCollidingDistance) {
                        // found intersection!
                        // process collision and break out of the function
                        me.processCollidedWith(object)
                        return
                    }

                    // now check line intersection
                    const myVertices = me.vertices
                    const otherVertices = object.vertices
                    const otherX = object.x
                    const otherY = object.y
                    for (let i = 0; i < myVertices.length - 1; i++) {
                        for (let j = 0; j < otherVertices.length - 1; j++) {
                            const mv1 = myVertices[i]
                            const mv2 = myVertices[i+1]
                            const ov1 = otherVertices[j]
                            const ov2 = otherVertices[j+1]
                            if (Utils.intersects(mv1[0] + myX, mv1[1] + myY, mv2[0] + myX, mv2[1] + myY,
                                ov1[0] + otherX, ov1[1] + otherY, ov2[0] + otherX, ov2[1] + otherY)) {
                                // found intersection!
                                // process collision and break out of the function
                                me.processCollidedWith(object)
                                return
                            }
                        }
                    }
                }
            }
        }
    }

    private static distance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.hypot(x2-x1, y2-y1)
    }

    // returns true iff the line from (x11, y11)->(x12, y12) intersects with (x21, y21)->(x22, y22)
    private static intersects(x11: number, y11: number,
                              x12: number, y12: number,
                              x21: number, y21: number,
                              x22: number, y22: number) {
        let det, gamma, lambda
        det = (x12 - x11) * (y22 - y21) - (x22 - x21) * (y12 - y11)
        if (det === 0) {
            return false
        } else {
            lambda = ((y22 - y21) * (x22 - x11) + (x21 - x22) * (y22 - y11)) / det
            gamma = ((y11 - y12) * (x22 - x11) + (x12 - x11) * (y22 - y11)) / det
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)
        }
    }
}