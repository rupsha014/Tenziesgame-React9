import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div
            className="p-7 mt-3 mb-5 shadow-lg h-3 w-3 flex justify-center items-center cursor-pointer rounded-lg  bg-slate-100 font-bold text-lg"
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="">{props.value}</h2>
        </div>
    )
}