function newMat4() {
    return new Float32Array(16)
}

// turn a zero 4D matrix into an identity one
// @param {array/mat4} - a zero 4D matrix to set identity to
function setMat4Identity(m) {
    m[0]  = 1
    m[5]  = 1
    m[10] = 1
    m[15] = 1
    return m
}


function identity() {
    const m = newMat4()
    setMat4Identity(m)
    return m
}

function clone(im) {
    const nm = newMat4()
    for (let i = 0; i < 16; i++) nm[i] = im[i]
    return nm
}

function copy(rv, im) {
    for (let i = 0; i < 16; i++) rm[i] = im[i]
}

function from4V3(v1, v2, v3, v4) {
    const m = newMat4()
    m[0] = v1[0]
    m[1] = v1[1]
    m[2] = v1[2]
    m[4] = v2[0]
    m[5] = v2[1]
    m[6] = v2[2]
    m[8] = v3[0]
    m[9] = v3[1]
    m[10] = v3[2]
    m[12] = v4[0]
    m[13] = v4[1]
    m[14] = v4[2]
    m[15] = 1
    return m
}

// generates a perspective projection 4x4 matrix
//
// @param {number/degrees} fovy - the vertical field of view
// @param {number} aspectRate - the viewport width-to-height aspect ratio
// @param {number} zNear - the z coordinate of the near clipping plane
// @param {number} zFar - the z coordinate of the far clipping plane
function projection(fovy, aspectRate, zNear, zFar) {
    const m = newMat4()
    const tan = Math.tan(fovy * DEG_TO_RAD * .5)
    m[0]  = .5/tan
    m[5]  = .5 * aspectRate/tan
    m[10] = -(zFar + zNear) / (zFar - zNear)
    m[11] = (-2 * zFar * zNear)/(zFar - zNear)
    m[14] = -1

    return m
}

// generates camera look at matrix
//
// @param {array/vec3} car - the camera coordinates 3D vector
// @param {array/vec3} tar - the target coordinates 3D vector
// @param {array/vec3} up - the up camera orientation 3D vector (tilt)
// @return {array/mat4} the look-at 4x4 matrix
function lookAt(cam, tar, up) {
    const zAxis = vec3.n( vec3.isub(cam, tar) )
    const xAxis = vec3.n( vec3.icross(up, zAxis) )
    const yAxis = vec3.n( vec3.icross(zAxis, xAxis) )

    return this.from4V3(xAxis, yAxis, zAxis, cam)
}

// TODO combine rot matrices into a single 3-axis rotation

// rotate a matrix around the x-axis
//
// @param {array/mat4} m - the 4x4 matrix to rotate
// @param {number} theta - the rotation angle in radians
// @return {object/lib} the mat4 library object
function rotX(m, theta) {
    txm4[0 ] =  cos(theta)
    txm4[2 ] = -sin(theta)
    txm4[8 ] =  sin(theta)
    txm4[10] =  cos(theta)
    this.mul(m, txm4)
    return this
}

// rotate a matrix around the y-axis
//
// @param {array/mat4} m - the 4x4 matrix to rotate
// @param {number} theta - the rotation angle in radians
// @return {object/lib} the mat4 library object
function rotY(m, theta) {
    tym4[5 ] =  cos(theta)
    tym4[6 ] =  sin(theta)
    tym4[9 ] = -sin(theta)
    tym4[10] =  cos(theta)
    this.mul(m, tym4)
    return this
}

// rotate a matrix around the z-axis
//
// @param {array/mat4} m - the 4x4 matrix to rotate
// @param {number} theta - the rotation angle in radians
// @return {object/lib} the mat4 library object
function rotZ(m, theta) {
    tzm4[0] =  cos(theta)
    tzm4[1] =  sin(theta)
    tzm4[4] = -sin(theta)
    tzm4[5] =  cos(theta)
    this.mul(m, tzm4)
    return this
}

function rot(m, v) {
    const 
        cx = cos(v[0]), sx = sin(v[0]),
        cy = cos(v[1]), sy = sin(v[1]),
        cz = cos(v[2]), sz = sin(v[2])
    trm4[0] = cy * cz
    trm4[1] = sx * sy * cz + cx * sz
    trm4[2] = -cx * sy * cz + sx * sz

    trm4[4] = -cy * sz
    trm4[5] = -sx * sy * sz + cx * cz
    trm4[6] = cx * sy * sz + sx * cz

    trm4[8] =  sy
    trm4[9] =  -sx * cy
    trm4[10] =  cx * cy

    this.mul(m, trm4)
    return this
}

