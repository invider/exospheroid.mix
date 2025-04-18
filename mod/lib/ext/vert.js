function vert(src, name, path, base) {
    return new dna.gl.Shader({
        type: gl.VERTEX_SHADER,
        name: name,
        src:  src,
        defs: lib.glu.parseUniforms(src),
    })
}
