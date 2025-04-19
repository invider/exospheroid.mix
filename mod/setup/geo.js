function geo() {
    lib.screw.mesh.gen().cube().push(.5 + $.lib.math.rnd() * 2).scale().push('cube').label().bake()
}
geo.Z = 81
