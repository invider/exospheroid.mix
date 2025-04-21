function mouseMove(e) {
    if (lab.monitor.mouseBroker && lab.monitor.mouseBroker.onMouseMove) {
        lab.monitor.mouseBroker.onMouseMove(e)
    }
}
