const MAX_CONTROLLERS           = 8
const MAX_GAMEPADS              = 4
const GAMEPAD_CONTROLLERS_BASE  = 1 // gamepad controllers usually indexed from 1..4
const KEYBOARD_CONTROLLERS_BASE = 5 // keyboard controllers are indexed from 5..

/*
const UP     = 1    // movement
const LEFT   = 2
const DOWN   = 3
const RIGHT  = 4
const A      = 5    // actions
const B      = 6
const X      = 7
const Y      = 8
const L1     = 9    // triggers
const R1     = 10
const L2     = 11
const R2     = 12
const MENU   = 13   // menu
const START  = 14
*/

let bind

// list of action names
const actions = [
    '',
    'FORWARD',        // 1
    'STRAFE_LEFT',
    'BACKWARD',
    'STRAFE_RIGHT',
    'FLY_UP',
    'FLY_DOWN',

    'LOOK_UP',        // 7
    'LOOK_LEFT',
    'LOOK_DOWN',
    'LOOK_RIGHT',

    'ROLL_LEFT',      // 11
    'ROLL_RIGHT',

    'ACT',            // 13
    'SELECT',
    'CANCEL',
    'DONE',           // 16
]

// globally fixed keys with no remap
const fixed = {
    enter:          'Enter',
    escape:         'Escape',
    backspace:      'Backspace',
    startCheating:  'Backslash',

    pause:          'KeyP',
    //releaseAll:     'End',
    menu:           'Escape',
    zoomIn:         'Equal',
    zoomOut:        'Minus',
    autoZoom:       'Digit0',
    speedUp:        'BracketRight',
    slowDown:       'BracketLeft',
    speedNormal:    'Quote',
    rewind:         'Comma',
}

// keyboard controllers mapping
//
// Each subarray defines the next controller starting from ```KEYBOARD_CONTROLLERS_BASE```
// (e.g. with ```KEYBOARD_CONTROLLERS_BASE = 5```, these will be mapped to controllers 5, 6, 7...).
//
// Each entry maps an action #N to a particular key event code.
// A missing entry or an empty string means there is no key mapping for this particular action.
//
// ```indexKeyActions``` *MUST* be run every time this table changes to consolidate the mapping.
//
const keyboardControllersMapping = [
    // quaker
    [ 'KeyW', 'KeyA', 'KeyS', 'KeyD',
        'Home',        // fly up
        'End',         // fly down

        'ArrowUp',     // look up
        'ArrowLeft',   // turn left
        'ArrowDown',   // look down
        'ArrowRight',  // turn right

        'KeyQ',        // roll left
        'KeyE',        // roll right

        'Space',       // act
        'ShiftLeft',   // select
        'KeyX',        // cancel
        'Enter',       // done

        '!ALT', '', '', '', '',
        'Home', 'End',        // alt fly up/down
        '', '', '', '',
        'PageUp', 'PageDown', // alt roll left/right
    ],
]

const padActionIdMaps = [
    /*
    {
        // xbox 360 gamepad profile
        axesSensitivity: 0.35,
        axesPositive: [RIGHT,   DOWN,  RIGHT,  DOWN],
        axesNegative: [LEFT,    UP,    LEFT,   UP],
        buttonsSensitivity: 0.2, 
        buttons: [A, B, X, Y, L1, R1, L2, R2, MENU, START, 0, 0, UP, DOWN, LEFT, RIGHT],
    },
    {
        // xbox 360 gamepad profile
        axesSensitivity: 0.35,
        axesPositive: [12, 14, 12, 14],
        axesNegative: [13, 15, 13, 15],
        buttonsSensitivity: 0.2, 
        buttons: [A, B, X, Y, L1, R1, L2, R2, MENU, START, 0, 0, UP, DOWN, LEFT, RIGHT],
    },
    {
        // xbox 360 gamepad profile
        axesSensitivity: 0.35,
        axesPositive: [RIGHT,   DOWN,  RIGHT,  DOWN],
        axesNegative: [LEFT,    UP,    LEFT,   UP],
        buttonsSensitivity: 0.2, 
        buttons: [A, B, X, Y, L1, R1, L2, R2, MENU, START, 0, 0, UP, DOWN, LEFT, RIGHT],
    },
    {
        // xbox 360 gamepad profile
        axesSensitivity: 0.35,
        axesPositive: [RIGHT,   DOWN,  RIGHT,  DOWN],
        axesNegative: [LEFT,    UP,    LEFT,   UP],
        buttonsSensitivity: 0.2, 
        buttons: [A, B, X, Y, L1, R1, L2, R2, MENU, START, 0, 0, UP, DOWN, LEFT, RIGHT],
    },
    */
]

function init() {
    bind = this
    indexActions()
}

function indexPadActions() {
    bind.padActionMaps = []
    padActionIdMaps.forEach((padActionIdMap, padId) => {
        const controllerId = GAMEPAD_CONTROLLERS_BASE + padId

        const map = {
            axesSensitivity: padActionIdMap.axesSensitivity,
            buttonsSensitivity: padActionIdMap.buttonsSensitivity,
        }

        map.axesPositive = []
        padActionIdMap.axesPositive.forEach((actionId, axisId) => {
            const name = actionName(actionId)
            if (name) {
                map.axesPositive[axisId] = Object.freeze({
                    id:           actionId,
                    name:         name,
                    pushable:     true,
                    axisId:       axisId,
                    controllerId: controllerId,
                })
            }
        })

        map.axesNegative = []
        padActionIdMap.axesNegative.forEach((actionId, axisId) => {
            const name = actionName(actionId)
            if (name) {
                map.axesNegative[axisId] = Object.freeze({
                    id:           actionId,
                    name:         name,
                    pushable:     true,
                    axisId:       axisId,
                    controllerId: controllerId,
                })
            }
        })

        map.buttons = []
        padActionIdMap.buttons.forEach((actionId, buttonId) => {
            const name = actionName(actionId)
            if (name) {
                map.buttons[buttonId] = Object.freeze({
                    id:           actionId,
                    name:         name,
                    gamepad:      true,
                    pushable:     true,
                    buttonId:     buttonId,
                    controllerId: controllerId,
                })
            }
        })

        bind.padActionMaps[padId] = map
    })
}

function indexKeyActions() {
    bind.keyCodeActionMap = []
    for (let keyboardController = 0; keyboardController < keyboardControllersMapping.length; keyboardController++) {
        const keyActionMap = keyboardControllersMapping[keyboardController]
        for (let i = 0; i < keyActionMap.length; i++) {
            const layout = i / actions.length,    // 0 - main, 1 - alternative layout, 2 - 2nd alternative...
                  actionId = i % actions.length + 1,
                  keyCode = keyActionMap[i]
            if (keyCode) {
                bind.keyCodeActionMap[keyCode] = Object.freeze({
                    id:           actionId,
                    layout:       layout,
                    keyboard:     true,
                    name:         actionName(actionId),
                    controllerId: KEYBOARD_CONTROLLERS_BASE + keyboardController,
                })
            }
        }
    }
}

function indexActions() {
    indexPadActions()
    indexKeyActions()
}

function actionName(action) {
    return actions[action] || ''
}

function actionId(name) {
    return actions.indexOf(name)
}

// *MUST* be run every time *keyboardControllersMapping* table changes
function onRemap() {
    indexKeyActions()
}

