import React, { useEffect } from "react";
import Action from "./Action";

const CodeBlock = ({block, setActionTree, setActionStack, removeAction}) => {

    useEffect(()=>{
        console.log("BLOCK IN CODE BLOCK COMPONENT", block);
    },[block])

    return (
        <div 
            key={block?.id} 
            style={{position:"absolute", left: block?.actions[0]?.position.x-80, top: block?.actions[0]?.position.y}}
            onClick={()=>{
                console.log("CLICKED BISH");
                setActionStack(block.actions)
            }}
        >
            {block?.actions.map((elem)=>{
                if(elem!==undefined){
                    return (
                        <Action 
                            elemPosition={elem.position} 
                            setActionTree={setActionTree} 
                            content={elem.content} 
                            backgroundColor={elem.backgroundColor} 
                            id={elem.id} 
                            currentX={elem.x} 
                            currentY={elem.y} 
                            currentRotation={elem.rotation} 
                            currentDuration={elem.duration} 
                            currentSteps={elem.steps} 
                            currentSelect={elem.select}
                            currentSize={elem.size} 
                            removeAction={removeAction}
                            blockId={block.id}
                            actionId={elem.id}
                        />
                    )
                }
            })}
        </div>
    )
}

export default CodeBlock;