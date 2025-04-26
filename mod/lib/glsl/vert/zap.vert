#version 300 es

// Below is a special uniform and attributes declarations for Collider.JAM .vert parser
// Make sure it declares all uniforms and attributes used in the shader.
// Collider.JAM automatically binds their location.
//
// TODO make a GLSL parser to extract that information directly from the shader source.
//

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
    //gl_Position = uProjectionMatrix * uViewMatrix * vertPos4;
    //gl_Position = vertPos4;
    gl_PointSize = 20.0;
}
