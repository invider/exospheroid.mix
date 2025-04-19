function scene() {
    const cam = lab.port.spawn( dna.Camera, {
        Z:     13,
        name: 'cam',
    })
    lab.port.bindCamera(cam)

    lab.port.attach( new dna.Form({
        name: 'cuboid',
        pos: vec3(0, 0, 0),
        rot: vec3(0, 0, 0),
        rotSpeed: vec3(0, 0, 0),
        scale: vec3(1, 1, 1),

        _pods: [
            new dna.Surface({
                name: 'cube',
                geo: lib.geo.glib.cube,
                m: {
                    a: vec4(.5, .6, .7, 0),
                    d: vec4(.1, .8, .9, 0),
                    s: vec4(1, 1, 1, 0),
                    i: vec4(.2, .5, .8, 0),
                    n: 50,
                },
            }),
        ],

        init() {
            this.rotSpeed[0] = .5
            this.rotSpeed[1] = .3
        },

        evo: function(dt) {
            this.rot[0] += this.rotSpeed[0] * dt
            this.rot[1] += this.rotSpeed[1] * dt
            this.rot[2] += this.rotSpeed[2] * dt
        },
    }))

    // move camera back a little
    pin.cam.pos[1] = 1
    pin.cam.pos[2] = 8

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
