function pointerLock(e) {
    if (lab.monitor.mouseBroker && lab.monitor.mouseBroker.onPointerLock) {
        lab.monitor.mouseBroker.onPointerLock(e)
    }
}
