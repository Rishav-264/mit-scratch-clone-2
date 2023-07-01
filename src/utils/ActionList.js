export const ActionList = {
    Motion: [
        {
            text:"Move /inputs Steps",
            type: "move",
            initiator: false
        },
        {
            text:`turn /icon /inputr degrees`,
            iconName:"undo",
            colorClass:"text-white",
            type:"rotateLeft",
            initiator: false
        },
        {
            text:"turn /icon /inputr degrees",
            iconName:"redo",
            colorClass:"text-white",
            type:"rotateRight",
            initiator: false
        },
        {
            text:"go to /select",
            selectOptions: ["random position", "mouse-pointer"],
            type:"moveRandomPosition",
            initiator: false
        },
        {
            text: 'go to x: /inputx y: /inputy',
            type:"movePosition",
            initiator: false
        },
        {
            text: 'glide /inputd secs to /select',
            selectOptions: ["random position", "mouse-pointer"],
            type:"glideToRandomPosition",
            initiator: false
        },
        {
            text: 'glide /inputd secs to x: /inputx y: /inputy',
            type:"glideToPosition",
            initiator: false
        },
        {
            text: 'point in direction /inputr',
            type:"rotateTo",
            initiator: false
        },
        {
            text: 'points towards /select',
            selectOptions: ["mouse-pointer"],
            type: "mousePoint",
            initiator: false
        },
        {
            text: 'change x by /inputx',
            type: "changeX",
            initiator: false
        },
        {
            text: 'set x to /inputx',
            type: "setX",
            initiator: false
        },
        {
            text: 'change y by /inputy',
            type: "changeY",
            initiator: false
        },
        {
            text: 'set y to /inputy',
            type: "setY",
            initiator: false
        }
    ],
    Events: [
        {
            text:"when /icon clicked",
            iconName:"flag",
            colorClass:"text-green-600",
            type:"flagClicked",
            initiator: true
        },
        // {
        //     text:"when this sprite is clicked",
        //     type:"spriteClick",
        //     initiator: true
        // }
    ],
    Looks: [
        {
            text: "change size by /inputh",
            type: "changeSize",
            initiator: false
        },
        {
            text: "set size to /inputh %",
            type: "setSize",
            initiator: false
        }
    ]
}