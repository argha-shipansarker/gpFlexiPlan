import React, { useState, useEffect } from "react";

const BubbleVariation = ({ value, color, eligibleBubbleMapState, setEligibleBubbleMapState }) => {

    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    const gettingPresentSelectedValue = (value) => {
        let name = null
        switch (value.type) {
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
        return name
    }

    const handleClick = (flexiData) => {

        if (flexiData.type == "longevity") {
            let tempFlexiValidityObject = eligibleBubbleMapState[0]
            tempFlexiValidityObject.flexiTypeVariation.forEach(type => type.value == flexiData.value ? type.selected = true : type.selected = false)
            tempFlexiValidityObject.presentSelectedValue = `${flexiData.value} Days`

            let tempFlexiValidityObjectAfterClicked = eligibleBubbleMapState[0]
            let selectedValidityDay = tempFlexiValidityObjectAfterClicked.flexiTypeVariation.find(type => type.selected == true)
            let allDataForSpecficValidityDay = null
            Object.entries(eligibilityMap).forEach(([key, value]) => {
                let keyName = key.split('_')[1]
                if (keyName == selectedValidityDay.value) {
                    allDataForSpecficValidityDay = value
                }
            })

            let tempEligibleBubbleMapState = eligibleBubbleMapState.map(flexiData => {
                Object.entries(allDataForSpecficValidityDay).forEach(([key, value]) => {
                    if (flexiData.mainFlexiType == key) {
                        flexiData.flexiTypeVariation.forEach((flexiValue, index) => {
                            if (value.includes(flexiValue.value)) {
                                flexiValue.validityDay = true
                            } else {
                                flexiValue.validityDay = false
                            }
                        })

                        //setting a RANDOM variation of the FlexiType Attributes Initially True when longevity/Validity Field is Changed. 



                        let validityFlexiTypeData = flexiData.flexiTypeVariation.filter(flexiValue => flexiValue.validityDay == true)

                        let randomNumber = Math.floor(Math.random() * validityFlexiTypeData.length)

                        let randomValidityFlexiTypeValue = validityFlexiTypeData[randomNumber]

                        randomValidityFlexiTypeValue.selected = true
                        flexiData.presentSelectedValue = gettingPresentSelectedValue(randomValidityFlexiTypeValue)

                        flexiData.flexiTypeVariation.forEach((flexiValue, index) => {
                            if (flexiValue.value != validityFlexiTypeData[randomNumber].value) {
                                flexiValue.selected = false
                            }
                        })
                    }
                })

                return flexiData
            })

            setEligibleBubbleMapState(tempEligibleBubbleMapState)

        } else {
            let tempFlexiValidityObject = [...eligibleBubbleMapState]

            tempFlexiValidityObject.forEach(flexiValue => {
                if (flexiValue.mainFlexiType == flexiData.type) {
                    flexiValue.flexiTypeVariation.forEach(type => {
                        if (type.value == flexiData.value) {
                            type.selected = true
                            flexiValue.presentSelectedValue = gettingPresentSelectedValue(type)
                        } else {
                            type.selected = false
                        }
                    })
                }
            })

            setEligibleBubbleMapState(tempFlexiValidityObject)

        }

    }

    const handleBackgroundColor = value => {
        if (value.selected) {
            return `bg-[${color}]`
        } else {
            if (value.validityDay) {
                return "bg-white"
            } else {
                return "bg-[#f5f5f5]"
            }
        }
    }

    const manto = (value) => {
        let name = null
        let textColor = `hover:text-white`
        if (value.validityDay) {
            switch (value.type) {
                case "data":
                    name = `hover:bg-internet`
                    break;
                case "fourg":
                    name = `hover:bg-internet`
                    break;
                case "voice":
                    name = `hover:bg-minutes`
                    break;
                case "bioscope":
                    name = `hover:bg-bioscope`
                    break;
                case "sms":
                    name = `hover:bg-sms`
                    break;
                case "longevity":
                    name = `hover:bg-validity`
                    break;
            }
        } else {
            name = `hover:bg-[#f5f5f5]`
            textColor = `hover:text-black`
        }
        return `${name} ${textColor}`
    }

    return (
        <div className="flex flex-wrap">
            {
                value.map((value, index) => (
                    <button
                        className={`h-12 w-12 md:h-14 md:w-14 rounded-full border-2 flex justify-center items-center text-xxs md:text-xs ml-2 mb-2 md:ml-4 md:mb-3 font-telenor ${handleBackgroundColor(value)} ${manto(value)} ${value.selected ? "text-white" : "text-black"}`}
                        style={{ cursor: value.validityDay ? "pointer" : "not-allowed", backgroundColor: value.selected ? color : "" }}
                        disabled={!value.validityDay}
                        onClick={() => handleClick(value)}
                        key={index}
                    >
                        <span className={``}>{value.internet ? value.internet : value.value}</span>
                    </button>
                ))
            }
        </div>
    );
};

export default BubbleVariation;
