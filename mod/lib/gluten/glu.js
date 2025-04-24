let context = {
    ptr:         0,
    matrixStack: [],

    //worldMat4:    mat4.identity(),
    //normalMat4:   mat4.identity(),
}

const __glu__ = {

    // state
    glProg:       null,
    gluProg:      null,
    modelMatrix:  mat4.identity(),
    invMatrix:    mat4.identity(),
    normalMatrix: mat4.identity(),

    init: function() {
        // migrate in the global scope and detach,
        // since we don't want to use it from here by mistake
        extend($.alt.glu, this, p => !p.startsWith('_') && p !== 'name' && p !== 'init')
        //this.__.detach(this)
    },

    withProgram: function(gluProg) {
        if (this.gluProg === gluProg) return

        gl.useProgram(gluProg.glRef)
        this.prog   = gluProg
        this.uloc   = gluProg.uloc
        this.aloc   = gluProg.aloc
        this.glProg = gluProg.glRef
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

module.exports = __glu__
