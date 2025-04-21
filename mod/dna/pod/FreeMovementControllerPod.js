class FreeMovementControllerPod {

    constructor(st) {
        extend(this, {
            name:      'controller',
            speed:     20,
            turnSpeed: 1,
        }, st)

        this.pushers = new Float32Array(32)
    }

    init() {
        this.capture()
    }

    capture() {
        lab.monitor.mouseBroker = this
        lab.monitor.controller.bindAll(this)
    }

    release() {
        if (lab.monitor.mouseBroker === this) {
            lab.monitor.mouseBroker = null
        }
        lab.monitor.controller.unbindAll()
    }

    push(action, factor, dt) {
        const __ = this.__
        const speed     = this.speed
        const turnSpeed = this.turnSpeed
        switch(action) {
            case dry.FORWARD:
                __.moveZ(-speed * dt)
                break
            case dry.STRAFE_LEFT:
                __.moveX(-speed * dt)
                break
            case dry.BACKWARD:
                __.moveZ(speed * dt)
                break
            case dry.STRAFE_RIGHT:
                __.moveX(speed * dt)
                break
            case dry.FLY_UP:
                __.moveY(speed * dt)
                break
            case dry.FLY_DOWN:
                __.moveY(-speed * dt)
                break

            case dry.LOOK_LEFT:
                __.yaw(-turnSpeed * dt)
                break
            case dry.LOOK_RIGHT:
                __.yaw(turnSpeed * dt)
                break
            case dry.LOOK_UP:
                __.pitch(-turnSpeed * dt)
                break
            case dry.LOOK_DOWN:
                __.pitch(turnSpeed * dt)
                break
            case dry.ROLL_LEFT:
                __.roll(turnSpeed * dt)
                break
            case dry.ROLL_RIGHT:
                __.roll(-turnSpeed * dt)
                break

            case dry.SHIFT_YAW:
                __.yaw(-turnSpeed * factor * dt)
                break
            case dry.SHIFT_PITCH:
                __.pitch(turnSpeed * factor * dt)
                break
            case dry.SHIFT_ROLL:
                __.roll(turnSpeed * factor * dt)
                break
        }
    }

    evo(dt) {
        // activate pushers
        for (let i = 0; i < this.pushers.length; i++) {
            const f = this.pushers[i]
            if (f) {
                this.push(i, f, dt)
                if (i >= dry.SHIFT_YAW) this.pushers[i] = 0 // reset the mouse movement accumulation buffers
            }
        }
    }

    actuate(action) {
        this.pushers[action.id] = 1
    }

    act(action) {
    }

    cutOff(action) {
        this.pushers[action.id] = 0
    }

    onMouseDown(e) {
        if (e.button == 0) {
            if (!env.mouseLock) lib.util.captureMouse()
        }
    }

    onMouseUp(e) {}

    onMouseMove(e) {
        if (!env.mouseLock) return

        const dx = e.movementX, dy = e.movementY

        if (dx) {
            if (e.shiftKey) {
                // accumulate mouse roll
                this.pushers[dry.SHIFT_ROLL] += dx * .1
            } else {
                // accumulate horizontal mouse movement
                this.pushers[dry.SHIFT_YAW] -= dx * .1
            }
        }
        if (dy) {
            // accumulate vertical mouse movement
            this.pushers[dry.SHIFT_PITCH] += dy * 0.075
        }
    }
}
