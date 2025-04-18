class EntityFrame extends sys.Frame {

    constructor(st) {
        super(st)

        const $ = this
        // install trails if present
        console.dir(st._traits)
        if (st && st._traits) st._traits.forEach(trait => {
            extend($, trait)
            if (trait.__onTrait) trait.__onTrait.call($)
        })

    }

}
