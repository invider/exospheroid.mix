function onActivate() {
    this.startedAt = env.time
    lab.background = env.style.color.title.back
}

function onDeactivate() {}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    lab.control.state.transitTo('space')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.title.hold) {
        this.next()
    }
}
