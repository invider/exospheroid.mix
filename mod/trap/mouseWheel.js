function mouseWheel(e) {
    /*
    const x = mouse.x
    const y = mouse.y
    if (e.wheelDeltaY < 0) {
        lab.port.zoomOut(e.wheelDeltaY, x, y)
    } else if (e.wheelDeltaY > 0) {
        lab.port.zoomIn(e.wheelDeltaY, x, y)
    }
    */
    if (lab.monitor.mouseBroker && lab.monitor.mouseBroker.onMouseWheel) {
        lab.monitor.mouseBroker.onMouseWheel(e)
    }
}

