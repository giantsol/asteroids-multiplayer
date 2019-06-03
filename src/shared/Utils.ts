
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
}