// =====================
// 2x2 Matrix Operations
// =====================

const PRECISION = 0.000001

// create a new 2x2 identity matrix
//
// @returns {Float32Array} a new 2x2 identity matrix array
function create() {
    const res = new Float32Array(4)
    res[0] = 1
    res[3] = 1
    return res
}

// clone an existing 2x2 matrix
// 
// @param {array} src - a mat2 to copy
// @returns {Float32Array} - a new cloned 2x2 matrix
function clone(src) {
    const res = new Float32Array(4)
    res[0] = src[0]
    res[1] = src[1]
    res[2] = src[2]
    res[3] = src[3]
    return res
}

// copy a source 2x2 matrix to the target one
//
// @param {array} tar - a target 2x2 matrix array
// @param {array} src - a source 2x2 matrix array
// @returns {array} the target array
function copy(tar, src) {
    tar[0] = src[0]
    tar[1] = src[1]
    tar[2] = src[2]
    tar[3] = src[3]
    return tar
}

// set 2x2 identity matrix
// ```
// | 1 0 |
// | 0 1 |
// ```
// @param {array} tar - a target 2x2 matrix array to mutate
function identity(tar) {
    tar[0] = 1
    tar[1] = 0
    tar[2] = 0
    tar[3] = 1
    return tar
}

// form a 2x2 matrix array from provided 4 values
//
// @param {number} v00
// @param {number} v01
// @param {number} v10
// @param {number} v11
// @returns {Float32Array} newly formed matrix array
function form(v00, v01, v10, v11) {
    const res = new Float32Array(4)
    res[0] = v00
    res[1] = v01
    res[2] = v10
    res[3] = v11
    return res
}

// set values for 2x2 matrix
//
// @param {array} tar - a target 2x2 mutable matrix array
// @param {number} v00
// @param {number} v01
// @param {number} v10
// @param {number} v11
// @returns {array} 
function set(tar, v00, v01, v10, v11) {
    tar[0] = v00
    tar[1] = v01
    tar[2] = v10
    tar[3] = v11
    return tar
}

function similar(src, tar) {
}

// calculate determinant for the source 2x2 matrix array
//
// @param {array} src
// @returns {number} determinant for the source matrix
function det(src) {
    return (src[0] * src[3] - src[2] * src[1])
}

// invert the source 2x2 matrix to the target 2x2 matrix
//
// @param {array} tar - an mutable target 2x2 matrix array
// @param {array} src - an immutable source 2x2 matrix array
// @returns {array} inverted 2x2 matrix in the target array
function invert(tar, src) {
    const v00 = src[0], v01 = src[1], v10 = src[2], v11 = src[3]
    const detf = v00 * v11 - v10 * v01
    if (!detf) return null
    const det = 1.0 / detf

    tar[0] =  v11 * det
    tar[1] = -v01 * det
    tar[2] = -v10 * det
    tar[3] =  v00 * det
    return tar
}

// multiply 2x2 matrices into the target matrix array
// @param {array} tar - the mutable target 2x2 matrix array
// @param {array} m - the immutable multiplier 2x2 matrix array
// @param {array} n - the immutable multiplicand 2x2 matrix array
// @returns {array} inverted 2x2 matrix in the target array
function multiply(tar, m, n) {
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const n00 = n[0], n01 = n[1], n10 = n[2], n11 = n[3]
    tar[0] = m00 * n00 + m10 * n01
    tar[1] = m01 * n00 + m11 * n01
    tar[2] = m00 * n10 + m10 * n11
    tar[3] = m01 * n10 + m11 * n11
    return tar
}
const mul = multiply

// rotate a given 2x2 matrix array by the given angle
//
// @param {array} tar - the mutable target 2x2 matrix array
// @param {array} m - the immutable source 2x2 matrix array
// @param {number/radians} rad - the rotation angle in radians
// @returns {array} the rotated 2x2 matrix array
function rot(tar, m, rad) {
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const s = sin(rad)
    const c = cos(rad)

    tar[0] = m00 *  c + m10 * s;
    tar[1] = m01 *  c + m11 * s;
    tar[2] = m00 * -s + m10 * c;
    tar[3] = m01 * -s + m11 * c;
    return tar
}
this.rotate = rot

