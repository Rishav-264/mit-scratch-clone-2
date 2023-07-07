import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import Action from "./Action";
import CodeBlock from "./CodeBlock";

import { v4 as uuidv4 } from 'uuid';

export default function MidArea({actionTree, setActionTree, codeBlock, setCodeBlock, setActionStack}) {

  const [{isOver}, drop] = useDrop(()=>({
    accept: "action",
    drop: (item, monitor) => {
      let check = true;
      let closestAction;
      let distance = 999999999;
      let pos = monitor.getClientOffset();
      console.log("DROP POSITION", monitor.getClientOffset());
      let blockId = uuidv4();
      if(actionTree.length === 0){
        setCodeBlock([...codeBlock,{
          id: blockId,
          actions: [{...item, position: pos}]
        }])
      }
      actionTree.forEach((action,index)=>{
        if(Math.abs(action.position.y - pos.y) < distance){
          closestAction = action;
          let dx = action.position.x - pos.x;
          let dy = action.position.y - pos.y;
          distance = Math.sqrt(dx * dx + dy * dy);
        }
        if(index === actionTree.length - 1){
          if(distance < 80){
            let temp = codeBlock;
            for(let i = 0; i<codeBlock.length; i++){
              if(closestAction.blockId === codeBlock[i].id){
                blockId = closestAction.blockId;
                temp[i].actions.push({...item, position: pos});
              }
              if(i === codeBlock.length -1 ){
                console.log('CLOSEST ACTION', closestAction);
                console.log('CLOSEST ACTION DISTANCE', distance);
                if(item.initiator === true){
                  alert("Initiator blocks only allowed at the beginning");
                  check = false;
                }else{
                  setCodeBlock(temp);
                }
              }
            }
          }else{
            setCodeBlock([...codeBlock,{
              id: blockId,
              actions: [{...item, position: pos}]
            }])
          }
        }
      })
      if(check === true){
        addActionToTree({...item, position: pos, blockId: blockId});
      }
    }
  }),[actionTree, codeBlock])

  useEffect(()=>{
    console.log("CODE BLOCK");
  },[codeBlock])

  const addActionToTree = (item) => {
    setActionTree(prev=>[...prev,item]);
  }

  const removeAction = (actionId, blockId) => {
    let updatedCodeBlock;
    let res1 = codeBlock.filter(prev=>prev.id===blockId)
    console.log("CODE BLOCK####################", res1);
    if(res1[0].actions.length === 1){
      updatedCodeBlock = codeBlock.filter(prev=>prev.id!==blockId);
    }else{
      updatedCodeBlock = codeBlock.filter((prev)=>{
        console.log("PREV", prev)
        return {
          ...prev,
          actions: prev?.actions?.filter((action)=>{
            if(action?.id!==actionId){
              return action
            }
          })
        }
      })
    }
    console.log("THE RESULTTTTT", updatedCodeBlock);
    setCodeBlock(updatedCodeBlock);
    // setCodeBlock((prev)=>{
    //   console.log("PREV", prev)
    //   return {
    //     ...prev,
    //     actions: prev?.actions?.map((action)=>{
    //       if(action.id!==actionId){
    //         return action
    //       }
    //     })
    //   }
    // })
  }

  return <div className="flex flex-col flex-1 h-full overflow-auto" ref={drop}>
    {codeBlock.map((block)=>{
      console.log("BLOCKKKK", block);
      return (
        <CodeBlock block={block} setActionTree={setActionTree} setActionStack={setActionStack} removeAction={removeAction}/>
      )
    })}
  </div>;
}
