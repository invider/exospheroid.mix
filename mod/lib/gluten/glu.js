let context = {
    env:         {},
    progStack:   [],

    ptr:         0,
    matrixStack: [],
}

const __glu__ = {

    // state
    prog:      null,
    glProg:       null,

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

    pushProgram: function() {
        context.progStack.push(context.env)
    },

    popProgram: function() {
        if (context.progStack.length === 0) throw new Error(`Can't pop() - GLU Program stack is empty!`)
        context.env = context.progStack.pop()

        const gluProg = context.env.prog
        gl.useProgram(gluProg.glRef)
        this.prog      = gluProg
        this.uniform   = gluProg.uniform
        this.attribute = gluProg.attribute
        this.glProg    = gluProg.glRef
    },

    withUniforms: function(uniforms) {
        if (!uniforms || uniforms.length === 0) return

        uniforms.forEach(uniformAssignment => {
            // find gl location for the new program
            // TODO also match by the uniform type!!!
            const newUniform = this.uniform[uniformAssignment.uniform.name]

            switch(uniformAssignment.type) {
                case 'uniformMatrix4fv':
                    if (newUniform) {
                        this.uniformMatrix4fv(newUniform, uniformAssignment.data)
                    }
                    break
            }
        })
    },

    withProgram: function(gluProg) {
        //log('with program: ' + gluProg.name)

        if (this.prog === gluProg) {
            this.pushProgram()
            return
        }

        if (this.prog) {
            this.pushProgram()
        }

        gl.useProgram(gluProg.glRef)
        this.prog      = gluProg
        this.uniform   = gluProg.uniform
        this.attribute = gluProg.attribute
        this.glProg    = gluProg.glRef

        // create new program environment and inherit uniforms
        const parentUniforms = context.env.uniforms
        context.env = {
            prog: gluProg,
            uniforms: [],
        }
        this.withUniforms(parentUniforms)
    },

    prevProgram: function() {
        this.popProgram()
        this.withUniforms(context.env.uniforms)
    },

    uniform1i: function(uniform, iv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            return
        }
        gl.uniform1i(uniform.glLoc, iv)

        context.env.uniforms.push({
            type:    'uniform1i',
            uniform:  uniform,
            data:     iv,
        })
    },

    uniform1f: function(uniform, fv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) return
        gl.uniform1f(uniform.glLoc, fv)

        context.env.uniforms.push({
            type:    'uniform1f',
            uniform:  uniform,
            data:     fv,
        })
    },

    uniform3fv: function(uniform, vdata) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) return
        gl.uniform3fv(uniform.glLoc, vdata)

        context.env.uniforms.push({
            type:   'uniform3fv',
            uniform: uniform,
            data:    vdata,
        })
    },

    uniform4fv: function(uniform, vdata) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) return false
        gl.uniform4fv(uniform.glLoc, vdata)

        context.env.uniforms.push({
            type:    'uniform4fv',
            uniform:  uniform,
            data:     vdata,
        })
        return true
    },

    uniformMatrix4fv: function(uniform, m4) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) return
        gl.uniformMatrix4fv(uniform.glLoc, false, m4)

        context.env.uniforms.push({
            type:   'uniformMatrix4fv',
            uniform: uniform,
            data:    m4,
        })
    },

    applyModelMatrix: function() {
        if (!this.uniform.uModelMatrix) return
        gl.uniformMatrix4fv(this.uniform.uModelMatrix.glLoc, false, this.modelMatrix)

        context.env.uniforms.push({
            type:    'uniformMatrix4fv',
            uniform:  this.uniform.uModelMatrix,
            data:     mat4.clone(this.modelMatrix),
        })
    },

    applyNormalMatrix: function() {
        if (!this.uniform.uNormalMatrix) return

        // calculate the normal matrix out of the model one (model => invert => transpose)
        mat4.copy(this.invMatrix, this.modelMatrix)
        mat4.invert(this.invMatrix)
        mat4.transpose(this.normalMatrix, this.invMatrix)
        gl.uniformMatrix4fv(this.uniform.uNormalMatrix.glLoc, false, this.normalMatrix)

        context.env.uniforms.push({
            type:    'uniformMatrix4fv',
            uniform:  this.uniform.uNormalMatrix,
            data:     mat4.clone(this.normalMatrix),
        })
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
