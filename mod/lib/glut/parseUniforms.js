const NONE       = 0,
      UNIFORMS   = 1,
      ATTRIBUTES = 2

function stripComment(line) {
    if (!line) return ''
    line = line.trim()
    if (line.startsWith('//')) line = line.substring(2).trim()
    else if (line.startsWith('/*')) line = line.substring(2).trim()
    else if (line.startsWith('*')) line = line.substring(1).trim()

    return line
}

function parseUniforms(src) {
    const lines = src.split('\n')

    const defs = {
        uniforms:   [],
        attributes: [],
    }

    let state = NONE
    for (let i = 0; i < lines.length; i++) {
        const line = stripComment(lines[i])
        if (!line) continue

        switch(state) {
            case NONE:
                if (line.includes('>>> uniforms <<<')) {
                    state = UNIFORMS
                } else if (line.includes('>>> attributes <<<')) {
                    state = ATTRIBUTES
                } else {
                    // just ignore the line
                }
                break
            case UNIFORMS:
                if (line.includes('>>> end <<<')) {
                    state = NONE
                } else {
                    if (line) defs.uniforms.push(line)
                }
                break
            case ATTRIBUTES:
                if (line.includes('>>> end <<<')) {
                    state = NONE
                } else {
                    if (line) defs.attributes.push(line)
                }
                break
        }
    }

    if (defs.uniforms.length > 0 || defs.attributes.length > 0) return defs
}
