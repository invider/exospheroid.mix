function captureMouse() {
    // calculate a safe delay to avoid capture lock DOM exception
    const t = 1000 - min(abs((env.prt || 0) - Date.now()), 1000)
    setTimeout(() => {
        $.glCanvas.requestPointerLock()
    }, t * 2.5)
}

