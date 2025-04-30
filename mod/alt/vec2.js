// ===========================
// 2D Vector Operations
//
// TODO to replace the old v2a
// ===========================

// create a new 2D vector array initialized with provided x,y values
//
// @param {number} x
// @param {number} y
// @returns {Float32Array} a new 2D vector array
function create(x, y) {
    const nv = new Float32Array(2)
    nv[0] = x
    nv[1] = y
    return nv
}

// set values of a 2D vector array components to zero
//
// @param {array/vec2} rv - the receiving 2D vector array
// @returns {obj/lib/vec2} vec2 library object for chaining
function zero(rv) {
    rv[0] = 0
    rv[1] = 0
    return this
}

// create and return new zero-valued vec2 array
//
// @returns {Float32Array} a new vec2 array with 0 values
function izero() {
    return new Float32Array(2)
}

// set a unit vector for the specified angle
//
// @param {array/vec2} rv - the receiving 2D vector array
// @param {number/angle/rad} phi - angle in radians
// @returns {obj/lib/vec3} vec3 library object for chaining
function unit(rv, phi) {
    rv[0] = cos(phi)
    rv[1] = sin(phi)
    return this
}

// create a unit vector from the specified angle
//
// @param {number/angle} phi - angle in radians
// @returns {Float32Array} a new 2D unit vector
function iunit(phi) {
    const nv = new Float32Array(2)
    nv[0] = cos(phi)
    nv[1] = sin(phi)
    return nv
}

// clone a source vec2 array to a new one
//
// @param {array/vec2} iv - a source vec2 array
// @returns {array/vec2} the cloned vec2 array
function clone(iv) {
    const nv = new Float32Array(2)
    nv[0] = iv[0]
    nv[1] = iv[1]
    return nv
}

// copy a source vec2 array to the target one
//
// @param {array/vec2} rv - the receiving 2D vector array
// @param {array/vec2} vsrc - a source vec2 array
// @returns {obj/lib/vec3} vec3 library object for chaining
function copy(rv, vsrc) {
    rv[0] = vsrc[0]
    rv[1] = vsrc[1]
    return this
}

// set the components of a vec2 array
//
// @param {array/vec2} rv - the receiving 2D vector array
// @param {number} x - 2D vector x component
// @param {number} y - 2D vector y component
// @returns {obj/lib/vec3} vec3 library object for chaining
function set(rv, x, y) {
    rv[0] = x
    rv[1] = y
    return this
}

// add two vec2 arrays
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {obj/lib/vec2} vec2 library object for chaining
function add(rv, iv1, iv2) {
    rv[0] = iv1[0] + iv2[0]
    rv[1] = iv1[1] + iv2[1]
    return this
}

// add two vec2 into a newly created vec2 array
//
// @param {array/vec2} iv1 - the first operand
// @param {array/vec2} iv2 - the second operand
// @returns {array/vec2} the created output vec2 array
function iadd(iv1, iv2) {
    const outv = new Float32Array(2)
    outv[0] = iv1[0] + iv2[0]
    outv[1] = iv1[1] + iv2[1]
    return outv
}

// add vec2 array and x/y components of a 2d vector
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} x
// @param {number} y
// @returns {obj/lib/vec2} vec2 library object
function cadd(outv, iv, x, y) {
    outv[0] = iv[0] + x
    outv[1] = iv[1] + y
    return this
}

// subtract vector iv2 from vector iv1 into the output vec2 array
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {obj/lib/vec2} vec2 library object
function sub(outv, iv1, iv2) {
    outv[0] = iv1[0] - iv2[0]
    outv[1] = iv1[1] - iv2[1]
    return this
}

// subtract vector iv2 from vector iv1 into a newly created vec2 array
//
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {array/vec2} the created output vec2 array
function isub(iv1, iv2) {
    const outv = new Float32Array(2)
    outv[0] = iv1[0] - iv2[0]
    outv[1] = iv1[1] - iv2[1]
    return outv
}

