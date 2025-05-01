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
    const mouseBroker = lab.monitor.mouseBroker
    if (mouseBroker && mouseBroker.onMouseWheel) {
        mouseBroker.onMouseWheel(e)
    }
}

