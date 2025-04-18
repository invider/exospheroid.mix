function scene() {
    lab.port.spawn( dna.Camera, {
        Z:     13,
        name: 'cam',
    })
    lab.port.bindCamera(lab.port.cam)

    /*
    lab.spawn(dna.geo.Image, {
        Z: 101,
        glProg: lib.gl.zprog.basic,

        fixTexture: function() {
            return res.texture.compass.glRef
        },
    })
    */
}
scene.Z = 101
