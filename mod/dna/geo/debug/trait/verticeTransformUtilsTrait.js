const verticeTransformUtilsTrait = {

    orig() {
        this.vertices = this.origVertices.map(e => e)
        return this
    },

    applyV1(vx, fn) {
        for (let i = 0; i < vx.length; i++) {
            const v = vx[i]
            const w = fn(v)
            vx[i] = w
        }
    },

    applyV3(vx, fn) {
        for (let i = 0; i < vx.length; i += 3) {
            const x = vx[i], y = vx[i+1], z = vx[i+2]
            const v3 = fn(x, y, z)
            vx[i] = v3[0]
            vx[i+1] = v3[1]
            vx[i+2] = v3[2]
        }
    },

    scale(s) {
        this.applyV1(this.vertices, v => v * s)
        return this
    },
}
