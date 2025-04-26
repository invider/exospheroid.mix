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

function parseUniforms(src, ext) {
    const lines = src.split('\n')

    const defs = {
        uniform:    [],
        in:         [],
        out:        [],
        total:      0,
    }

    function define(variety, type, name) {
        log('[' + variety + ']: ' + type + ' - ' + name)
        defs[variety].push({
            type,
            name,
        })
        defs.total ++
    }

    let state = NONE
    for (let i = 0; i < lines.length; i++) {
        // get individual line
        let raw = lines[i].trim()
        //if (raw.endsWith(';')) raw = raw.substring(0, raw.length - 1)
        const rawWords = raw.split(/[\s,;]+/).filter(l => l.length > 0)
        // filter out line comments
        const words = []
        for (let j = 0; j < rawWords.length; j++) {
            const w = rawWords[j]
            if (w.startsWith('//')) break
            words.push(w)
        }
        if (words.length === 0) continue

        let variety
        const w0 = words[0]
        if (w0 === 'uniform' || w0 === 'in' || w0 === 'out') variety = w0

        if (variety) {
            const type = words[1]
            for (let k = 2; k < words.length; k++) {
                const name = words[k]
                define(variety, type, name)
            }
        } else {

            log(words)
        }

        if (words[0] === '#version') {
            defs.version = words[1] || ''
            defs.subVersion = words[2] || ''
        }
    }

    if (defs.total > 0) return defs
}
