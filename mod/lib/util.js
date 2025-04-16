function captureMouse() {
    // calculate a safe delay to avoid capture lock DOM exception
    const t = 1000 - Math.min(abs((env.prt || 0) - Date.now()), 1000)
    setTimeout(() => {
        gc.requestPointerLock()
    }, t * 2.5)
}
