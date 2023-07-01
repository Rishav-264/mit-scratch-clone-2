import React, {useEffect} from "react";
import { useDrop } from "react-dnd";
import Action from "./Action";

export default function MidArea({actionTree, setActionTree}) {

  const [{isOver}, drop] = useDrop(()=>({
    accept: "action",
    drop: (item) => addActionToTree(item)
  }),[actionTree])

  const addActionToTree = (item) => {
    if(item.initiator === true){
      if(actionTree.length !== 0){
        alert("Initiator blocks only allowed at the beginning of the tree");
      }else{
        if(actionTree?.[0]?.initiator === true){
          alert("Only one initiator block allowed")
        }else{
          setActionTree(prev=>[...prev,item]);
        }
      }
    }else{
      setActionTree(prev=>[...prev,item]);
    }
  }

  return <div className="flex flex-col flex-1 h-full overflow-auto" ref={drop}>
    {actionTree.map((item)=>{
      console.log("ITEMMMM", item);
      return(
        <Action setActionTree={setActionTree} content={item.content} backgroundColor={item.backgroundColor} id={item.id} currentX={item.x} currentY={item.y} currentRotation={item.rotation} currentDuration={item.duration} currentSteps={item.steps} currentSelect={item.select} currentSize={item.size} />
      )
    })}
  </div>;
}