// Set a rotated identity matrix for the provided angle
//
// @param {array/mat2} tar - the mutable target 2x2 matrix array
// @param {number/radians} rad - the rotation angle in radians
// @returns {array/mat2} the rotated 2x2 identity matrix array
function rotateIdentity(tar, rad) {
    const s = sin(rad)
    const c = cos(rad)

    tar[0] =  c
    tar[1] =  s
    tar[2] = -s
    tar[3] =  c
    return tar
}

// scale a given 2x2 matrix by dimentions provided in vec2 array
// 
// @param {array/mat2} tar - a target 2x2 matrix array
// @param {array/mat2} m - a source 2x2 matrix array
// @param {array/vec2} vec2 - a source 2d vector array
// @returns {array/mat2} the scaled 2x2 identity matrix array
function scaleMatrix(tar, m, vec2) {
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const v0 = vec2[0], v1 = vec2[1]
    tar[0] = m00 * v0
    tar[1] = m01 * v0
    tar[2] = m10 * v1
    tar[3] = m11 * v1
    return tar
}
this.scale = scaleMatrix

// scale 2x2 identity matrix by dimentions provided in vec2 array
//
// @param {array/vec} - scale 2d vector array
// @returns {array/mat2} the scaled 2x2 identity matrix array
function scaleIdentity(tar, v) {
    tar[0] = v[0]
    tar[1] = 0
    tar[2] = 0
    tar[3] = v[1]
    return tar
}

// add two 2x2 matrices into the target 2x2 matrix array
//
// @param {array/mat2} tar - a mutable target 2x2 matrix array
// @param {array} m - an immutable term 2x2 matrix array
// @param {array} n - an immutable term 2x2 matrix array
// @returns {array/mat2} added 2x2 matrix in the target matrix array
function add(tar, m, n) {
    tar[0] = m[0] + n[0]
    tar[1] = m[1] + n[1]
    tar[2] = m[2] + n[2]
    tar[3] = m[3] + n[3]
    return tar
}

// subtract 2x2 matrix n from 2x2 matrix m into the target 2x2 matrix array
//
// @param {array/mat2} tar - a mutable target 2x2 matrix array
// @param {array} m - an immutable term 2x2 matrix array
// @param {array} n - an immutable term 2x2 matrix array
// @returns {array/mat2} added 2x2 matrix in the target matrix array
function subtract(tar, m, n) {
    tar[0] = m[0] - n[0]
    tar[1] = m[1] - n[1]
    tar[2] = m[2] - n[2]
    tar[3] = m[3] - n[3]
    return tar
}
const sub = subtract

// multiply each 2x2 matrix element by a scalar
//
// @param {array} m - an immutable source 2x2 matrix array
// @param {number} v - scalar value
// @returns {array/mat2} multiplicated 2x2 matrix in the target matrix array
function multiplyScalar(tar, m, v) {
    tar[0] = m[0] * v
    tar[1] = m[1] * v
    tar[2] = m[2] * v
    return tar
}
const mulScalar = multiplyScalar

function equals(src, tar) {
    return (
        src[0] === tar[0]
        && src[1] === tar[1]
        && src[2] === tar[2]
        && src[3] === tar[3]
    )
}

function similar(m, n, precision) {
    const P = precision || PRECISION
    const m00 = m[0], m01 = m[1], m10 = m[2], m11 = m[3]
    const n00 = n[0], n01 = n[1], n10 = n[2], n11 = n[3]

    return (
           abs(m00 - n00) <= P * max(1.0, abs(m00), abs(n00))
        && abs(m01 - n01) <= P * max(1.0, abs(m01), abs(n01))
        && abs(m10 - n10) <= P * max(1.0, abs(m10), abs(n10))
        && abs(m11 - n11) <= P * max(1.0, abs(m11), abs(n11))
    )
}

function toString(src) {
    return `mat2[${src[0]}, ${src[1]}, ${src[2]}, ${src[3]}]`
}

