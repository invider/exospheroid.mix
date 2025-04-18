//
// WebGL global environment properties and configs
//
const aura = {
    dirLightVec:    vec3(1, -.5, .7),
    dirLightColor:  vec4(1, 1, 1, 1),

    pointLights:      [],
    pointLightColors: [],

    backfaces: 0,
}

// pre-init light arrays
for (let i = 0; i < 48; i++) aura.pointLights[i] = aura.pointLightColors[i] = 0
for (let i = 49; i < 64; i++) aura.pointLightColors[i] = 0

