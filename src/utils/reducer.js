const reducer = (state, action) => {
    let randomX = Math.floor(Math.random() * action.width -50);
    let randomY = Math.floor(Math.random() * action.height - 100);
    switch (action.type) {
        case 'update':
            return [
                state[state.length - 1]
            ]
        case "move":
            let angle = parseInt(state?.[state?.length - 1]?.rotation);
            let angleInRadians = angle * (Math.PI / 180);
            let changeInX = parseInt(action?.steps) * Math.cos(angleInRadians);
            let changeInY = parseInt(action?.steps) * Math.sin(angleInRadians);
            return [
            ...state,
            {
                ...state?.[state?.length - 1],
                x: parseInt(state?.[state?.length - 1]?.x) + changeInX,
                y: parseInt(state?.[state.length - 1]?.y) + changeInY,
                duration: 0,
                steps: action?.steps
            }]
        case "rotateLeft":
            return [
                ...state,
                {
                    ...state?.[state?.length - 1],
                    rotation: parseInt(state?.[state?.length - 1]?.rotation) - parseInt(action?.rotation),
                    duration: 0
                }
            ]
        case "rotateRight":
            return [
                ...state,
                {
                    ...state?.[state?.length - 1],
                    rotation: parseInt(state?.[state?.length - 1]?.rotation) + parseInt(action?.rotation),
                    duration: 0
                }
            ]
        case "moveRandomPosition":
            return [
                ...state,
                {
                    ...state?.[state?.length - 1],
                    x: randomX,
                    y: randomY,
                    duration: 0
                }
            ]
        case "glideToPosition":
            return [
                ...state,
                {
                    ...state?.[state?.length - 1],
                    x: parseInt(action.x),
                    y: parseInt(action.y),
                    duration: parseInt(action.duration)
                }
            ]
        case "glideToRandomPosition":
            if(action?.select === "random-position"){
                return [
                    ...state,
                    {
                        ...state?.[state?.length - 1],
                        x: randomX,
                        y: randomY,
                        duration: parseInt(action?.duration)
                    }
                ]
            }else{
                let angleInRadians = action?.mouseDirection * (Math.PI / 180);
                let changeInX = ((action.currentX+state[state.length - 1].x)) * Math.cos(angleInRadians);
                let changeInY = ((action.currentY+state[state.length - 1].y)) * Math.sin(angleInRadians);
                return [
                    ...state,
                    {
                        ...state?.[state?.length - 1],
                        x: parseInt(state?.[state?.length - 1]?.x) + changeInX,
                        y: parseInt(state?.[state.length - 1]?.y) + changeInY,
                        duration: parseInt(action?.duration), 
                    }
                ]
            }
        case "movePosition":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    x: parseInt(action?.x),
                    y: parseInt(action?.y),
                    duration: 0
                }
            ]
        case "rotateTo":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    rotation: (parseInt(action?.rotation)-90),
                    duration: 0
                }
            ]
        case "mousePoint":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    rotation: parseInt(action?.rotation),
                    duration: 0
                }
            ]
        case "changeX":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    x: state?.[state.length - 1]?.x + parseInt(action?.x),
                    duration: 0
                }
            ]
        case "setX":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    x:parseInt(action?.x),
                    duration: 0
                }
            ]
            case "changeY":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    y: state?.[state.length - 1]?.y + parseInt(action?.y),
                    duration: 0
                }
            ]
        case "setY":
            return [
                ...state,
                {
                    ...state?.[state.length - 1],
                    y:parseInt(action?.y),
                    duration: 0
                }
            ]
        case "flagClicked":
            return [
                ...state
            ]
        case "spriteClick":
            return [
                ...state
            ]
        case "changeSize":
            let prevHeight, prevWidth;
            prevHeight = state?.[state.length - 1]?.spriteHeight;
            prevWidth = state?.[state.length - 1]?.spriteWidth
            return [
                ...state, {
                    ...state?.[state.length - 1],
                    spriteHeight: prevHeight + action?.size,
                    spriteWidth: prevWidth + action?.size
                }
            ]
        case "setSize":
            return [
                ...state, {
                    ...state?.[state.length - 1],
                    spriteHeight: parseInt(action?.size),
                    spriteWidth: parseInt(action?.size)
                }
            ]
    }
}

export default reducer;