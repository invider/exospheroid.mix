// ===========================
// 3D Vector Operations
// ===========================

// create a new vec3 initialized by provided x,y,z values
//
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {Float32Array} a new vec3 array
function create(x, y, z) {
    const nv = new Float32Array(3)
    nv[0] = x
    nv[1] = y
    nv[2] = z
    return nv
}

// set values of a vec3 array components to zero
// @param {array/vec3} rv - the receiving vec3 array
// @returns {obj/lib/vec3} vec3 library object for chaining
function zero(rv) {
    rv[0] = 0
    rv[1] = 0
    rv[2] = 0
    return this
}

// create and return new zero-valued vec3 array
//
// @returns {Float32Array} a new vec3 array with 0 values
function izero() {
    return new Float32Array(3)
}

// set a unit vector for the specified angles
//
// @param {array/vec3} rv - the receiving vec3 array
// @param {number/angle} theta - polar axis (to zenith) angle in radians
// @param {number/angle} phi - azimuth angle in radians
// @returns {obj/lib/vec3} vec3 library object for chaining
function unit(rv, theta, phi) {
    rv[0] = sin(theta) * cos(phi)
    rv[1] = sin(theta) * sin(phi)
    rv[2] = cos(theta)
    return this
}

// create a unit vector from the specified angles
//
// @param {number/angle} theta - polar axis (to zenith) angle in radians
// @param {number/angle} phi - azimuth angle in radians
// @returns {Float32Array} a new 3D unit vector
function iunit(theta, phi) {
    const nv = new Float32Array(3)
    nv[0] = sin(theta) * cos(phi)
    nv[1] = sin(theta) * sin(phi)
    nv[2] = cos(theta)
    return nv
}

// clone a source vec3 array to a new one
//
// @param {array/vec3} iv - a source vec3 array
// @returns {array/vec3} a newly created 3D vector array
function clone(iv) {
    const nv = new Float32Array(3)
    nv[0] = iv[0]
    nv[1] = iv[1]
    nv[2] = iv[2]
    return nv
}

// copy a source vec3 array to the target one
//
// @param {array/vec3} rv - the receiving vec3 array
// @param {array/vec3} vsrc - the source vec3 array
// @returns {obj/lib/vec3} vec3 library object for chaining
function copy(rv, vsrc) {
    rv[0] = vsrc[0]
    rv[1] = vsrc[1]
    rv[2] = vsrc[2]
    return this
}

// set the components of a vec3 array
//
// @param {array/vec3} rv - the receiving vec3 array
// @param {number} x - 3D vector x component
// @param {number} y - 3D vector y component
// @param {number} z - 3D vector z component
// @returns {obj/lib/vec3} vec3 library object for chaining
function set(rv, x, y, z) {
    rv[0] = x
    rv[1] = y
    rv[2] = z
    return this
}

function fromArray(buf, i) {
    return create(
        buf[i],
        buf[i+1],
        buf[i+2],
    )
}

// add two vec3 arrays
//
// @param {array/vec3} rv - the receiving vec3 array
// @param {array/vec3} iv1 - the first 3D vector (immutable)
// @param {array/vec3} iv2 - the second 3D vector (immutable)
// @returns {obj/lib/vec3} vec3 library object for chaining
function add(rv, iv1, iv2) {
    rv[0] = iv1[0] + iv2[0]
    rv[1] = iv1[1] + iv2[1]
    rv[2] = iv1[2] + iv2[2]
    return this
}

// add two vec3 into a newly created vec3 array
//
// @param {array/vec3} iv1 - the first 3D vector
// @param {array/vec3} iv2 - the second 3D vector
// @returns {array/vec3} the created output 3D vector
function iadd(iv1, iv2) {
    const nv = new Float32Array(3)
    nv[0] = iv1[0] + iv2[0]
    nv[1] = iv1[1] + iv2[1]
    nv[2] = iv1[2] + iv2[2]
    return nv
}

// add vec3 array and x/y/z components of a 3D vector
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv - the source 3D vector
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {obj/lib/vec3} vec3 library object for chaining
function cadd(rv, iv, x, y, z) {
    rv[0] = iv[0] + x
    rv[1] = iv[1] + y
    rv[2] = iv[2] + z
    return this
}

