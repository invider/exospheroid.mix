
let id = 0

class Dot {

    constructor(st) {
        extend(this, {
            name: 'dot' + (++id),
        }, st)
    }

    draw() {

    }
}
