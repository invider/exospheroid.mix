const EntityFrame = require('dna/EntityFrame')

class Form extends EntityFrame {

    constructor(st) {
        super( extend({
            pos:   vec3.izero(),
            rot:   vec3.izero(),
            scale: vec3(1, 1, 1),
        }, st))
        
    }

    draw() {
        glu.pushMatrix()
        glu.translate(this.pos).rot(this.rot).scale(this.scale)

        // since we modified the world position, we MUST update the model matrix uniform
        // TODO set through glu
        //gl.uniformMatrix4fv(glu.uloc.uModelMatrix, false, glu.modelMatrix)
        glu.applyModelMatrix()
        super.draw()

        glu.popMatrix()
        glu.applyModelMatrix()
    }
}
