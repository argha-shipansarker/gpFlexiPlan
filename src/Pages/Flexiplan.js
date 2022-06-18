import React, { useState, useEffect } from 'react'
import BubbleVariation from "../ReusableComponents/BubbleVariation"

const Flexiplan = () => {
    const bubbleMap = require('../RequiredData/bubble-map.json');
    const selectedBubbles = require('../RequiredData/selected-bubbles.json');
    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    const [bubbleMapState, setBubbleMapState] = useState(null)
    const [eligibleBubbleMapState, setEligibleBubbleMapState] = useState(null)

    function formatBytes(bytes, decimals = 2) {
        if (bytes * 1024 * 1024 === 0) return '0 MB';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes * 1024 * 1024) / Math.log(k));

        return parseFloat(((bytes * 1024 * 1024) / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    useEffect(() => {
        const tempData = Object.entries(bubbleMap).map(([key, value]) => {
            let tempFlexiTypeVariation = []
            let tempFlexiType = null
            let tempFlexiTypeColor = null
            let tempFlexiSerial = null
            let presentSelectedValue = null

            let description = null
            let attributeDescription = null

            switch (key) {
                case "voice":
                    tempFlexiType = "Minutes"
                    tempFlexiSerial = 4
                    tempFlexiTypeColor = "#ee395a"
                    presentSelectedValue = `${selectedBubbles["voice"]} Min`
                    description = "Any Local Number"
                    break;
                case "sms":
                    tempFlexiType = "SMS"
                    tempFlexiSerial = 6
                    tempFlexiTypeColor = "#4abbc3"
                    presentSelectedValue = `${selectedBubbles["sms"]} SMS`
                    break;
                case "bioscope":
                    tempFlexiType = "Bioscope"
                    tempFlexiSerial = 5
                    tempFlexiTypeColor = "#c34ab7"
                    presentSelectedValue = formatBytes(selectedBubbles["bioscope"])
                    description = "Only used to watch Bioscope"
                    break;
                case "fourg":
                    tempFlexiType = "4G Internet"
                    tempFlexiSerial = 3
                    tempFlexiTypeColor = "#76c779"
                    presentSelectedValue = formatBytes(selectedBubbles["fourg"])
                    attributeDescription = "4G Only"
                    description = "4G enabled handset + SIM required"
                    break;
                case "longevity":
                    tempFlexiType = "Validity"
                    tempFlexiSerial = 1
                    tempFlexiTypeColor = "#76c779"
                    presentSelectedValue = `${selectedBubbles["longevity"]} Days`
                    break;
                case "mca":
                    tempFlexiType = "Missed Call Alert"
                    tempFlexiSerial = 7
                    tempFlexiTypeColor = "null"
                    presentSelectedValue = selectedBubbles["mca"]
                    description = "Validity: 30 days"
                    break;
                case "data":
                    tempFlexiType = "Internet"
                    tempFlexiSerial = 2
                    tempFlexiTypeColor = "#76c779"
                    presentSelectedValue = formatBytes(selectedBubbles["data"])
                    attributeDescription = "Regular"
                    break;
            }

            value.map((item) => {
                selectedBubbles[key] == item ? tempFlexiTypeVariation.push(
                    {
                        value: item,
                        selected: true,
                        validityDay: (key == "mca" || key == "longevity") ? true : false,
                        type: key,
                        internet: (key == "data" || key == "fourg" || key == "bioscope") ? formatBytes(item) : null
                    }
                ) : tempFlexiTypeVariation.push(
                    {
                        value: item,
                        selected: false,
                        validityDay: (key == "mca" || key == "longevity") ? true : false,
                        type: key,
                        internet: (key == "data" || key == "fourg" || key == "bioscope") ? formatBytes(item) : null
                    }
                )

            })
            // [key] = temp
            return { flexiType: tempFlexiType, flexiTypeVariation: tempFlexiTypeVariation, flexiTypeSerial: tempFlexiSerial, fexiTypeColor: tempFlexiTypeColor, mainFlexiType: key, presentSelectedValue, attributeDescription, description }
        })
        setBubbleMapState(tempData.sort((a, b) => a.flexiTypeSerial - b.flexiTypeSerial))
    }, [])

    useEffect(() => {
        if (bubbleMapState) {

            let tempFlexiValidityObject = bubbleMapState[0]
            let selectedValidityDay = tempFlexiValidityObject.flexiTypeVariation.find(type => type.selected == true)
            let allDataForSpecficValidityDay = null

            Object.entries(eligibilityMap).forEach(([key, value]) => {
                let keyName = key.split('_')[1]
                if (keyName == selectedValidityDay.value) {
                    allDataForSpecficValidityDay = value
                }
            })

            let tempEligibleBubbleMapState = bubbleMapState.map(flexiData => {
                Object.entries(allDataForSpecficValidityDay).forEach(([key, value]) => {
                    if (flexiData.mainFlexiType == key) {
                        flexiData.flexiTypeVariation.forEach(flexiValue => {
                            if (value.includes(flexiValue.value)) {
                                flexiValue.validityDay = true
                            } else {
                                flexiValue.validityDay = false
                            }
                        })
                    }
                })

                return flexiData
            })

            setEligibleBubbleMapState(tempEligibleBubbleMapState)

        }
    }, [bubbleMapState])


    if (eligibleBubbleMapState == null)
        return null

    return (
        <div className='grid grid-cols-3'>
            <div className='col-span-3 md:col-span-2'>
                <p className='text-4xl pt-10 pb-5 text-center md:text-start'>Flexiplan</p>
                <p className='text-lg mt-1.5 font-bold hidden md:block'>Make your own plan and enjoy great savings! Only for GP Customers</p>
                {
                    eligibleBubbleMapState.map((value, index) => (
                        <div className={`grid grid-cols-3 md:gap-20 pt-6 pb-4 ${index != 1 ? "border-b-1" : ""}`} key={index}>
                            <div className='pr-8 md:pr-0'>
                                <p className='text-xl font-medium'>{value.flexiType}</p>
                                {
                                    value.attributeDescription && <p className='text-lg font-medium mt-1 hidden md:block'>{value.attributeDescription}</p>
                                }
                                <p className='text-xl font-medium mt-1' style={{ color: value.fexiTypeColor }}>{value.presentSelectedValue}</p>
                                {
                                    value.description && <p className='text-base mt-3 text-description'>{value.description}</p>
                                }
                            </div>
                            <div className='col-span-2'>
                                <BubbleVariation value={value.flexiTypeVariation} color={value.fexiTypeColor} eligibleBubbleMapState={eligibleBubbleMapState} setEligibleBubbleMapState={setEligibleBubbleMapState} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Flexiplan