// subtract 3D vector iv2 from 3D vector iv1
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv1 - the first 3D vector operand
// @param {array/vec3} iv2 - the second 3D vector operand
// @returns {obj/lib/vec3} vec3 library object for chaining
function sub(rv, iv1, iv2) {
    rv[0] = iv1[0] - iv2[0]
    rv[1] = iv1[1] - iv2[1]
    rv[2] = iv1[2] - iv2[2]
    return this
}

// subtract the second 3D vector from the first into the newly created vector array
//
// @param {array/vec3} iv1 - the first 3D vector
// @param {array/vec3} iv2 - the second 3D vector
// @returns {array/vec3} the created output 3D vector
function isub(iv1, iv2) {
    const nv = new Float32Array(3)
    nv[0] = iv1[0] - iv2[0]
    nv[1] = iv1[1] - iv2[1]
    nv[2] = iv1[2] - iv2[2]
    return nv
}

// subtract components of a 3D vector from a 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv - the source 3D vector
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {obj/lib/vec3} vec3 library object for chaining
function csub(rv, iv, x, y, z) {
    rv[0] = iv[0] - x
    rv[1] = iv[1] - y
    rv[2] = iv[2] - z
    return this
}

// multiply 3D vectors iv1 and iv2 into an output 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv1 - the first 3D vector operand
// @param {array/vec3} iv2 - the second 3D vector operand
// @returns {obj/lib/vec3} vec3 library object for chaining
function mul(rv, iv1, iv2) {
    rv[0] = iv1[0] * iv2[0]
    rv[1] = iv1[1] * iv2[1]
    rv[2] = iv1[2] * iv2[2]
    return this
}

// multiply two 3D vectors into the newly created vector array
//
// @param {array/vec3} iv1 - the first 3D vector
// @param {array/vec3} iv2 - the second 3D vector
// @returns {array/vec3} the created output 3D vector
function imul(iv1, iv2) {
    const nv = new Float32Array(3)
    nv[0] = iv1[0] * iv2[0]
    nv[1] = iv1[1] * iv2[1]
    nv[2] = iv1[2] * iv2[2]
    return nv
}

// multiply a 3D vector with provided 3D vector components
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv - the source 3D vector
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {obj/lib/vec3} vec3 library object for chaining
function cmul(rv, iv, x, y, z) {
    rv[0] = iv[0] * x
    rv[1] = iv[1] * y
    rv[2] = iv[2] * z
    return this
}

// divide 3D vectors iv1 and iv2 into an output 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv1 - the first 3D vector operand
// @param {array/vec3} iv2 - the second 3D vector operand
// @returns {obj/lib/vec3} vec3 library object for chaining
function div(rv, iv1, iv2) {
    rv[0] = iv1[0] / iv2[0]
    rv[1] = iv1[1] / iv2[1]
    rv[2] = iv1[2] / iv2[2]
    return this
}

// divide two 3D vectors into the newly created vector array
//
// @param {array/vec3} iv1 - the first 3D vector
// @param {array/vec3} iv2 - the second 3D vector
// @returns {array/vec3} the created output 3D vector
function idiv(iv1, iv2) {
    const nv = new Float32Array(3)
    nv[0] = iv1[0] / iv2[0]
    nv[1] = iv1[1] / iv2[1]
    nv[2] = iv1[2] / iv2[2]
    return nv
}

// divide a 3D vector by provided 3D vector components
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv - the source 3D vector
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {obj/lib/vec3} vec3 library object for chaining
function cdiv(rv, iv, x, y, z) {
    rv[0] = iv[0] / x
    rv[1] = iv[1] / y
    rv[2] = iv[2] / z
    return this
}

// shift a 3D vector by x, y and z components (alias to cadd)
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {obj/lib/vec3} vec3 library object for chaining
function shift(rv, iv, x, y, z) {
    rv[0] = iv[0] + x
    rv[1] = iv[1] + y
    rv[2] = iv[2] + z
    return this
}

// shift a 3D vector by x, y and z components into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector (immutable)
// @param {number} x
// @param {number} y
// @param {number} z
// @returns {array/vec3} the created 3D vector array
function ishift(iv, x, y, z) {
    const nv = new Float32Array(3)
    nv[0] = iv[0] + x
    nv[1] = iv[1] + y
    nv[2] = iv[2] + z
    return nv
}