// subtract x and y components from a 2d vector iv
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} x
// @param {number} y
// @returns {obj/lib/vec2} vec2 library object
function csub(outv, iv, x, y) {
    outv[0] = iv[0] - x
    outv[1] = iv[1] - y
    return this
}

// multiply two vec2 arrays into the output vec2 array
//
// @param {array/vec2} out - the receiving 2D vector array
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {obj/lib/vec2} vec2 library object
function mul(outv, v1, v2) {
    outv[0] = v1[0] * v2[0]
    outv[1] = v1[1] * v2[1]
    return this
}

// multiply two vec2 arrays into a newly created vec2 array
//
// @param {array/vec2} out - the receiving vec2 array
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {array/vec2} the created output vec2 array
function imul(iv1, iv2) {
    const outv = new Float32Array(2)
    outv[0] = iv1[0] * iv2[0]
    outv[1] = iv1[1] * iv2[1]
    return outv
}

// multiply 2d vector array by x and y components
//
// @param {array/vec2} outv - the receiving vec2 array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} x
// @param {number} y
// @returns {obj/lib/vec2} vec2 library object
function cmul(outv, iv, x, y) {
    outv[0] = iv[0] * x
    outv[1] = iv[1] * y
    return this
}

// divide two vec2 arrays into the output vec2 array
//
// @param {array/vec2} out - the receiving vec2 array
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {obj/lib/vec2} vec2 library object
function div(outv, v1, v2) {
    outv[0] = v1[0] / v2[0]
    outv[1] = v1[1] / v2[1]
    return this
}

// divide two vec2 arrays into a newly created vec2 array
//
// @param {array/vec2} out - the receiving vec2 array
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {array/vec2} the created output vec2 array
function idiv(iv1, iv2) {
    const outv = new Float32Array(2)
    outv[0] = iv1[0] / iv2[0]
    outv[1] = iv1[1] / iv2[1]
    return outv
}

// divide a 2d vector array by x and y components
//
// @param {array/vec2} outv - the receiving vec2 array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} x
// @param {number} y
// @returns {obj/lib/vec2} vec2 library object
function cdiv(outv, iv, x, y) {
    outv[0] = iv[0] / x
    outv[1] = iv[1] / y
    return this
}

// magnify a 2D vector array by a scalar value (scalar multiplication)
//
// @param {array/vec2} outv - the receiving vec2 array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} scalar
// @returns {obj/lib/vec2} vec2 library object
function __scale__(outv, iv, scalar) {
    outv[0] = iv[0] * scalar
    outv[1] = iv[1] * scalar
    return this
}

// magnify a 2D vector array into a new vec2 (scalar multiplication)
//
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} scalar
// @returns {array/vec2} the created output vec2 array
function iscale(iv, scalar) {
    const nv = new Float32Array(2)
    nv[0] = iv[0] * scalar
    nv[1] = iv[1] * scalar
    return nv
}

// shrink a 2D vector array by a scalar value (scalar division)
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} scalar
// @returns {obj/lib/vec2} vec2 library object
function shrink(outv, iv, scalar) {
    const nfactor = 1 / scalar
    outv[0] = iv[0] * nfactor
    outv[1] = iv[1] * nfactor
    return this
}

// shrink a 2D vector array into a new vec2 (scalar division)
//
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} scalar
// @returns {array/vec2} the created output vec2 array
function ishrink(iv, scalar) {
    const nv = new Float32Array(2)
    nv[0] = iv[0] / scalar
    nv[1] = iv[1] / scalar
    return nv
}

// shift a 2D vector array by x and y components (alias to cadd)
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} x
// @param {number} y
// @returns {obj/lib/vec2} vec2 library object
function shift(outv, iv, x, y) {
    outv[0] = iv[0] + x
    outv[1] = iv[1] + y
    return this
}

