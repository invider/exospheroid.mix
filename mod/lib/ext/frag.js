function frag(src, name, path, base) {
    return new dna.gl.Shader({
        type: gl.FRAGMENT_SHADER,
        name: name,
        src:  src,
    })
}
