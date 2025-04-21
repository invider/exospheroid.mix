function controls() {

    document.onpointerlockchange = (e) => {
        if (document.pointerLockElement) {
            env.mouseLock = true
        } else {
            env.mouseLock = false
            env.prt = Date.now()
        }
    }
}
controls.Z = 7