// dot product of two 3D vectors    
//
// @param {array/vec3} iv1 - the first 3D vector (immutable)
// @param {array/vec3} iv2 - the second 3D vector (immutable)
// @returns {number} the dot product
function dot(iv1, iv2) {
    return (iv1[0] * iv2[0] + iv1[1] * iv2[1] + iv1[2] * iv2[2])
}

// cross product of two 3D vectors
//
// Returns a 3D vector array that is perpendicular to both source 3D vectors
// and therefore normal to the plane containing those two vectors.
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv1 - the first 3D vector array (immutable)
// @param {array/vec3} iv2 - the second 3D vector array (immutable)
// @returns {obj/lib/vec3} vec3 library object for chaining
function cross(rv, iv1, iv2) {
    const iv1x = iv1[0], iv1y = iv1[1], iv1z = iv1[2]
    const iv2x = iv2[0], iv2y = iv2[1], iv2z = iv2[2]
    rv[0] = iv1y * iv2z - iv1z * iv2y
    rv[1] = iv1z * iv2x - iv1x * iv2z
    rv[2] = iv1x * iv2y - iv1y * iv2x

    return this
}

// cross product of two 3D vectors into a new 3D vector array
//
// Returns a 3D vector array that is perpendicular to both source 2D vectors
// and therefore normal to the plane containing those two vectors.
//
// @param {array/vec3} iv1 - the first 3D vector array (immutable)
// @param {array/vec3} iv2 - the second 3D vector array (immutable)
// @returns {array/vec3} the created perpendicular 3D vector array
function icross(iv1, iv2) {
    const nv = new Float32Array(3)
    const iv1x = iv1[0], iv1y = iv1[1], iv1z = iv1[2]
    const iv2x = iv2[0], iv2y = iv2[1], iv2z = iv2[2]
    nv[0] = iv1y * iv2z - iv1z * iv2y
    nv[1] = iv1z * iv2x - iv1x * iv2z
    nv[2] = iv1x * iv2y - iv1y * iv2x
    return nv
}

// magnify a 3D vector array by a scalar value (scalar multiplication)
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @param {number} scalar
// @returns {obj/lib/vec3} vec3 library object for chaining
function __scale__(rv, iv, scalar) {
    rv[0] = iv[0] * scalar
    rv[1] = iv[1] * scalar
    rv[2] = iv[2] * scalar
    return this
}

// magnify a 3D vector into a new 3D vector array (scalar multiplication)
//
// @param {array/vec3} iv - the source 3D vector
// @param {number} scalar
// @returns {array/vec3} the created output 3D vector array
function iscale(iv, scalar) {
    const nv = new Float32Array(3)
    nv[0] = iv[0] * scalar
    nv[1] = iv[1] * scalar
    nv[2] = iv[2] * scalar
    return nv
}

// shrink a 3D vector array by a scalar value (scalar division)
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @param {number} scalar
// @returns {obj/lib/vec3} vec3 library object for chaining
function shrink(rv, iv, scalar) {
    const nfactor = 1 / scalar
    rv[0] = iv[0] * nfactor
    rv[1] = iv[1] * nfactor
    rv[2] = iv[2] * nfactor
    return this
}

// shrink a 3D vector into a new 3D vector array (scalar division)
//
// @param {array/vec3} iv - the source 3D vector
// @param {number} scalar
// @returns {array/vec3} the created 3D vector array
function ishrink(iv, scalar) {
    const nv = new Float32Array(3)
    const nfactor = 1 / scalar
    nv[0] = iv[0] * nfactor
    nv[1] = iv[1] * nfactor
    nv[2] = iv[2] * nfactor
    return nv
}

// negate a 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function negate(rv, iv) {
    rv[0] = -iv[0]
    rv[1] = -iv[1]
    rv[2] = -iv[2]
    return this
}

// negate a 3D vector into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector (immutable)
// @returns {array/vec3} the created 3D vector array
function inegate(iv) {
    const nv = new Float32Array(3)
    nv[0] = -iv[0]
    nv[1] = -iv[1]
    nv[2] = -iv[2]
    return nv
}

