
const
    UNIFORM_1I         = 1,
    UNIFORM_1IV        = 2,
    UNIFORM_1F         = 3,
    UNIFORM_1FV        = 4,

    UNIFORM_2I         = 5,
    UNIFORM_2IV        = 6,
    UNIFORM_2F         = 7,
    UNIFORM_2FV        = 8,

    UNIFORM_3I         = 9,
    UNIFORM_3IV        = 10,
    UNIFORM_3F         = 11,
    UNIFORM_3FV        = 12,

    UNIFORM_4I         = 13,
    UNIFORM_4IV        = 14,
    UNIFORM_4F         = 15,
    UNIFORM_4FV        = 16,

    UNIFORM_MATRIX_3FV = 21,
    UNIFORM_MATRIX_4FV = 22

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

        uniforms.forEach(ua => {
            // find gl location for the new program
            // TODO also match by the uniform type!!!
            const newUniform = this.uniform[ua.uniform.name]
            if (newUniform) {
                switch(ua.method) {
                    case UNIFORM_1I:  this.uniform1i(newUniform, ua.v0); break;
                    case UNIFORM_1IV: this.uniform1iv(newUniform, ua.iv); break;
                    case UNIFORM_1F: this.uniform1f(newUniform, ua.f0); break;

                    case UNIFORM_3FV: this.uniform3fv(newUniform, ua.fv); break;
                    case UNIFORM_4FV: this.uniform4fv(newUniform, ua.fv); break;

                    case UNIFORM_MATRIX_3FV: this.uniformMatrix3fv(newUniform, ua.fv); break;
                    case UNIFORM_MATRIX_4FV: this.uniformMatrix4fv(newUniform, ua.fv); break;
                }
            }
        })
    },

    withProgram: function(gluProg, rejectUniforms) {
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

        // create new program environment and inherit uniforms if not rejected
        const parentUniforms = context.env.uniforms
        context.env = {
            prog: gluProg,
            uniforms: [],
        }
        if (!rejectUniforms) this.withUniforms(parentUniforms)
    },

    prevProgram: function() {
        this.popProgram()
        this.withUniforms(context.env.uniforms)
    },

    uniform1i: function(uniform, v0) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) throw new Error(`Missing a uniform!`)
            return
        }
        gl.uniform1i(uniform.glLoc, v0)

        context.env.uniforms.push({
            method:   UNIFORM_1I,
            uniform:  uniform,
            v0:       v0,
        })
    },

    uniform1iv: function(uniform, iv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) throw new Error(`Missing a uniform!`)
            return
        }
        gl.uniform1iv(uniform.glLoc, iv)

        context.env.uniforms.push({
            method:   UNIFORM_1IV,
            uniform:  uniform,
            iv:       iv,
        })
    },

    uniform1f: function(uniform, f0) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) throw new Error(`Missing a uniform!`)
            return
        }
        gl.uniform1f(uniform.glLoc, f0)

        context.env.uniforms.push({
            method:   UNIFORM_1F,
            uniform:  uniform,
            f0:       f0,
        })
    },

    uniform1fv: function(uniform, fv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) throw new Error(`Missing a uniform!`)
            return
        }
        gl.uniform1fv(uniform.glLoc, fv)

        context.env.uniforms.push({
            method:   UNIFORM_1FV,
            uniform:  uniform,
            fv:       fv,
        })
    },

    uniform3fv: function(uniform, fv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) throw new Error(`Missing a uniform!`)
            return
        }
        gl.uniform3fv(uniform.glLoc, fv)

        context.env.uniforms.push({
            method:  UNIFORM_3FV,
            uniform: uniform,
            fv:      fv,
        })
    },

    uniform4fv: function(uniform, fv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) throw new Error(`Missing a uniform!`)
            return
        }
        gl.uniform4fv(uniform.glLoc, fv)

        context.env.uniforms.push({
            method:   UNIFORM_4FV,
            uniform:  uniform,
            fv:       fv,
        })
    },

    uniformMatrix4fv: function(uniform, fv) {
        if (isStr(uniform)) uniform = this.uniform[uniform]
        if (!uniform) {
            if (env.config.failOnMissingUniform) new Error(`Missing a uniform!`)
            return
        }
        gl.uniformMatrix4fv(uniform.glLoc, false, fv)

        context.env.uniforms.push({
            method:  UNIFORM_MATRIX_4FV, //uniformMatrix4fv',
            uniform: uniform,
            fv:    fv,
        })
    },

    applyModelMatrix: function() {
        if (!this.uniform.uModelMatrix) return
        gl.uniformMatrix4fv(this.uniform.uModelMatrix.glLoc, false, this.modelMatrix)

        context.env.uniforms.push({
            //type:    'uniformMatrix4fv',
            method:   UNIFORM_MATRIX_4FV,
            uniform:  this.uniform.uModelMatrix,
            fv:        mat4.clone(this.modelMatrix),
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
            method:   UNIFORM_MATRIX_4FV,
            uniform:  this.uniform.uNormalMatrix,
            fv:       mat4.clone(this.normalMatrix),
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