// shift a 2D vector array by x and y components into a new vec2 array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} x
// @param {number} y
// @returns {array/vec2} the output vec2 array
function ishift(iv, x, y) {
    const outv = new Float32Array(2)
    outv[0] = iv[0] + x
    outv[1] = iv[1] + y
    return outv
}

// negate a 2D vector array
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2D vector
// @returns {obj/lib/vec2} vec2 library object
function negate(outv, iv) {
    outv[0] = -iv[0]
    outv[1] = -iv[1]
    return this
}

// negate a 2D vecto into a new 2D vector array
//
// @param {array/vec2} iv - the source 2D vector (immutable)
// @returns {array/vec2} the created 2D vector array
function inegate(iv) {
    const nv = new Float32Array(2)
    nv[0] = -iv[0]
    nv[1] = -iv[1]
    return nv
}

// inverse a 2D vector array
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2D vector
// @returns {obj/lib/vec2} vec2 library object
function inverse(outv, iv) {
    outv[0] = 1 / iv[0]
    outv[1] = 1 / iv[1]
    return this
}

// inverse a 2D vector into a new 2D vector array
//
// @param {array/vec2} iv - the source 2D vector (immutable)
// @returns {array/vec2} the created 2D vector array
function iinverse(iv) {
    const nv = new Float32Array(2)
    nv[0] = 1 / iv[0]
    nv[1] = 1 / iv[1]
    return nv
}

// normalize a 2D vector array
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2D vector (immutable)
// @returns {obj/lib/vec2} vec2 library object
function normalize(outv, iv) {
    const x = iv[0]
    const y = iv[1]
    const len2 = x * x + y * y
    if (len2 > 0) {
        const nfactor = 1 / Math.sqrt(len2)
        outv[0] = x * nfactor
        outv[1] = y * nfactor
    } else {
        // no direction information in the original vec2
        outv[0] = 0
        outv[1] = 0
    }
    return this
}

// normalize a 2D vector into a new 2D vector array
// @param {array/vec2} iv - the source 2D vector array (immutable)
// @returns {array/vec2} the created 2D vector array
function inormalize(iv) {
    const outv = new Float32Array(2)
    const x = iv[0]
    const y = iv[1]
    const len2 = x * x + y * y
    if (len2 > 0) {
        const nfactor = 1 / Math.sqrt(len2)
        outv[0] = x * nfactor
        outv[1] = y * nfactor
    } else {
        // no direction information in the original vec2
        outv[0] = 0
        outv[1] = 0
    }
    return outv
}

// ceil the components of a 2D vector
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2D vector
// @returns {obj/lib/vec2} vec2 library object
function __ceil__(outv, iv) {
    outv[0] = Math.ceil(iv[0])
    outv[1] = Math.ceil(iv[1])
    return this
}

// ceil the components of a 2D vector array into a new 2D vector array
//
// @param {array/vec2} iv - the source 2d vector (immutable)
// @returns {array/vec2} the created output vec2 array
function iceil(iv) {
    const nv = new Float32Array(2)
    nv[0] = Math.ceil(iv[0])
    nv[1] = Math.ceil(iv[1])
    return nv
}

// floor the components of a 2D vector
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2D vector
// @returns {obj/lib/vec2} vec2 library object
function __floor__(outv, iv) {
    outv[0] = floor(iv[0])
    outv[1] = floor(iv[1])
    return this
}

// floor the components of a 2D vector array into a new 2D vector array
//
// @param {array/vec2} iv - the source 2d vector (immutable)
// @returns {array/vec2} the created output vec2 array
function ifloor(iv) {
    const nv = new Float32Array(2)
    nv[0] = floor(iv[0])
    nv[1] = floor(iv[1])
    return nv
}