// inverse a 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function inverse(rv, iv) {
    rv[0] = 1 / iv[0]
    rv[1] = 1 / iv[1]
    rv[2] = 1 / iv[2]
    return this
}

// inverse a 3D vector into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector
// @returns {array/vec3} the created 3D vector array
function iinverse(iv) {
    const nv = new Float32Array(3)
    nv[0] = 1 / iv[0]
    nv[1] = 1 / iv[1]
    nv[2] = 1 / iv[2]
    return nv
}

// ceil the components of a 3D vector
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function __ceil__(rv, iv) {
    rv[0] = Math.ceil(iv[0])
    rv[1] = Math.ceil(iv[1])
    rv[2] = Math.ceil(iv[2])
    return this
}

// ceil the components of a 3D vector into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector (immutable)
// @returns {array/vec3} the created output 3D vector array
function iceil(iv) {
    const nv = new Float32Array(3)
    nv[0] = Math.ceil(iv[0])
    nv[1] = Math.ceil(iv[1])
    nv[2] = Math.ceil(iv[2])
    return nv
}

// floor the components of a 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function __floor__(rv, iv) {
    rv[0] = floor(iv[0])
    rv[1] = floor(iv[1])
    rv[2] = floor(iv[2])
    return this
}

// floor the components of a 3D vector into a new 3D vector array
//
// @param {array/vec3/immutable} iv - the source 3D vector
// @returns {array/vec3} the created output 3D vector array
function ifloor(iv) {
    const nv = new Float32Array(3)
    nv[0] = floor(iv[0])
    nv[1] = floor(iv[1])
    nv[2] = floor(iv[2])
    return nv
}

// round the components of a 3D vector array
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function __round__(rv, iv) {
    rv[0] = round(iv[0])
    rv[1] = round(iv[1])
    rv[2] = round(iv[2])
    return this
}

// floor the components of a 3D vector into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector (immutable)
// @returns {array/vec3} the created 3D vector array
function iround(iv) {
    const nv = new Float32Array(3)
    nv[0] = round(iv[0])
    nv[1] = round(iv[1])
    nv[2] = round(iv[2])
    return nv
}

// normalize a 3D vector
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function normalize(rv, iv) {
    const x = iv[0], y = iv[1], z = iv[2]
    const len2 = x*x + y*y + z*z
    if (len2 > 0) {
        const nfactor = 1 / Math.sqrt(len2)
        rv[0] = x * nfactor
        rv[1] = y * nfactor
        rv[2] = z * nfactor
    } else {
        // no direction information in the original vec3
        rv[0] = 0
        rv[1] = 0
        rv[2] = 0
    }
    return this
}

// normalize a 3D vector into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector array (immutable)
// @returns {array/vec3} the created 3D vector array
function inormalize(iv) {
    const nv = new Float32Array(3)
    const x = iv[0], y = iv[1], z = iv[2]
    const len2 = x*x + y*y + z*z
    if (len2 > 0) {
        const nfactor = 1 / Math.sqrt(len2)
        nv[0] = x * nfactor
        nv[1] = y * nfactor
        nv[2] = z * nfactor
    } else {
        // no direction information in the original vec3
        nv[0] = 0
        nv[1] = 0
        nv[2] = 0
    }
    return nv
}

// normalize provided 3D vector
//
// @param {array/vec3} tv - the target 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function tnormalize(tv) {
    const x = tv[0], y = tv[1], z = tv[2]
    const len2 = x*x + y*y + z*z
    if (len2 > 0) {
        const nfactor = 1 / Math.sqrt(len2)
        tv[0] = x * nfactor
        tv[1] = y * nfactor
        tv[2] = z * nfactor
    } else {
        // no direction information in the original vec3
        tv[0] = 0
        tv[1] = 0
        tv[2] = 0
    }
    return tv
}


// rotate a 3D vector around the x-axis
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @param {number/angle/rad} a - the rotation angle in radians
// @returns {obj/lib/vec3} vec3 library object for chaining
function rotateX(rv, iv, a) {
    const x = iv[0], y = iv[1], z = iv[2]
    rv[0] = x
    rv[1] = y * Math.cos(a)  -  z * Math.sin(a)
    rv[2] = y * Math.sin(a)  +  z * Math.cos(a)
    return this
}

