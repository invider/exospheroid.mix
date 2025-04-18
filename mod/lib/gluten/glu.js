let context = {
    ptr:         0,
    matrixStack: [],

    modelMat4:    mat4.identity(),
    //worldMat4:    mat4.identity(),
    //normalMat4:   mat4.identity(),
}

function init() {
    extend($.alt.glu, this, p => !p.startsWith('_') && p !== 'name' && p !== 'init')
}

function pushMatrix() {
    if (!context.matrixStack[context.ptr]) this.matrixStack[this.ptr++] = mat4.clone(context.modelMat4)
    else mat4.copy(this.matrixStack[context.ptr++], context.modelMat4)
}

function popMatrix() {
    if (context.ptr === 0) throw new Error(`The GLU matrix stack is empty!`)
    mat4.copy(context.modelMat4, context.matrixStack[--context.ptr])
}

function setIdentity() {
    mat4.setIdentity(context.modelMat4)
}

function getContext() {
    return context
}
