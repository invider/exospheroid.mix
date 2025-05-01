function mouseDown(e) {
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.mouseDown)) state.mouseDown(e)
        if (state.trap && isFun(state.trap.mouseDown)) state.trap.mouseDown(e)
    }

    const mouseBroker = lab.monitor.mouseBroker
    if (mouseBroker && mouseBroker.onMouseDown && !mouseBroker.disabled) {
        mouseBroker.onMouseDown(e)
    }
}