// rotate a 3D vector around the x-axis into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector
// @param {number/angle/rad} a - the rotation angle in radians
// @returns {array/vec3} the created 3D vector array
function irotateX(iv, a) {
    const nv = new Float32Array(3)
    const x = iv[0], y = iv[1], z = iv[2]
    nv[0] = x
    nv[1] = y * Math.cos(a)  -  z * Math.sin(a)
    nv[2] = y * Math.sin(a)  +  z * Math.cos(a)
    return nv
}

// rotate a 3D vector around the y-axis
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @param {number/angle/rad} a - the rotation angle in radians
// @returns {obj/lib/vec3} vec3 library object for chaining
function rotateY(rv, iv, a) {
    const x = iv[0], y = iv[1], z = iv[2]
    rv[0] =  z * Math.sin(a)  +  x * Math.cos(a)
    rv[1] =  y
    rv[2] =  z * Math.cos(a)  -  x * Math.sin(a)
    return this
}

// rotate a 3D vector around the y-axis into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector
// @param {number/angle/rad} a - the rotation angle in radians
// @returns {array/vec3} the created 3D vector array
function irotateY(iv, a) {
    const nv = new Float32Array(3)
    const x = iv[0], y = iv[1], z = iv[2]
    nv[0] =  z * Math.sin(a)  +  x * Math.cos(a)
    nv[1] =  y
    nv[2] =  z * Math.cos(a)  -  x * Math.sin(a)
    return nv
}

// rotate a 3D vector around the z-axis
//
// @param {array/vec3} rv - the receiving 3D vector array
// @param {array/vec3} iv - the source 3D vector
// @param {number/angle/rad} a - the rotation angle in radians
// @returns {obj/lib/vec3} vec3 library object for chaining
function rotateZ(rv, iv, a) {
    const x = iv[0], y = iv[1], z = iv[2]
    rv[0] = x * Math.cos(a)  -  y * Math.sin(a)
    rv[1] = x * Math.sin(a)  +  y * Math.cos(a)
    rv[2] = z
    return this
}

// rotate a 3D vector around the z-axis into a new 3D vector array
//
// @param {array/vec3} iv - the source 3D vector
// @param {number/angle/rad} a - the rotation angle in radians
// @returns {array/vec3} the created 3D vector array
function irotateZ(iv, a) {
    const nv = new Float32Array(3)
    const x = iv[0], y = iv[1], z = iv[2]
    nv[0] = x * Math.cos(a)  -  y * Math.sin(a)
    nv[1] = x * Math.sin(a)  +  y * Math.cos(a)
    nv[2] = z
    return nv
}

// calculate the angle between two 3D vectors
//
// @param {array/vec3/immutable} iv1 - the first 3D vector
// @param {array/vec3/immutable} iv2 - the second 3D vector
// @returns {number/rad} the angle between two 3D vectors in radians
function angle(iv1, iv2) {
    const x1 = iv1[0], y1 = iv1[1], z1 = iv1[2]
    const x2 = iv2[0], y2 = iv2[1], z2 = iv2[2]

    const dot = x1*x2 + y1*y2 + z1*z2
    const mag = Math.sqrt(x1*x1 + y1*y1 + z1*z1) * Math.sqrt(x2*x2 + y2*y2 + z2*z2)
    const cosine = mag && dot/mag // skip division if mag is 0

    return Math.acos( Math.min( Math.max(cosine, -1), 1 ) )
}

// linear interpolation between two 3D vectors
//
// @param {array/vec3} rv - the receiving 2D vector array
// @param {array/vec3} iv1 - the first vec3(immutable)
// @param {array/vec3} iv2 - the second vec3(immutable)
// @param {number} t - the interpolation amount between inputs [0 - 1]
// @returns {obj/lib/vec3} vec3 library object for chaining
function __lerp__(rv, iv1, iv2, t) {
    const x1 = iv1[0], y1 = iv1[1], z1 = iv1[2]
    rv[0] = x1 + t * (iv2[0] - x1)
    rv[1] = y1 + t * (iv2[1] - y1)
    rv[2] = z1 + t * (iv2[2] - z1)
    return this
}

