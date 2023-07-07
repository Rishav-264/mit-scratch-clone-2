import React, { useEffect, useState, useCallback, useRef } from "react";
import Icon from "./Icon";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

const Action = ({ 
    elemPosition,
    content, 
    backgroundColor, 
    isDraggable, 
    setActionTree, 
    id, 
    currentRotation,
    currentSelect, 
    currentX, 
    currentY, 
    currentDuration, 
    currentSteps,
    currentSize,
    removeAction,
    blockId,
    actionId
}) => {

  const elemRef = useRef();

  const [elements, setElements] = useState([]);
  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  const [duration, setDuration] = useState("0");
  const [rotation, setRotation] = useState("0");
  const [select, setSelect] = useState("random-position");
  const [steps, setSteps] = useState(0);
  const [size, setSize] = useState(10);
  const [dropPosition, setDropPosition] = useState();

  const [{isDragging, position}, drag] = useDrag(()=>({
    type:"action",
    item: {
        id: uuidv4(),
        content:content,
        backgroundColor: backgroundColor,
        isDraggable: false,
        x: x,
        y: y,
        duration: duration,
        rotation: rotation,
        steps: steps,
        select: select,
        size: size,
        type: content?.type,
        initiator: content?.initiator,
        position: null
    },
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        position: monitor.getClientOffset(),
    }),
  }),[x,y,duration,rotation,steps,select,size,position]);

//   const handleDrag = useCallback(() => {
//     setDropPosition(position);
//     console.log('FIRED');
//     if (drag.isDragging) {
//         console.log('Dragging in progress', elemRef.current);
//       }
//   }, [position]);

  useEffect(() => {
    setElements(content?.text?.split(" "));
    if(currentX!==undefined){
        setX(currentX);
    }else{
        setX("10");
    }

    if(currentY!==undefined){
        setY(currentY);
    }else{
        setY("10");
    }

    if(currentDuration!==undefined){
        setDuration(currentDuration);
    }else{
        setDuration("0");
    }

    if(currentRotation!==undefined){
        console.log("HERE", currentRotation);
        setRotation(currentRotation);
    }else{
        setRotation("0");
    }

    if(currentSteps!==undefined){
        setSteps(currentSteps);
    }else{
        setSteps(10);
    }
    if(currentSelect !== undefined){
        setSelect(currentSelect);
    }else{
        setSelect("random-position");
    }
    if(currentSize !== undefined){
        setSize(currentSize);
    }else{
        setSize(10);
    }
  }, []);

  useEffect(()=>{
    console.log("ELEM POSITION OMG", elemPosition);
  },[elemPosition])

  const handleDrag = () => {
    if(isDragging){
        document.addEventListener('mousemove', handleMouseMove);
    }else{
        document.removeEventListener('mousemove');
    }
  }

  function handleMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  
    // Use mouseX and mouseY as needed
    console.log('Mouse X:', mouseX);
    console.log('Mouse Y:', mouseY);
  }

  return (
    <div
      className="flex rounded flex-row flex-shrink-0 flex-grow-0 flex-wrap items-center text-white px-2 py-1 text-sm"
      style={{ cursor:isDraggable ? "grab" : "auto", backgroundColor: backgroundColor, border: isDragging ? "1px solid black" : "none",margin: (id===undefined) ? "0.125rem 0" : "0" }}
      ref={isDraggable ? drag : elemRef}
    //   onDrag={handleDrag}
    >
      {elements?.map((elem, index) => (
        <div key={index}>
            {" "}
            {elem.includes("/input") === false && elem !== "/icon" && elem !=="/select" && <span className="mx-0.5">{elem}</span>}
            {" "}
            {elem.includes("/input") && 
                <input
                    key={elem}
                    type="text"
                    disabled={(id!==undefined)?true:false}
                    value={elem.includes("x")?x:elem.includes("y")?y:elem.includes("d")?duration:elem.includes("r")?rotation:elem.includes("s")?steps:elem?.includes("h")?size: null }
                    onChange={(e) => {
                        if(elem.includes("x") && id===undefined){
                            setX(e.target.value);
                        }
                        if(elem.includes("y") && id===undefined){
                            setY(e.target.value);
                        }
                        if(elem.includes("d") && id===undefined){
                            setDuration(e.target.value);
                        }
                        if(elem.includes("r") && id===undefined){
                            setRotation(e.target.value);
                        }
                        if(elem.includes("s") && id===undefined){
                            setSteps(e.target.value);
                        }
                        if(elem.includes("h") && id===undefined){
                            setSize(e.target.value);
                        }
                    }}
                    className="h-fit w-1/8 flex-shrink-0 rounded-full flex mx-1.5 text-black text-center text-2xs focus:ring-blue-500 focus:outline-none"
                    style={{ height: "fit-content" }}
                    placeholder="10"
                />
            }
            {" "}
            {elem === "/icon" && <Icon name={content?.iconName} size={15} className={content?.colorClass + " mx-2"} />}
            {" "}
            {elem === "/select" && (
            <div className="relative mx-1.5">
                <select 
                onChange={(e)=>{
                    if(id === undefined){
                        setSelect(e.target.value);
                    }
                }} 
                disabled={(id!==undefined)?true:false}
                value={select}
                className="appearance-none pr-4 pl-1 text-xs w-full text-black leading-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {content?.selectOptions?.map((option)=>{
                        return (
                            <option className="text-xs" value={option}>{option}</option>
                        )
                    })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 8l4 4 4-4H6z" />
                    </svg>
                </div>
            </div>)}
            {" "}
        </div>
      ))}
      {/* {(id!==undefined) && 
        <div 
            className="ml-auto cursor-pointer"
            onClick={()=>{
                setActionTree(prev=>prev.filter(elem=>elem.id!==id));
                console.log("ACTION ID", actionId);
                console.log("BLOCK ID", blockId);
                removeAction(actionId, blockId)
            }}
        >
            <Icon name="trash" size={15} className="text-slate-600 mx-2" />
        </div>
      } */}
    </div>
  );
};

export default Action;