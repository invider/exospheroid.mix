function pointerRelease(e) {
    if (lab.monitor.mouseBroker && lab.monitor.mouseBroker.onPointerRelease) {
        lab.monitor.mouseBroker.onPointerRelease(e)
    }
}
