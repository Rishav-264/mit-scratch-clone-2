import React from "react";

const Input = () => {
    return (
        <input 
            type="text" 
            className="h-fit w-1/8 flex-shrink-0 rounded-full mx-1.5 text-black text-center text-2xs focus:ring-blue-500 focus:outline-none"
            style={{height:"fit-content"}}
            placeholder="10"
        >
        </input>
    )
} 

export default Input;