// euclidian distance between two 3D vectors
//
// @param {array/vec3} iv1 - the first operand (immutable)
// @param {array/vec3} iv2 - the second operand (immutable)
// @returns {number} euclidian distance between iv1 and iv2
function dist(iv1, iv2) {
    return Math.hypot(iv1[0] - iv2[0], iv1[1] - iv2[1], iv1[2] - iv2[2])
}

// squared euclidian distance between two 3D vectors
//
// @param {array/vec3} iv1 - the first operand (immutable)
// @param {array/vec3} iv2 - the second operand (immutable)
// @returns {number} squared euclidian distance between iv1 and iv2
function distSq(iv1, iv2) {
    const dx = iv1[0] - iv2[0]
    const dy = iv1[1] - iv2[1]
    const dz = iv1[2] - iv2[2]
    return (dx * dx + dy * dy + dz * dz)
}


// magnitude(length) of a 3D vector
//
// @param {array/vec3} iv - the immutable source vec3 array
// @returns {number} the magnitude(length) of provided vec3
function mag(iv) {
    return Math.hypot(iv[0], iv[1], iv[2])
}

// set the magnitude(length) of a 3D vector
//
// If the magnitude of the source array is 0, [0, 0, 0] will be set
//
// @param {array/vec3} rv - the receiving 3D vector
// @param {array/vec3} iv - the immutable source vec3 array
// @param {number} - the intended magnitude
// @returns {obj/lib/vec3} vec3 library object for chaining
function setMag(rv, iv, mag) {
    const curMag = Math.hypot(iv[0], iv[1], iv[2])
    if (curMag === 0) {
        rv[0] = rv[1] = rv[2] = 0
    } else {
        const mfactor = (1 / curMag) * mag
        rv[0] = iv[0] * mfactor
        rv[1] = iv[1] * mfactor
        rv[2] = iv[2] * mfactor
    }
    return this
}

// set the magnitude(length) of a 3D vector for a cloned 3D vector array
//
// If the magnitude of the source array is 0, [0, 0, 0] will be returned
//
// @param {array/vec3/immutable} iv - the source 3D vector
// @param {number} - the target magnitude to set
// @returns {array/vec3} created 3D vector array with desired magnitude
function isetMag(iv, mag) {
    const nv = new Float32Array(3)
    const curMag = Math.hypot(iv[0], iv[1], iv[2])
    if (curMag === 0) {
        nv[0] = nv[1] = nv[2] = 0
    } else {
        const mfactor = (1 / curMag) * mag
        nv[0] = iv[0] * mfactor
        nv[1] = iv[1] * mfactor
        nv[2] = iv[2] * mfactor
    }
    return nv
}

// length(magnitude) of a 3D vector
//
// @param {array/vec3/immutable} iv - the source 3D vector
// @returns {number} the length(magnitude) of the provided 3D vector
function len(iv) {
    return Math.hypot(iv[0], iv[1], iv[2])
}

// squared length(magnitude) of a 3D vector
//
// @param {array/vec3/immutable} iv - the source 3D vector
// @returns {number} the squared length of the provided 3D vector
function lenSq(iv) {
    return (iv[0] * iv[0] + iv[1] * iv[1] + iv[2] * iv[2])
}

// test if two 3D vectors have equal components
//
// @param {array/vec3/immutable} iv1 - the first 3D vector
// @param {array/vec3/immutable} iv2 - the second 3D vector
// @returns {boolean} true if vectors components are equal, false otherwise
function equals(iv1, iv2) {
    return (iv1[0] === iv2[0] && iv1[1] === iv2[1] && iv1[2] === iv2[2])
}

// test if two 3D vectors have near-equal components with EPSILON precision factor
//
// @param {array/vec3/immutable} iv1 - the first 3D vector
// @param {array/vec3/immutable} iv2 - the second 3D vector
// @param {number} epsilon - (optional) precision factor for near-comparison
// @returns {boolean} true if vectors components are near-equal, false otherwise
function near(iv1, iv2, epsilon) {
    epsilon = epsilon || EPSILON
    const x1 = iv1[0], y1 = iv1[1], z1 = iv1[2]
    const x2 = iv2[0], y2 = iv2[1], z2 = iv2[2]
    return (
           Math.abs(x1 - x2) <= epsilon * Math.max(1, x1, x2)
        && Math.abs(y1 - y2) <= epsilon * Math.max(1, y1, y2)
        && Math.abs(z1 - z2) <= epsilon * Math.max(1, z1, z2)
    )
}

