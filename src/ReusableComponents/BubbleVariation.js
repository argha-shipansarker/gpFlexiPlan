import React, { useState, useEffect } from "react";

const BubbleVariation = ({ value, color }) => {

    // useEffect(() => {
    //     console.log("argha", value);
    // }, [value]);

    return (
        <div className="flex flex-wrap">
            {
                value.map((value, index) => (
                    <button className={`h-20 w-20 rounded-full border-2 flex justify-center items-center`} style={{ backgroundColor: value.selected ? color : "white" }}>
                        <p style={{ color: value.selected ? "white" : "black" }}>{value.value}</p>
                    </button>
                ))
            }
        </div>
    );
};

export default BubbleVariation;
