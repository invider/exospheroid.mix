
let id = 0

class Shader {

    constructor(st) {
        augment(this, {
            id: ++id,
        }, st)

        switch(this.glType) {
            case gl.VERTEX_SHADER:
                this.type = 'vertex'
                break
            case gl.FRAGMENT_SHADER:
                this.type = 'fragment'
                break
        }

        this.register()
        this.compile()
    }

    register() {
        if (!lib._shaderCatalog) lib._shaderCatalog = []
        lib._shaderCatalog.push(this)
    }

    compile() {
        log(`creating and compiling ${this.type} shader [${this.name}]...`)
        if (!this.src) throw new Error(`[${this.id}:${this.name}] can't compile - shader source is missing!`)
        try {
            const glRef = this.glRef = gl.createShader(this.glType)
            gl.shaderSource(glRef, this.src)
            gl.compileShader(glRef)
            if (!gl.getShaderParameter(glRef, gl.COMPILE_STATUS)) {
                const glLog = this.errorLog = gl.getShaderInfoLog(glRef)
                throw new Error(`[${this.id}:${this.name}] shader compilcation error! ${glLog}`)
            }
        } catch(e) {
            log.err(e)
        }
    }

    destruct() {
        gl.deleteShader(this.glRef)
    }

}
