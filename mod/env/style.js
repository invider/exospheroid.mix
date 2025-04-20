
const style = {

    font: {
        main: {
            family: 'moon',
            size:    24,
        },
        title: {
            family: 'moon',
            size:    64,
        },

        info: {
            family: 'moon',
            size:    24,
        },
        debug: {
            family: 'moon',
            size:    24,
        },
    },
    
    color: {
        title: {
            front: '#7645ce',
            back:  '#252030',
        }
    },
}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

