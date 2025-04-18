const aura = {
    dirLightVector: vec3(1, -.5, .7),  // directional light vector
    dirLightColor:  vec4(1, 1, 1, 1),  // directional light color

    pointLights:      [],
    pointLightColors: [],

    backfaces: 0,
}
for (let i = 0; i < 48; i++) aura.pointLights[i] = aura.pointLightColors[i] = 0
for (let i = 49; i < 64; i++) aura.pointLightColors[i] = 0
