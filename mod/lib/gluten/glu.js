let context = {
    ptr:         0,
    matrixStack: [],
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
        // We MUST declare functions here and not on /alt to have vector and matrix math available in scope
        extend($.alt.glu, this, p => !p.startsWith('_') && p !== 'name' && p !== 'init')
        this.__.detach(this)
    },

    withProgram: function(gluProg) {
        if (this.gluProg === gluProg) return

        // TODO detect and save the previous one

        gl.useProgram(gluProg.glRef)
        this.prog   = gluProg
        this.uloc   = gluProg.uloc
        this.aloc   = gluProg.aloc
        this.glProg = gluProg.glRef
    },

    uniform1i: function(uniLoc, iv) {
        if (isStr(uniLoc)) uniLoc = this.uloc[uniLoc]
        if (!uniLoc) return
        gl.uniform1i(uniLoc, iv)
    },

    uniform1f: function(uniLoc, fv) {
        if (isStr(uniLoc)) uniLoc = this.uloc[uniLoc]
        if (!uniLoc) return
        gl.uniform1f(uniLoc, iv)
    },

    uniform4fv: function(uniLoc, vdata) {
        if (isStr(uniLoc)) uniLoc = this.uloc[uniLoc]
        if (!uniLoc) return
        gl.uniform4fv(uniLoc, vdata)
    },

    uniformMatrix4fv: function(uniLoc, m4) {
        if (isStr(uniLoc)) uniLoc = this.uloc[uniLoc]
        if (!uniLoc) return
        gl.uniformMatrix4fv(uniLoc, false, m4)
    },

    applyModelMatrix: function() {
        if (!this.uloc.uModelMatrix) return
        gl.uniformMatrix4fv(this.uloc.uModelMatrix, false, this.modelMatrix)
    },

    applyNormalMatrix: function() {
        if (!this.uloc.uModelMatrix) return

        // calculate the normal matrix out of the model one (model => invert => transpose)
        mat4.copy(this.invMatrix, this.modelMatrix)
        mat4.invert(this.invMatrix)
        mat4.transpose(this.normalMatrix, this.invMatrix)
        gl.uniformMatrix4fv(this.uloc.uNormalMatrix, false, this.normalMatrix)
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

    save: function() {
        this.pushMatrix()
    },

    restore: function() {
        this.popMatrix()
    },

    getContext: function() {
        return context
    },
}

module.exports = __glu__
