function mouseDown(e) {
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.mouseDown)) state.mouseDown(e)
        if (state.trap && isFun(state.trap.mouseDown)) state.trap.mouseDown(e)
    }
    if (lab.monitor.mouseBroker && lab.monitor.mouseBroker.onMouseDown) {
        lab.monitor.mouseBroker.onMouseDown(e)
    }
}
