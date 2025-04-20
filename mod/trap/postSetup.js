function postSetup() {
    if (env.config.warp) {
        // fast-jump into a level
        if (typeof env.config.warp === 'boolean') {
            trap('game/level', {
                level:  1,
                fadein: 0,
            })
        } else {
            let level = parseInt(env.config.warp)
            if (isNaN(level)) level = env.config.warp // probably a level title
            trap('game/level', {
                level:  level,
                fadein: 0,
            })
        }
    } else {
        lab.control.state.transitTo('title', {
            fadein: 0,
        })
    }
}