// round the components of a 2D vector array
//
// @param {array/vec2} outv - the receiving 2D vector array
// @param {array/vec2} iv - the source 2d vector (immutable)
// @returns {array/vec2} the receiving vec2 array
function __round__(outv, iv) {
    outv[0] = round(iv[0])
    outv[1] = round(iv[1])
    return outv
}

// round the components of a 2D vector array into a new vec2 array
//
// @param {array/vec2} iv - the source 2d vector (immutable)
// @returns {array/vec2} the created output vec2 array
function iround(iv) {
    const outv = new Float32Array(2)
    outv[0] = round(iv[0])
    outv[1] = round(iv[1])
    return outv
}

// rotate a 2D vector around origin on provided angle
//
// @param {array/vec2} iv - the source 2D vector
// @param {number/angle/rad} a - rotation angle
// @returns {array/vec2} the rotated vec2 array
function __rotate__(outv, iv, a) {
    const x = iv[0], y = iv[1]
    outv[0] = x * cos(a) - y * sin(a)
    outv[1] = x * sin(a) + y * cos(a)
    return outv
}

// rotate a 2D vector around origin on provided angle
// @param {array/vec2} iv - the source 2d vector (immutable)
// @param {number} a - rotation angle
// @returns {array/vec2} the created and rotated vec2 array
function irotate(iv, a) {
    const outv = new Float32Array(2)
    const x = iv[0], y = iv[1]
    outv[0] = x * cos(a) - y * sin(a)
    outv[1] = x * sin(a) + y * cos(a)
    return outv
}

// dot product of two 2D vectors
// @param {array/vec2} iv1 - the first 2D vector (immutable)
// @param {array/vec2} iv2 - the second 2D vector (immutable)
// @returns {number} the dot product
function dot(iv1, iv2) {
    return (iv1[0] * iv2[0] + iv1[1] * iv2[1])
}

// cross product of two vec2 into a vec3 array
//
// Returns a 3D vector array that is perpendicular to both source 2D vectors
// and therefore normal to the plane containing those two vectors.
//
// @param {array/vec3} out - the receiving 3D vector array
// @param {array/vec2} iv1 - the first 2D vector array (immutable)
// @param {array/vec2} iv2 - the second 2D vector array (immutable)
// @returns {obj/lib/vec2} vec2 library object
function cross(outv, iv1, iv2) {
    outv[0] = outv[1] = 0
    outv[2] = iv1[0] * iv2[1] - iv1[1] * iv2[0]
    return this
}

// cross product of two 2D vectors into a new 3D vector array
//
// Returns a 3D vector array that is perpendicular to both source 2D vectors
// and therefore normal to the plane containing those two vectors.
//
// @param {array/vec2} iv1 - the first 2D vector array (immutable)
// @param {array/vec2} iv2 - the second 2D vector array (immutable)
// @returns {array/vec3} the created perpendicular 3D vector array
function icross(iv1, iv2) {
    const nv = new Float32Array(3)
    nv[0] = nv[1] = 0
    nv[2] = iv1[0] * iv2[1] - iv1[1] * iv2[0]
    return nv
}


// calculate the angle between two 2D vector arrays
//
// @param {array/vec2/immutable} iv1 - the first 2D vector
// @param {array/vec2/immutable} iv2 - the second 2D vector
// @returns {number/rad} the angle between two 2D vectors in radians
function angle(iv1, iv2) {
    const x1 = iv1[0], y1 = iv1[1], x2 = iv2[0], y2 = iv2[1]

    const mag = Math.sqrt(x1*x1 + y1*y1) * Math.sqrt(x2*x2 + y2*y2)
    const dot = x1 * x2  +  y1 * y2
    const cosine = mag && dot/mag // skip division if mag is 0

    return Math.acos( Math.min( Math.max(cosine, -1), 1 ) )
}

// @name bearing
// angle between OX and bearing vector from iv1 to iv2
//
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {number} angle between OX and bearing vector from iv1 to iv2
function __bearing__(iv1, iv2) {
    return atan2(iv2[1] - iv1[1], iv2[0] - iv1[0])
}