// translate a 4x4 matrix to the specified coordinates
//
// @param {array/mat4} m - the 4x4 matrix to translate
// @param {number} x
// @param {number} y
// @param {number} z
// @return {object/lib} the mat4 library object
function __translate__(m, v) {
    ttm4[12] = v[0]
    ttm4[13] = v[1]
    ttm4[14] = v[2]
    this.mul(m, ttm4)
    return this
}

// scale a 4x4 matrix by the specified values across each axis
//
// @param {array/mat4} m - the 4x4 matrix to scale
// @param {number} x - the scale factor along the x-axis
// @param {number} y - the scale factor along the y-axis
// @param {number} z - the scale factor along the z-axis
// @return {object/lib} the mat4 library object
function __scale__(m, v) {
    tsm4[0 ] = v[0]
    tsm4[5 ] = v[1]
    tsm4[10] = v[2]
    this.mul(m, tsm4)
    return this
}

// multiply 2 4D matrices
// @param {array/mat4} a - the first operand the result receiver
// @param {array/mat4} b - the second operand (immutable)
// @return {object/lib} the mat4 library object
function mul(a, b) {
    const a1x = a[0],  a1y = a[1],  a1z = a[2],  a1w = a[3],
          a2x = a[4],  a2y = a[5],  a2z = a[6],  a2w = a[7],
          a3x = a[8],  a3y = a[9],  a3z = a[10], a3w = a[11],
          a4x = a[12], a4y = a[13], a4z = a[14], a4w = a[15]

    for (let i = 0; i < 4; i++) {
        const n = i * 4
        const bx = b[n], by = b[n+1], bz = b[n+2], bw = b[n+3]
        a[n  ] = bx * a1x + by * a2x + bz * a3x + bw * a4x
        a[n+1] = bx * a1y + by * a2y + bz * a3y + bw * a4y
        a[n+2] = bx * a1z + by * a2z + bz * a3z + bw * a4z
        a[n+3] = bx * a1w + by * a2w + bz * a3w + bw * a4w
    }

    return mat4
}

