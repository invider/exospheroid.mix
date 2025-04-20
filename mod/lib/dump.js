// get a dump of a vec3 with the provided precision (0 by default)
function __vec3__(v3, precision) {
    precision = precision? pow(10, round(precision)) : 1
    const x = round(v3[0] * precision)/precision,
          y = round(v3[1] * precision)/precision,
          z = round(v3[2] * precision)/precision
    return `${x}:${y}:${z}`
}

const dump = {
    vec3: __vec3__,
}
