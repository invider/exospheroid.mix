#version 300 es

// Below is a special uniform declaration for Collider.JAM .frag parser
// Make sure it declares all uniforms used in the shader.
// Collider.JAM automatically binds their location.
//
// TODO make a GLSL parser to extract that information directly from the shader source.

precision highp float;

// environment
in vec3 vVertColor;

out vec4 outColor;

void main(void) {
    outColor = vec4(vVertColor, 1.0);
}
