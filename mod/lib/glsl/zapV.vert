#version 300 es

// >>> uniforms <<<
// uModelMatrix
// uNormalMatrix
// uViewMatrix
// uProjectionMatrix
// >>> end <<<

// >>> attributes <<<
// aVertPos
// aVertNorm
// aVertColor
// aVertUV
// >>> end <<<

/*
 * m - model matrix
 * n - normal matrix (derived from the model one)
 * v - view matrix
 * p - projection matrix
 *
 * vp - vertex position
 * vn - vertex normal
 * vc - vertex color
 * uv - vertex UV coordinates
 *
 * wp - world position
 * wn - world normal
 * wc - varying vertex color
 * uw - varying vertex UV coordinates
 * fd - fog depth
 */

uniform mat4 uModelMatrix, uNormalMatrix, uViewMatrix, uProjectionMatrix;

in vec3 aVertPos, aVertNorm, aVertColor;
in vec2 aVertUV;

out vec3 vWorldPos, vWorldNormal, vVertColor;
out vec2 vVertUV;
out float vFogDepth;

void main(void) {
    vec4 vertPos4 = vec4(aVertPos, 1.0);                       // convert vertex position to homogenious vec4
    vWorldPos = (uModelMatrix * vertPos4).xyz;                 // calculate world space position
    vWorldNormal = (uNormalMatrix * vec4(aVertNorm, 1.0)).xyz; // calculate world space normal
    vVertColor = aVertColor;                                   // interpolate the vertex color
    vVertUV = aVertUV;                                         // interpolate UV coordinates
    vFogDepth = -(uViewMatrix * uModelMatrix * vertPos4).z;    // calculate fog distance

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vertPos4;
}
