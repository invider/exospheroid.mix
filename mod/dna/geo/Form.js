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

        super.draw()

        glu.popMatrix()
    }
}