// invert a 4x4 matrix
// @param {array/mat4} t - the source and receiving 4D matrix 
function invert(t) {
    const m = this.clone(t)
    const
        A2323 = m[2*4 + 2] * m[3*4 + 3] - m[2*4 + 3] * m[3*4 + 2],
        A1323 = m[2*4 + 1] * m[3*4 + 3] - m[2*4 + 3] * m[3*4 + 1],
        A1223 = m[2*4 + 1] * m[3*4 + 2] - m[2*4 + 2] * m[3*4 + 1],
        A0323 = m[2*4 + 0] * m[3*4 + 3] - m[2*4 + 3] * m[3*4 + 0],
        A0223 = m[2*4 + 0] * m[3*4 + 2] - m[2*4 + 2] * m[3*4 + 0],
        A0123 = m[2*4 + 0] * m[3*4 + 1] - m[2*4 + 1] * m[3*4 + 0],
        A2313 = m[1*4 + 2] * m[3*4 + 3] - m[1*4 + 3] * m[3*4 + 2],
        A1313 = m[1*4 + 1] * m[3*4 + 3] - m[1*4 + 3] * m[3*4 + 1],
        A1213 = m[1*4 + 1] * m[3*4 + 2] - m[1*4 + 2] * m[3*4 + 1],
        A2312 = m[1*4 + 2] * m[2*4 + 3] - m[1*4 + 3] * m[2*4 + 2],
        A1312 = m[1*4 + 1] * m[2*4 + 3] - m[1*4 + 3] * m[2*4 + 1],
        A1212 = m[1*4 + 1] * m[2*4 + 2] - m[1*4 + 2] * m[2*4 + 1],
        A0313 = m[1*4 + 0] * m[3*4 + 3] - m[1*4 + 3] * m[3*4 + 0],
        A0213 = m[1*4 + 0] * m[3*4 + 2] - m[1*4 + 2] * m[3*4 + 0],
        A0312 = m[1*4 + 0] * m[2*4 + 3] - m[1*4 + 3] * m[2*4 + 0],
        A0212 = m[1*4 + 0] * m[2*4 + 2] - m[1*4 + 2] * m[2*4 + 0],
        A0113 = m[1*4 + 0] * m[3*4 + 1] - m[1*4 + 1] * m[3*4 + 0],
        A0112 = m[1*4 + 0] * m[2*4 + 1] - m[1*4 + 1] * m[2*4 + 0]

    const idet = 1 / (
          m[0*4 + 0] * ( m[1*4 + 1] * A2323 - m[1*4 + 2] * A1323 + m[1*4 + 3] * A1223 )
        - m[0*4 + 1] * ( m[1*4 + 0] * A2323 - m[1*4 + 2] * A0323 + m[1*4 + 3] * A0223 )
        + m[0*4 + 2] * ( m[1*4 + 0] * A1323 - m[1*4 + 1] * A0323 + m[1*4 + 3] * A0123 )
        - m[0*4 + 3] * ( m[1*4 + 0] * A1223 - m[1*4 + 1] * A0223 + m[1*4 + 2] * A0123 )
    )

    t[0*4 + 0] = idet *   ( m[1*4 + 1] * A2323 - m[1*4 + 2] * A1323 + m[1*4 + 3] * A1223 )
    t[0*4 + 1] = idet * - ( m[0*4 + 1] * A2323 - m[0*4 + 2] * A1323 + m[0*4 + 3] * A1223 )
    t[0*4 + 2] = idet *   ( m[0*4 + 1] * A2313 - m[0*4 + 2] * A1313 + m[0*4 + 3] * A1213 )
    t[0*4 + 3] = idet * - ( m[0*4 + 1] * A2312 - m[0*4 + 2] * A1312 + m[0*4 + 3] * A1212 )
    t[1*4 + 0] = idet * - ( m[1*4 + 0] * A2323 - m[1*4 + 2] * A0323 + m[1*4 + 3] * A0223 )
    t[1*4 + 1] = idet *   ( m[0*4 + 0] * A2323 - m[0*4 + 2] * A0323 + m[0*4 + 3] * A0223 )
    t[1*4 + 2] = idet * - ( m[0*4 + 0] * A2313 - m[0*4 + 2] * A0313 + m[0*4 + 3] * A0213 )
    t[1*4 + 3] = idet *   ( m[0*4 + 0] * A2312 - m[0*4 + 2] * A0312 + m[0*4 + 3] * A0212 )
    t[2*4 + 0] = idet *   ( m[1*4 + 0] * A1323 - m[1*4 + 1] * A0323 + m[1*4 + 3] * A0123 )
    t[2*4 + 1] = idet * - ( m[0*4 + 0] * A1323 - m[0*4 + 1] * A0323 + m[0*4 + 3] * A0123 )
    t[2*4 + 2] = idet *   ( m[0*4 + 0] * A1313 - m[0*4 + 1] * A0313 + m[0*4 + 3] * A0113 )
    t[2*4 + 3] = idet * - ( m[0*4 + 0] * A1312 - m[0*4 + 1] * A0312 + m[0*4 + 3] * A0112 )
    t[3*4 + 0] = idet * - ( m[1*4 + 0] * A1223 - m[1*4 + 1] * A0223 + m[1*4 + 2] * A0123 )
    t[3*4 + 1] = idet *   ( m[0*4 + 0] * A1223 - m[0*4 + 1] * A0223 + m[0*4 + 2] * A0123 )
    t[3*4 + 2] = idet * - ( m[0*4 + 0] * A1213 - m[0*4 + 1] * A0213 + m[0*4 + 2] * A0113 )
    t[3*4 + 3] = idet *   ( m[0*4 + 0] * A1212 - m[0*4 + 1] * A0212 + m[0*4 + 2] * A0112 )
}

function transpose(t, m) {
    for (let v = 0; v < 4; v++) {
        for (let c = 0; c < 4; c++) {
            t[v*4 + c] = m[c*4 + v]
        }
    }
}

function extractV3(m, i) {
    i *= 4
    return vec3(
        m[i],
        m[i+1],
        m[i+2],
    )
}

function equals(m1, m2) {
    for (let i = 0; i < 16; i++) {
        if (abs(m1[i] - m2[i]) > EPSILON) return false
    }
    return true
}


function mat4(im) {
    if (im) return clone(im)
    return newMat4()
}

extend(mat4, {
    create: newMat4,
    identity,
    clone,
    copy,
    from4V3,

    translate: __translate__,
    scale: __scale__,
    mul,
    rotX,
    rotY,
    rotZ,
    rot,

    invert,
    transpose,
    projection,
    lookAt,

    equals,
})
