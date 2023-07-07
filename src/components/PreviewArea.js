import React, {useEffect, useState, useReducer, useRef} from "react";
import CatSprite from "./CatSprite";
import { useAnimate } from "framer-motion";
import reducer from "../utils/reducer";
import Icon from "./Icon";

export default function PreviewArea({actionTree, actionStack, setActionStack, codeBlock}) {

  const [scope, animate] = useAnimate()
  const [startExecution, setStartExecution] = useState(false);
  const [properties, dispatch] = useReducer(reducer, [{
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0,
    steps: 0,
    spriteHeight:  100,
    spriteWidth: 95,
    select: null,
  }])
  const [sequence, setSequence] = useState([]);
  const flagClick = useRef(false);
  const spriteClick = useRef(false);

  const executeTree = async (event) => {
    console.log('EXECUTING TREE');
    setSequence([]);
    setStartExecution(true);
    try{
      createInstructions(event);
    }catch(error){
      console.log("ERROR", error);
    }
  }

  const createInstructions = async (event) => {
    console.log("CREATING INSTRUCTIONS");
    const height = scope.current.clientHeight;
    const width = scope.current.clientWidth;

    const element = scope.current;
    if (!element) return;
  
    const elementRect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;
    const elemX = elementRect.x - parentRect.x;
    const elemY = elementRect.y - parentRect.y;

    const leftBoundary = parentRect.x;
    const rightBoundary = parentRect.x + parentRect.width;
    const topBoundary = parentRect.y;
    const bottomBoundary = parentRect.y + parentRect.height;
  
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  
    const deltaX = mouseX - elementCenterX;
    const deltaY = mouseY - elementCenterY;
  
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    let stack = [];
    for(let i = 0; i < codeBlock.length; i++){
      if(codeBlock[i].actions[0].initiator === true){
        let purifiedActions = codeBlock[i].actions.filter(prev=>prev!=undefined)
        console.log("PURIFED ACTIONS", purifiedActions);
        stack = [...stack, ...purifiedActions];
      }
    }

    console.log('STACK',stack);

    stack.forEach((action)=>{
      dispatch({
        type: action?.type,
        x: action?.x,
        y: action?.y,
        duration: action?.duration,
        rotation: (action?.type === "mousePoint") ? angle : action?.rotation,
        mouseDirection: angle,
        currentX: elemX,
        currentY: elemY,
        steps: action?.steps,
        select: action?.select,
        height: height,
        width: width,
        size: action?.size,
        leftBoundary: leftBoundary,
        rightBoundary: rightBoundary,
        topBoundary: topBoundary,
        bottomBoundary: bottomBoundary
      })
      console.log("PROPERTIESSSS", properties);
    })
  }

  useEffect(()=>{
    console.log("CREATING PROPERTIES");
    console.log('PROPERTIES', properties);
    if(startExecution && Array.isArray(properties)){
      properties.map((property, index)=>{
        console.log(`ITERATION ${index}`, property)
        console.log("Animation Definition", {x: property?.x, y: property?.y, rotate: property?.rotation});
        setSequence(prev=>[...prev , ["svg", {x: property?.x, y: property?.y, rotate: property?.rotation, width: property?.spriteWidth, height: property?.spriteHeight}, {duration: property.duration}]]);
      })
    }
  },[properties,startExecution])

  useEffect(()=>{
    console.log("SEQUENCE", sequence);
    if(sequence?.length === properties?.length && sequence.length !== 0){
      animate(sequence);
      dispatch({
        type:"update"
      })
    }
  },[sequence])

  useEffect(() => {
    if(actionTree?.[0]?.type === "flagClicked"){
      flagClick.current = true;
      spriteClick.current = false;
    }else if(actionTree?.[0]?.type === "spriteClick"){
      flagClick.current = false;
      spriteClick.current = true;
    }else{
      flagClick.current = false;
      spriteClick.current = false;
    }
  }, [actionTree]);


  return (
    <div className="flex-none w-full h-full overflow-y-auto">
      <div className="flex">
      <button onClick={(e)=>{
          if(flagClick.current){
            console.log("ACTION TREE", actionTree);
            executeTree(e)
          }
        }}
        className="p-2 w-fit flex"
      >
          <Icon name="flag" size={20} className="text-green-600 mx-2" />
      </button>
      <span className="text-xs mt-3.5" style={{color:"rgb(148 163 184)"}}>Animations can sometimes take a second to start.</span>
      </div>
      <hr />
    <div 
      className="flex-none w-full h-full overflow-y-auto p-2 relative"
      ref={scope}
    >
      <CatSprite 
        style={{ pointerEvents: "auto" }}
        onClick={(e)=>{
          console.log("CLICKED");
          if(spriteClick.current){
            console.log("ACTION TREE 2", actionTree);
            executeTree(e)
          }
        }} 
      />
    </div>
    </div>
  );
}
