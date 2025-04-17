let id = 0

class Program {

    constructor(st) {
        augment(this, {
            id: ++id,
        }, st)

        this.parse()
        this.register()
        this.glRef = gl.createProgram()
    }

    parse() {
        if (!this.src) throw new Error(`[${id}:${name}] program source is missing!`)

        const paths = this.src.trim().split(':')
        if (paths.length !== 2) {
            throw new Error(`[${id}:${name}] a vertex and a fragment shader paths are expected in .prog`)
        }
        this.vertexPath   = paths[0]
        this.fragmentPath = paths[1]
    }

    register() {
        if (!lib._programCatalog) lib._programCatalog = []
        lib._programCatalog.push(this)
    }

    bindShaders() {
        const vShader = this.vShader = _.selectOne(this.vertexPath)
        const fShader = this.fShader = _.selectOne(this.fragmentPath)

        if (!vShader) throw `[${this.id}:${this.name}] Can't find vertex shader @[${this.vertexPath}]`
        if (!(vShader instanceof dna.gl.Shader) || vShader.TYPE !== 'vertex') {
            throw `Wrong Shader! Expecting a vertex shader @[${this.vertexPath}]`
        }
        if (!fShader) throw `[${this.id}:${this.name}] Can't find fragment shader @[${this.fragmentPath}]`
        if (!(fShader instanceof dna.gl.Shader) || fShader.TYPE !== 'fragment') {
            throw `Wrong Shader! Expecting a fragment shader @[${this.vertexPath}]`
        }
    }

    link() {
        this.bindShaders()

        const glRef = this.glRef
        gl.attachShader(glRef, this.vShader.glRef)
        gl.attachShader(glRef, this.fShader.glRef)

        gl.linkProgram(glRef)
        gl.validateProgram(glRef)
        if (!gl.getProgramParameter(glRef, gl.VALIDATE_STATUS)) {
            const glLog = gl.getProgramInfoLog(glRef)
            throw new Error(`[${this.id}:${this.name}] unable to link the program: ${glLog}`)
        }

        // won't work with multiple programs!
        this.use()
    }

    use() {
        lib.glu.useProgram(this)
    }
}
