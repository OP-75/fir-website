import React, {useState} from "react";

function Hooks(){
    const [count, setCount] = useState(0)

    function handleMinus(){
        // setCount(count-1)
        //avoid using count variable here; instead use this which is better 
        setCount(cnt => cnt-1)
    }

    function handlePlus(){
        setCount(cnt => cnt+1)
    }

    return (
        <>
        <button id="minus" onClick={handleMinus}>-</button>
        <span>{count}</span>
        <button id="plus"onClick={handlePlus}>+</button>
        </>
    )
}

export {Hooks}