function mouseMove(e) {
    const mouseBroker = lab.monitor.mouseBroker
    if (mouseBroker && mouseBroker.onMouseMove && !mouseBroker.disabled) {
        mouseBroker.onMouseMove(e)
    }
}
