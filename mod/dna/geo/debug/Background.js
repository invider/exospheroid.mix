class Background {

    constructor(st) {
        extend(this, {
            Z:     0,
            name:  'background',
            color: vec4.rgb('#1C1F22'),
        }, st)
    }

    draw() {
        const c = this.color
        gl.clearColor(c[0], c[1], c[2], c[3])
        gl.clear(gl.COLOR_BUFFER_BIT)
    }

}
