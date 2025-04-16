function textures() {
    res.texture._ls.forEach(texture => {
        texture.tid = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture.tid)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.bindTexture(gl.TEXTURE_2D, null)
    })
}
