import React, { useState, useEffect } from "react";

const BubbleVariation = ({ value, color, eligibleBubbleMapState, setEligibleBubbleMapState }) => {

    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    const gettingPresentSelectedValue = (value) => {
        let name = null
        switch(value.type){
            case "data":
                name = value.internet
                break;
            case "fourg":
                name = value.internet
                break;
            case "voice":
                name = `${value.value} Min`
                break;
            case "bioscope":
                name = value.internet
                break;
            case "sms":
                name = `${value.value} SMS`
                break;
        }
        console.log("sarker", value)
        return name
    }

    const handleClick = (flexiData) => {

        if(flexiData.type == "longevity")
        {
            let tempFlexiValidityObject = eligibleBubbleMapState[0]
            tempFlexiValidityObject.flexiTypeVariation.forEach(type => type.value == flexiData.value ? type.selected = true: type.selected = false)
            tempFlexiValidityObject.presentSelectedValue = `${flexiData.value} Days`

            let tempFlexiValidityObjectAfterClicked = eligibleBubbleMapState[0]
            let selectedValidityDay = tempFlexiValidityObjectAfterClicked.flexiTypeVariation.find(type => type.selected == true)
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
                                flexiData.presentSelectedValue = gettingPresentSelectedValue(flexiValue)
                            }else {
                                flexiValue.selected = false
                            }
                        })
                    }
                })

                return flexiData
            })

            setEligibleBubbleMapState(tempEligibleBubbleMapState)
        
        } else{
                let tempFlexiValidityObject = [...eligibleBubbleMapState]

                tempFlexiValidityObject.forEach(flexiValue => {
                if(flexiValue.mainFlexiType == flexiData.type){
                    flexiValue.flexiTypeVariation.forEach(type => {
                        if(type.value == flexiData.value){
                            type.selected = true 
                            flexiValue.presentSelectedValue = gettingPresentSelectedValue(type)
                        } else{
                            type.selected = false
                        }
                    })
                }
            })

            setEligibleBubbleMapState(tempFlexiValidityObject)

        }

    }

    const handleBackgroundColor = value => {
        if(value.selected){
            return color
        }else {
            if(value.validityDay){
                return "white"
            }else {
                return "#f5f5f5"
            }
        }
    }

    return (
        <div className="flex flex-wrap">
            {
                value.map((value, index) => (
                    <button 
                    className={`h-14 w-14 rounded-full border-2 flex justify-center items-center text-xs ml-4 mb-3`} 
                    style={{ backgroundColor: handleBackgroundColor(value), cursor: value.validityDay ? "pointer" : "not-allowed" }}
                    disabled={!value.validityDay}
                    onClick={() => handleClick(value)}
                    >
                        <span style={{ color: value.selected ? "white" : "black" }}>{value.internet ? value.internet : value.value}</span>
                    </button>
                ))
            }
        </div>
    );
};

export default BubbleVariation;
