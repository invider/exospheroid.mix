function environment() {
    lab.background = null
    pin.aqua = mod['aqua-buf']
    pin.backdrop = mod['backdrop-buf']

    // copy debug and trace properties
    for (const prop in env.config) {
        if (prop.startsWith('debug') || prop.startsWith('trace')) env[prop] = env.config[prop]
    }
}
