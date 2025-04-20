function environment() {
    //lab.background = null

    // copy debug and trace properties
    for (const prop in env.config) {
        if (prop.startsWith('debug') || prop.startsWith('trace')) env[prop] = env.config[prop]
    }
}
environment.Z = 1
