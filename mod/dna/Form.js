class Form extends sys.LabFrame {

    constructor(st) {
        super( extend({
            pos:   vec3z(),
            rot:   vec3z(),
            scale: vec3(1, 1, 1)
        }, st))
    }

    draw() {
        glu.pushMatrix()

        mat4
            .translate( mMatrix, this.pos)
            .rot(       mMatrix, this.rot)
            .scale(     mMatrix, this.scale)
        
        super.draw()

        glu.popMatrix()
    }
}
