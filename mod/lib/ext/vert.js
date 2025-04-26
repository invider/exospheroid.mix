function vert(src, name, path, base) {
    return new dna.gl.Shader({
        glType: gl.VERTEX_SHADER,
        name:   name,
        src:    src,
        defs:   lib.glut.parseUniforms(src),
    })
}