// linear interpolation between two 2D vectors
//
// @param {array/vec2} rv - the receiving 2D vector array
// @param {array/vec2} iv1 - the first vec2(immutable)
// @param {array/vec2} iv2 - the second vec2(immutable)
// @param {number} t - the interpolation amount between two input vec2 [0 - 1]
// @returns {obj/lib/vec2} vec2 library object for chaining
function __lerp__(rv, iv1, iv2, t) {
    const x1 = iv1[0], y1 = iv1[1]
    rv[0] = x1 + t * (iv2[0] - x1)
    rv[1] = y1 + t * (iv2[1] - y1)
    return this
}

// test if two 2D vector arrays have equal components
//
// @param {array/vec2} iv1 - the first vec2(immutable)
// @param {array/vec2} iv2 - the second vec2(immutable)
// @returns {boolean} true if vectors components are equal, false otherwise
function equals(iv1, iv2) {
    return (iv1[0] === iv2[0] && iv1[1] === iv2[1])
}

// test if two 2D vector arrays have near-equal components with EPSILON precision factor
//
// @param {array/vec2} iv1 - the first vec2(immutable)
// @param {array/vec2} iv2 - the second vec2(immutable)
// @param {number} epsilon - (optional) precision factor for near-comparison
// @returns {boolean} true if vectors components are near-equal, false otherwise
function near(iv1, iv2, epsilon) {
    epsilon = epsilon || EPSILON
    const x1 = iv1[0], y1 = iv1[1], x2 = iv2[0], y2 = iv2[1]
    return (
           Math.abs(x1 - x2) <= epsilon * Math.max(1, x1, x2)
        && Math.abs(y1 - y2) <= epsilon * Math.max(1, y1, y2)
    )
}

// euclidian distance between two vec2
//
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {number} euclidian distance between iv1 and iv2
function dist(iv1, iv2) {
    return Math.hypot(iv1[0] - iv2[0], iv1[1] - iv2[1])
}

// squared euclidian distance between two vec2
//
// @param {array/vec2} iv1 - the first operand (immutable)
// @param {array/vec2} iv2 - the second operand (immutable)
// @returns {number} squared euclidian distance between iv1 and iv2
function distSq(iv1, iv2) {
    const dx = iv1[0] - iv2[0]
    const dy = iv1[1] - iv2[1]
    return (dx * dx + dy * dy)
}

// polar angle of a 2D vector (from OX counter-clockwise in the range of [-PI..PI])
//
// @param {array/vec2} iv - the source vec2 array (immutable)
// @returns {number/radians} the polar angle in radians
function polarAngle(iv) {
    return atan2(iv[1], iv[0])
}

// magnitude (length) of a 2D vector
//
// @param {array/vec2} iv - the source vec2 array (immutable)
// @returns {number} the magnitude(length) of provided vec2
function mag(iv) {
    return Math.hypot(iv[0], iv[1])
}

// set the magnitude(length) of a 2D vector
//
// If the magnitude of the source array is 0, [0, 0] will be returned
//
// @param {array/vec2} rv - the receiving 2D vector array
// @param {array/vec2} iv - the immutable source vec2 array
// @param {number} - the intended magnitude
// @returns {obj/lib/vec2} vec2 library object for chaining
function setMag(rv, iv, mag) {
    const curMag = Math.hypot(iv[0], iv[1])
    if (curMag === 0) {
        rv[0] = rv[1] = 0
    } else {
        const mfactor = (1 / curMag) * mag
        rv[0] = iv[0] * mfactor
        rv[1] = iv[1] * mfactor
    }
    return this
}

