class Viewport extends sys.Frame {

    constructor(st) {
        super( augment({
            name: 'port',
        }, st) )

        this.modelPtr = 0
        this.modelStack = []

        this.modelMat4    = mat4.identity()
        this.worldMat4    = mat4.identity()
        this.normalMat4   = mat4.identity()
        this.inversedMat4 = mat4.identity()
    }

    mpush() {
        if (!this.modelStack[this.modelPtr]) this.modelStack[this.modelPtr++] = mat4.clone(this.modelMat4)
        else mat4.copy(this.modelStack[this.modelPtr++], this.modelMat4)
    }

    mpop() {
        mat4.copy(this.modelMat4, this.modelStack[--this.modelPtr])
    }

    draw() {
        const cam = this.__.cam
        if (!cam) return

        // TODO move out to a debug node?
        //if (debug) {
        //    env.stat.lastPolygons = env.stat.polygons
        //    env.stat.polygons = 0
        //}
        // prepare the framebuffer and the drawing context
        gl.clearColor(.11, .02, .13, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.clearDepth(1.0)
        if (env.backfaces) {
            gl.disable(gl.CULL_FACE)
        } else {
            gl.enable(gl.CULL_FACE)
            gl.cullFace(gl.BACK)
        }

        // set the model matrix to identity
        mat4.copy(this.modelMat4, this.inversedMat4)

        // setup up the view and projection transformations
        // TODO merge view and projection into the pv matrix and get it from the camera
        gl.uniformMatrix4fv(_a.p, false, cam.projectionMatrix())
        gl.uniformMatrix4fv(_a.v, false, cam.viewMatrix())
        gl.uniform3fv(_a.ucp, pos)

        // TODO precalc in _dirLight buffer and use that instead?
        const rnv = vec3.clone(env.dv)
        vec3.scale(rnv, -1)
        vec3.n(rnv)

        gl.uniform3fv(_a.udv, rnv)
        gl.uniform4fv(_a.udc, env.dc)

        // set point light uniforms
        gl.uniform3fv(_a.upl, env.pl)
        gl.uniform4fv(_a.upc, env.pc)

        // tune - fog color
        gl.uniform4fv(_a.uF, rgba('1d0722FF'))

        // draw the scene graph
        super.draw()
    }
}
