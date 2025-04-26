function frag(src, name, path, base) {
    return new dna.gl.Shader({
        glType: gl.FRAGMENT_SHADER,
        name:   name,
        src:    src,
        defs:   lib.glut.parseUniforms(src),
    })
}
