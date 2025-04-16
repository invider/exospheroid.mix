// model matrix stack
let _mPtr = 0
const _mStack = []
let mMatrix = mat4.identity(),
    wMatrix = mat4.identity(),
    nMatrix = mat4.identity(),
    iMatrix = mat4.identity()

const zap = {
    tex: {},

    mpush: () => {
        if (!_mStack[_mPtr]) _mStack[_mPtr++] = mat4.clone(mMatrix)
        else mat4.copy(_mStack[_mPtr++], mMatrix)
    },

    mpop: () => {
        mat4.copy(mMatrix, _mStack[--_mPtr])
    },
}
