import React, { useState, useEffect } from "react";

const BubbleVariation = ({ value }) => {
    useEffect(() => {
        console.log("argha", value);
    }, [value]);
    return (
        <div className="flex flex-wrap">
            {
                value.map((value, index) => (
                    <div className="h-20 w-20 rounded-full border-2 flex justify-center items-center">
                        <p>{value.value}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default BubbleVariation;
