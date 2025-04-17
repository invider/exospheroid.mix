function linkPrograms() {
    if (!lib._programCatalog) return // nothing to link

    lib._programCatalog.forEach(prog => prog.link())
}
