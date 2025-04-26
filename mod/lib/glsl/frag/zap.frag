#version 300 es

// Below is a special uniform declaration for Collider.JAM .frag parser
// Make sure it declares all uniforms used in the shader.
// Collider.JAM automatically binds their location.
//
// TODO make a GLSL parser to extract that information directly from the shader source.

precision highp float;

// environment

uniform vec4 uOpt, uDirLightColor, uFogColor, uPointLightColors[16],
    uMatAmbient, uMatDiffuse, uMatSpecular;
uniform vec3 uCamPos, uDirLightVec, uPointLights[16];

// un - material 
uniform float uSpecularExponent;
uniform sampler2D uTexture;

in vec3 vWorldPos, vWorldNormal, vVertColor;
in vec2 vVertUV;
in float vFogDepth;

out vec4 outColor;

void main(void) {
    vec3 WN = normalize(vWorldNormal);

    // directional diffuse
    // TODO expand into a 3-component vector with dir light colors included
    float dd = max(
        dot(WN, uDirLightVec),
        0.0
    ) * uDirLightColor.w;

    // calculate directional diffuse color component
    vec3 dc = vec3(0.0, 0.0, 0.0);
    dc = dc + uDirLightColor.xyz * dd;

    vec3 sc = vec3(0.0, 0.0, 0.0);  // specular color accumulator
    vec3 eye = normalize(uCamPos - vWorldPos);

    for (int i = 0; i < 16; i++) {
        // accumulate diffuse components of point lights
        vec3 dr = uPointLights[i] - vWorldPos;
        float pd = length(dr); // point light distance
        dr /= pd;

        // attenuation (TODO include as a part of point light vec4 coords?)
        float a = 1.0 / (
            .2 // constant component for infinite dist
            + 0.001 * pd*pd // quadratic factor
        );

        // point light diffuse lambert
        float l = max(
            dot(WN, dr),
            0.0
        ) * uPointLightColors[i].w * a;
        dc = dc + uPointLightColors[i].xyz * l;

        // accumulate specular
        vec3 hv = normalize(dr + eye);  // point light half-vector

        float c = pow(
            max( dot(WN, hv), 0.0 ), uSpecularExponent
        ) * uPointLightColors[i].w * a;

        sc = sc + uPointLightColors[i].xyz * c;
    }

    // directional specular
    vec3 hd = normalize(uDirLightVec + eye); // directional half-vector
    float sd = pow(
        max( dot(WN, hd), 0.0 ), uSpecularExponent
    ) * uDirLightColor.w;
    sc += uDirLightColor.xyz * sd;

    // fog
    float z = gl_FragCoord.z / gl_FragCoord.w;
    // hardcoded fog values
    //float fA = smoothstep(30.0, 140.0, vFogDepth); // fog amount
    float fA = 0.0;

    /*
    outColor = mix(
        vec4(
                // shaded component
                uMatAmbient.xyz * uMatAmbient.w
                + (texture(uTexture, vVertUV).xyz * uOpt.z
                     + uMatDiffuse.xyz * (1.0-uOpt.z)) * dc * uMatDiffuse.w
                + uMatSpecular.xyz * sc * uMatSpecular.w,
            1.0) * uOpt.x                          // 1.0 - hardcoded opacity
            + vec4(uDirLightVec.xyz * uOpt.y, 1.0) // wireframe component
            + vec4(vVertColor * uOpt.w, 1.0),      // plain color component
        uFogColor,
        fA
    );
    */
    outColor = vec4(vVertColor, 1.0);
    //outColor = vec4(.5, .6, .7, 1.0);
}
