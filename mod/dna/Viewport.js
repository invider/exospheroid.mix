class Viewport extends sys.LabFrame {

    constructor(st) {
        super( augment({
            name:  'port',
            cam:    null,

            hidden: false,
        }, st) )
    }

    bindCamera(cam) {
        if (!(cam instanceof dna.Camera)) throw new Error(`Wrong camera entity - it is supposed to be an instance of dna.Camera!`)
        this.cam = pin.cam = cam
    }

    setupDraw() {
        //lib.glut.useProgram(lib.glsl.zprog.zap)
        glu.withProgram(lib.glsl.zprog.zap)

        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.disable(gl.CULL_FACE)
        //gl.enable(gl.CULL_FACE)

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.clearDepth(1.0)
        gl.clearColor(.11, .02, .13, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    }

    setUniforms() {
        const cam = this.cam,
              uloc = glu.uloc

        // set the model matrix to identity
        // mat4.copy(this.modelMat4, this.inversedMat4)
        glu.setIdentity()

        // setup up the view and projection transformations
        // TODO merge view and projection into the pv matrix and get it from the camera
        gl.uniformMatrix4fv(uloc.uProjectionMatrix, false, cam.projectionMatrix())
        gl.uniformMatrix4fv(uloc.uViewMatrix, false, cam.viewMatrix())
        gl.uniformMatrix4fv(uloc.uModelMatrix, false, glu.modelMatrix)
        gl.uniform3fv(uloc.uCamPos, cam.pos)
        //gl.uniformMatrix4fv(uloc.uProjectionMatrix, false, mat4.identity())
        //gl.uniformMatrix4fv(uloc.uViewMatrix, false, mat4.identity())
        //gl.uniformMatrix4fv(uloc.uModelMatrix, false, mat4.identity())
        //gl.uniform3fv(uloc.uCamPos, vec3.izero())

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
        if (!glu.glProg || !this.cam) return

        this.setupDraw()

        // TODO move out to a debug node?
        if (env.debug) {
            env.stat.lastPolygons = env.stat.polygons
            env.stat.polygons = 0
        }

        /*
        if (env.backfaces) {
            gl.disable(gl.CULL_FACE)
        } else {
            gl.enable(gl.CULL_FACE)
            gl.cullFace(gl.BACK)
        }
        */

        this.setUniforms()

        // draw the scene graph
        super.draw()
    }

    unbindCamera() {
        this.cam = null
    }
}
