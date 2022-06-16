import React, { useState, useEffect } from "react";

const BubbleVariation = ({ value, color, eligibleBubbleMapState, setEligibleBubbleMapState }) => {

    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    // useEffect(() => {
    //     console.log("argha", value);
    // }, []);

    const handleClick = (flexiData) => {
        // let tempFlexiValidityObject = eligibleBubbleMapState[0]
        // let selectedValidityDay = tempFlexiValidityObject.flexiTypeVariation.find(type => type.selected == true)
        // // console.log("saimum", selectedValidityDay)
        // let allDataForSpecficValidityDay = null

        // Object.entries(eligibilityMap).forEach(([key, value]) => {
        //     let keyName = key.split('_')[1]
        //     if(keyName == selectedValidityDay.value){
        //         allDataForSpecficValidityDay = value
        //     }
        // })

        // let eligibleBubbleMapState = bubbleMapState.map(flexiData => {
        //     Object.entries(allDataForSpecficValidityDay).forEach(([key, value]) => {
        //         if(flexiData.mainFlexiType == key){
        //             flexiData.flexiTypeVariation.forEach(flexiValue => {
        //                 if(value.includes(flexiValue.value)){
        //                     flexiValue.validityDay = true
        //                 }else{
        //                     flexiValue.validityDay = false
        //                 }
        //             })
        //         }
        //     })

        //     return flexiData
        // })

        // setEligibleBubbleMapState(eligibleBubbleMapState)

        if(flexiData.type == "longevity")
        {
            let tempFlexiValidityObject = eligibleBubbleMapState[0]
            tempFlexiValidityObject.flexiTypeVariation.forEach(type => type.value == flexiData.value ? type.selected = true: type.selected = false)
            console.log("saimum", tempFlexiValidityObject)
            

        let tempFlexiValidityObjectAfterClicked = eligibleBubbleMapState[0]
        let selectedValidityDay = tempFlexiValidityObjectAfterClicked.flexiTypeVariation.find(type => type.selected == true)
        // console.log("saimum", selectedValidityDay)
        let allDataForSpecficValidityDay = null
        Object.entries(eligibilityMap).forEach(([key, value]) => {
            let keyName = key.split('_')[1]
            if(keyName == selectedValidityDay.value){
                allDataForSpecficValidityDay = value
            }
        })

        let tempEligibleBubbleMapState = eligibleBubbleMapState.map(flexiData => {
            Object.entries(allDataForSpecficValidityDay).forEach(([key, value]) => {
                if(flexiData.mainFlexiType == key){
                    flexiData.flexiTypeVariation.forEach((flexiValue, index) => {
                        if(value.includes(flexiValue.value)){
                            flexiValue.validityDay = true
                        }else{
                            flexiValue.validityDay = false
                        }
                        if(index == 0){
                            flexiValue.selected = true
                        }else {
                            flexiValue.selected = false
                        }
                    })
                }
            })

            return flexiData
        })

        setEligibleBubbleMapState(tempEligibleBubbleMapState)
        
        }

        // eligibleBubbleMapState.forEach(flexiData => {
        //     if(flexiData.mainFlexiType == value.type){

        //     }
        // })

        console.log("sarker", flexiData)
    }

    return (
        <div className="flex flex-wrap">
            {
                value.map((value, index) => (
                    <button 
                    className={`h-20 w-20 rounded-full border-2 flex justify-center items-center`} 
                    style={{ backgroundColor: value.selected ? color : "white", cursor: value.validityDay ? "pointer" : "not-allowed" }}
                    disabled={!value.validityDay}
                    onClick={() => handleClick(value)}
                    >
                        <p style={{ color: value.selected ? "white" : "black" }}>{value.value}</p>
                    </button>
                ))
            }
        </div>
    );
};

export default BubbleVariation;
