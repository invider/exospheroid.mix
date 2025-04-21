function pointerLockError(e) {
    if (lab.monitor.mouseBroker && lab.monitor.mouseBroker.onPointerLockError) {
        lab.monitor.mouseBroker.onPointerLockError(e)
    }
}
