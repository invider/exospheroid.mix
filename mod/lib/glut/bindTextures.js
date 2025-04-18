function bindTextures(catalog) {
    if (!catalog || !catalog._ls) throw new Error(`Can't bind - a catalog Frame is expected!`)
    catalog._ls.forEach(texture => {
        const glRef = texture.glRef = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, glRef)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture)
        gl.generateMipmap(gl.TEXTURE_2D)
    })
    gl.bindTexture(gl.TEXTURE_2D, null)
}
