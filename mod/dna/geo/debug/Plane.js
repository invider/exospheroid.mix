
let id = 0


class Plane extends dna.EntityFrame {

    constructor(st) {
        if (!st._traits) st._traits = []
        st._traits = augment(st._traits, [ dna.geo.debug.trait.verticeTransformUtilsTrait ])

        super( extend({
            name: 'plane' + (++id),
            scale: 4,
        }, st) )
    }

    init() {
        // select the buffer to apply operations to
        this.origVertices = new Float32Array([
            // left triangle
            -1,  1,  0,
             1,  1,  0,
            -1, -1,  0,

            // right triangle
             1,  1,  0,
            -1, -1,  0,
             1, -1,  0
        ])
        this.orig().scale(.5)

        this.posBufRef = gl.createBuffer()
        this.bindBuffer()
    }

    bindBuffer() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBufRef)
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        return this
    }

    draw() {
        lib.glut.useProgram(lib.glsl.zprog.zap)

        // setup the rendering pipeline
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBufRef)
        gl.vertexAttribPointer( gl.getAttribLocation(gl.curProg.glRef, 'aVertPos'), 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray( gl.getAttribLocation(gl.curProg.glRef, 'aVertPos') )
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3)
    }

}
