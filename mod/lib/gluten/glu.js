let context = {
    ptr:         0,
    matrixStack: [],

    //worldMat4:    mat4.identity(),
    //normalMat4:   mat4.identity(),
}

module.exports = {

    modelMatrix:  mat4.identity(),
    invMatrix:    mat4.identity(),
    normalMatrix: mat4.identity(),

    init: function() {
        extend($.alt.glu, this, p => !p.startsWith('_') && p !== 'name' && p !== 'init')
    },

    pushMatrix: function() {
        if (!context.matrixStack[context.ptr]) context.matrixStack[context.ptr++] = mat4.clone(this.modelMatrix)
        else mat4.copy(context.matrixStack[context.ptr++], this.modelMatrix)
    },

    popMatrix: function () {
        if (context.ptr === 0) throw new Error(`The GLU matrix stack is empty!`)
        mat4.copy(this.modelMatrix, context.matrixStack[--context.ptr])
    },

    setIdentity: function () {
        mat4.setIdentity(this.modelMatrix)
    },

    translate: function (pos) {
        mat4.translate( this.modelMatrix, pos )
        return this
    },

    rot: function(rv) {
        mat4.rot( this.modelMatrix, rv )
        return this
    },

    scale: function(sv) {
        mat4.scale( this.modelMatrix, sv )
        return this
    },

    getContext: function() {
        return context
    },
}
