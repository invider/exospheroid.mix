let id = 0

class WireMesh extends dna.geo.Surface {

    constructor(st) {
        super( augment({
            name: 'wireMesh' + (++id),
        }, st) )
    }

    draw() {
        if (!env.showHitBoxes) return
        if (this.__.strangeSolid) return

        _.mpush()
        if (this.__.strangeSolid) {
            mat4.translate(mMatrix, this.__.pos)
        } else {
            mat4.copy(mMatrix, _mStack[_mPtr - 1])
            for (let i = 0; i < 12; i++) mMatrix[i] = 0
            mMatrix[0]  = 1
            mMatrix[5]  = 1
            mMatrix[10] = 1
        }
        super.draw()
        _.mpop()
    }
}
