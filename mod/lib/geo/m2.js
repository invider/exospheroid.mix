// === 3D vector ops ===

/*
vec3.fromArray = (buf, i) => {
    return vec3(
        buf[i],
        buf[i+1],
        buf[i+2],
    )
}

vec3.push = function(buf, v) {
    buf.push(v[0], v[1], v[2])
}

function _iadd(v, w, f) {
    return vec3(
        v[0] + f*w[0],
        v[1] + f*w[1],
        v[2] + f*w[2]
    )
}
vec3.isub = (v, w) => {
    return _iadd(v, w, -1)
}

vec3.iadd = (v, w) => {
    return _iadd(v, w, 1)
}

vec3.scad = function(v, w, s) {
    v[0] += w[0] * s
    v[1] += w[1] * s
    v[2] += w[2] * s
    return this
}

vec3.fromSpherical = function(r, theta, phi) {
    const v = new Float32Array(3)
    v[0] = r * sin(theta) * cos(phi)
    v[1] = r * sin(theta) * sin(phi)
    v[2] = r * cos(theta)
    return v
}

vec3.toSpherical = function(v) {
    const w = new Float32Array(3), x = v[0], y = v[1], z = [2]
    w[0] = vec3.len(v)
    w[1] = Math.atan2(v[2], v[0])
    w[2] = Math.atan2(v[1], v[2])
    return w
}

vec3.mulM4 = function(v, m) {
    const x = v[0], y = v[1], z = v[2], w = 1
       //W = m[3]*x + m[7]*y + m[11]*z + m[15]
    v[0] = (m[0]*x + m[4]*y + m[8 ]*z + m[12])
    v[1] = (m[1]*x + m[5]*y + m[9 ]*z + m[13])
    v[2] = (m[2]*x + m[6]*y + m[10]*z + m[14])
}
*/


// === 4x4 matrix ops ===

// generate buffer matrices used to speed up calculations
const tempM4 = []
for (let i = 0; i < 8; i++) tempM4[i] = mat4.identity()
const tsm4 = tempM4[0], // for scaling
      ttm4 = tempM4[1], // for translation
      txm4 = tempM4[2], // for x-axis rotation
      tym4 = tempM4[3], // for y-axis rotation
      tzm4 = tempM4[4], // for z-axis rotation
      trm4 = tempM4[5]  // for zyx rotation

