class Viewport extends sys.LabFrame {

    constructor(st) {
        super( augment({
            name: 'port',
        }, st) )

        this.cam = null

        this.modelPtr = 0
        this.modelStack = []

        this.modelMat4    = mat4.identity()
        this.worldMat4    = mat4.identity()
        this.normalMat4   = mat4.identity()
        this.inversedMat4 = mat4.identity()
    }

    bindCamera(cam) {
        if (!(cam instanceof dna.Camera)) throw new Error(`Wrong camera entity - it is supposed to be an instance of dna.Camera!`)
        this.cam = cam
    }

    mpush() {
        if (!this.modelStack[this.modelPtr]) this.modelStack[this.modelPtr++] = mat4.clone(this.modelMat4)
        else mat4.copy(this.modelStack[this.modelPtr++], this.modelMat4)
    }

    mpop() {
        mat4.copy(this.modelMat4, this.modelStack[--this.modelPtr])
    }

    setupDraw() {
        gl.clearColor(.11, .02, .13, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.clearDepth(1.0)
    }

    setUniforms() {
        const cam = this.cam,
              uloc = gl.curProg.uloc

        // set the model matrix to identity
        mat4.copy(this.modelMat4, this.inversedMat4)

        // setup up the view and projection transformations
        // TODO merge view and projection into the pv matrix and get it from the camera
        gl.uniformMatrix4fv(uloc.uProjectionMatrix, false, cam.projectionMatrix())
        gl.uniformMatrix4fv(uloc.uViewMatrix, false, cam.viewMatrix())
        gl.uniform3fv(uloc.uCamPos, cam.pos)

        // TODO precalc in _dirLight buffer and use that instead?
        const nDirLightVec = vec3.clone(env.aura.dirLightVec)
        vec3.scale(nDirLightVec, nDirLightVec, -1)
        vec3.normalize(nDirLightVec, nDirLightVec)

        gl.uniform3fv(uloc.uDirLightVec,   nDirLightVec)
        gl.uniform4fv(uloc.uDirLightColor, env.aura.dirLightColor)

        // set point light uniforms
        gl.uniform3fv(uloc.uPointLights, env.aura.pointLights)
        gl.uniform4fv(uloc.uPointLightColors, env.aura.pointLightColors)

        // tune - fog color
        gl.uniform4fv(uloc.uFogDepth, vec4.rgba('#1d0722FF'))
    }

    draw() {
        if (!this.cam || !gl.curProg) return

        this.setupDraw()

        // TODO move out to a debug node?
        //if (debug) {
        //    env.stat.lastPolygons = env.stat.polygons
        //    env.stat.polygons = 0
        //}
        // prepare the framebuffer and the drawing context
        if (env.backfaces) {
            gl.disable(gl.CULL_FACE)
        } else {
            gl.enable(gl.CULL_FACE)
            gl.cullFace(gl.BACK)
        }

        this.setUniforms()

        // draw the scene graph
        super.draw()
    }

    unbindCamera() {
        this.cam = null
    }
}