// set the magnitude(length) of a 2D vector into a new 2D vector array
//
// If the magnitude of the source array is 0, [0, 0] will be returned
// @param {array/vec2/immutable} iv - the source 2D vector
// @param {number} - the target magnitude to set
// @returns {array/vec2} created 2D vector array with desired magnitude
function isetMag(iv, mag) {
    const outv = new Float32Array(2)
    const curMag = Math.hypot(iv[0], iv[1])
    if (curMag === 0) {
        outv[0] = outv[1] = 0
    } else {
        outv[0] = (iv[0]/curMag) * mag
        outv[1] = (iv[1]/curMag) * mag
    }
    return outv
}

// length(magnitude) of a 2D vector
//
// @param {array/vec2/immutable} iv - the source 2D vector
// @returns {number} the length of the provided 2D vector
function len(iv) {
    return Math.hypot(iv[0], iv[1])
}

// squared length of a 2D vector
//
// @param {array/vec2/immutable} iv - the source 2D vector
// @returns {number} the squared length of the provided 2D vector
function lenSq(iv) {
    return (iv[0] * iv[0] + iv[1] * iv[1])
}

// get a 2D vector string dump
//
// @param {array/vec2} iv - the source 2D vector (immutable)
// @returns {string} the 2D vector string representation
function str(iv) {
    return `vec2[${iv[0]}, ${iv[1]}]`
}

// get 2D vector array string representation
//
// @param {array/vec2/immutable} iv - the source 2D vector
// @returns {string} the string with 2D vector array data
function toString(iv) {
    return `[${iv[0]}, ${iv[1]}]`
}

// validate a 2D vector
//
// @param {array/vec2} iv - the source 2D vector
// @returns {boolean} true if a valid 2D vector array provided, false overwise
function validate(iv) {
    const TypedArray = Object.getPrototypeOf(Uint8Array)
    if (!Array.isArray(iv) && !(iv instanceof TypedArray)) return false
    if (iv.length !== 2) return false
    for (let i = 0; i < 2; i++) {
        if (iv[i] == null || !Number.isFinite(iv[i])) return false
    }
    return true
}

// assert a 2D vector, throws an error when the vector is malformed
//
// @param {array/vec2} iv - the source 2D vector
// @returns {obj/lib/vec2} vec2 library object
function __assert__(iv, tag) {
    tag = tag || 'vec2'
    const TypedArray = Object.getPrototypeOf(Uint8Array)
    if (!Array.isArray(iv) && !(iv instanceof TypedArray)) throw Error(`[${tag}] is expected to be an array or a typed Uint8 array!`)
    if (iv.length !== 2) throw Error(`[${tag}] is expected to have 2 elements!`)
    for (let i = 0; i < 2; i++) {
        const e = iv[i]
        if (e == null || !Number.isFinite(e)) {
            throw new Error(`[${tag}][#${i+1}] component is expected to be a number, but [${e}] found!`)
        }
    }
    return this
}

function vec2(x, y) {
    const nv = new Float32Array(2)
    if (arguments.length === 0) {
        return nv
    } else if (arguments.length === 1) {
        if (isArr(x)) {
            nv[0] = x[0] || 0
            nv[1] = x[1] || 0
        } else if (isObj(x)) {
            nv[0] = x.x || 0
            nv[1] = x.y || 0
        } else {
            nv[0] = x
        }
    } else {
        nv[0] = x
        nv[1] = y
    }
    return nv
}

extend(vec2, {
    create,
    zero,
    izero,
    unit,
    iunit,
    clone,
    copy,
    set,
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
    iceil,
    floor: __floor__,
    ifloor,
    round: __round__,
    iround,
    normalize,
    inormalize,

    rotate: __rotate__,
    irotate,
    dot,
    cross,
    icross,
    angle,
    polarAngle,
    bearing: __bearing__,
    lerp: __lerp__,
    dist,
    distSq,

    mag,
    setMag,
    isetMag,
    len,
    lenSq,
    equals,
    near,

    str,
    toString,
    validate,
    assert: __assert__,
})
math.vec2 = vec2
