function scene() {
    lab.spawn(dna.geo.Image, {
        Z: 101,
        glProg: lib.gl.zprog.basic,

        fixTexture: function() {
            return res.texture.compass.glRef
        },
    })
}
scene.Z = 101