function push(buf, v) {
    buf.push(v[0], v[1], v[2])
    return this
}

// get a 3D vector array string dump
//
// @param {array/vec3/immutable} iv - the source 3D vector
// @returns {string} the 3D vector string representation
function str(iv) {
    return `vec3[${iv[0]}, ${iv[1]}, ${iv[2]}]`
}

// get 3D vector array string representation
//
// @param {array/vec3/immutable} iv - the source 3D vector
// @returns {string} the string with 3D vector array data
function toString(iv) {
    return `[${iv[0]}, ${iv[1]}, ${iv[2]}]`
}

// validate a 3D vector
//
// @param {array/vec3} iv - the source 3D vector
// @returns {boolean} true if a valid 3D vector array provided, false overwise
function validate(iv) {
    const TypedArray = Object.getPrototypeOf(Uint8Array)
    if (!Array.isArray(iv) && !(iv instanceof TypedArray)) return false
    if (iv.length !== 3) return false
    for (let i = 0; i < 3; i++) {
        if (iv[i] == null || !Number.isFinite(iv[i])) return false
    }
    return true
}

// assert a 3D vector, throws an error when the vector is malformed
//
// @param {array/vec3} iv - the source 3D vector
// @returns {obj/lib/vec3} vec3 library object for chaining
function __assert__(iv, tag) {
    tag = tag || 'vec3'
    const TypedArray = Object.getPrototypeOf(Uint8Array)
    if (!Array.isArray(iv) && !(iv instanceof TypedArray)) throw Error(`[${tag}] is expected to be an array or a typed Uint8 array!`)
    if (iv.length !== 3) throw Error(`[${tag}] is expected to have 3 elements!`)
    for (let i = 0; i < 3; i++) {
        const e = iv[i]
        if (e == null || !Number.isFinite(e)) {
            throw new Error(`[${tag}][#${i+1}] component is expected to be a number, but [${e}] found!`)
        }
    }
    return this
}

function vec3(x, y, z) {
    const nv = new Float32Array(3)

    if (arguments.length === 0) {
        return nv
    } else if (arguments.length === 1) {
        if (isArr(x)) {
            nv[0] = x[0] || 0
            nv[1] = x[1] || 0
            nv[2] = x[2] || 0
        } else if (isObj(x)) {
            nv[0] = x.x || 0
            nv[1] = x.y || 0
            nv[2] = x.z || 0
        } else {
            nv[0] = x
        }
    } else if (arguments.length === 2) {
        if (isArr(x)) {
            nv[0] = x[0] || 0
            nv[1] = x[1] || 0
            nv[2] = y || 0
        } else if (isObj(x)) {
            nv[0] = x.x || 0
            nv[1] = x.y || 0
            nv[2] = y || 0
        } else {
            nv[0] = x
            nv[1] = y
        }
    } else {
        nv[0] = x
        nv[1] = y
        nv[2] = z
    }
    return nv
}

extend(vec3, {
    create,
    zero,
    izero,
    unit,
    iunit,
    clone,
    copy,
    set,
    fromArray,

    add,
    iadd,
    cadd,
    sub,
    isub,
    csub, 
    mul,
    imul,
    cmul,
    div,
    idiv,
    cdiv,
    dot,
    cross,
    icross,
    scale: __scale__,
    iscale,
    shrink,
    ishrink,
    shift,
    ishift,
    negate,
    inegate,
    inverse,
    iinverse, 
    ceil: __ceil__,
    iceil: iceil,
    floor: __floor__,
    ifloor: ifloor,
    round: __round__,
    iround: iround,
    normalize,
    inormalize,
    tnormalize,

    rotateX,
    irotateX,
    rotateY,
    irotateY,
    rotateZ,
    irotateZ,
    angle,

    lerp: __lerp__,
    // hermite interpolation
    // bezier interpolation
    // bearing
    dist,
    distSq,
    
    mag,
    setMag,
    isetMag,
    len,
    lenSq,
    equals,
    near,

    push,

    str,
    toString,
    validate,
    assert: __assert__,
})

