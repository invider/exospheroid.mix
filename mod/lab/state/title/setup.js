function setup() {
    this.spawn('hud/Label', {
        DNA: 'hud/Label',
        rx:  .5,
        ry:  .35,
        font:  env.style.font.title.head,
        color: env.style.color.title.front,
        text: res.txt.label.title,
    })
}
