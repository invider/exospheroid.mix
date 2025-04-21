function level(e) {
    // TODO setup the level
    lab.control.state.transitTo('space', e)
    lab.port.cam.capture()
}
