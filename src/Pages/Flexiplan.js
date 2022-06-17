import React, { useState, useEffect } from 'react'
import BubbleVariation from "../ReusableComponents/BubbleVariation"

const Flexiplan = () => {
    const bubbleMap = require('../RequiredData/bubble-map.json');
    const selectedBubbles = require('../RequiredData/selected-bubbles.json');
    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    const [bubbleMapState, setBubbleMapState] = useState(null)
    const [eligibleBubbleMapState, setEligibleBubbleMapState] = useState(null)

    function formatBytes(bytes, decimals = 2) {
        if (bytes*1024*1024 === 0) return '0 MB';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes*1024*1024) / Math.log(k));
    
        return parseFloat(((bytes*1024*1024) / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    useEffect(() => {
        const tempData = Object.entries(bubbleMap).map(([key, value]) => {
            let tempFlexiTypeVariation = []
            let tempFlexiType = null
            let tempFlexiTypeColor = null
            let tempFlexiSerial = null
            let presentSelectedValue = null

            switch (key) {
                case "voice":
                    tempFlexiType = "Minutes"
                    tempFlexiSerial = 4
                    tempFlexiTypeColor = "#ee395a"
                    presentSelectedValue = `${selectedBubbles["voice"]} Min`
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
                    break;
                case "fourg":
                    tempFlexiType = "4G Internet"
                    tempFlexiSerial = 3
                    tempFlexiTypeColor = "#76c779"
                    presentSelectedValue = formatBytes(selectedBubbles["fourg"])
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
                    break;
                case "data":
                    tempFlexiType = "Internet"
                    tempFlexiSerial = 2
                    tempFlexiTypeColor = "#76c779"
                    presentSelectedValue = formatBytes(selectedBubbles["data"])
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
            return { flexiType: tempFlexiType, flexiTypeVariation: tempFlexiTypeVariation, flexiTypeSerial: tempFlexiSerial, fexiTypeColor: tempFlexiTypeColor, mainFlexiType: key, presentSelectedValue }
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
                if(keyName == selectedValidityDay.value){
                    allDataForSpecficValidityDay = value
                }
            })

            let tempEligibleBubbleMapState = bubbleMapState.map(flexiData => {
                Object.entries(allDataForSpecficValidityDay).forEach(([key, value]) => {
                    if(flexiData.mainFlexiType == key){
                        flexiData.flexiTypeVariation.forEach(flexiValue => {
                            if(value.includes(flexiValue.value)){
                                flexiValue.validityDay = true
                            }else{
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

    useEffect(() => {
        console.log("manto", eligibleBubbleMapState)
    }, [eligibleBubbleMapState])


    if (eligibleBubbleMapState == null)
        return null

    return (
        <div className='png-base64'>
            <p className='text-4xl pt-10 pb-5'>Flexiplan</p>
            <p className='text-lg mt-1.5 font-bold'>Make your own plan and enjoy great savings! Only for GP Customers</p>
            <div className='grid grid-cols-3'>
                <div className='col-span-2'>
                {
                eligibleBubbleMapState.map((value, index) => (
                    <div className='grid grid-cols-3 gap-20 pt-6' key={index}>
                        <div>
                        <p className='text-xl font-medium'>{value.flexiType}</p>
                        <p className='text-xl font-medium' style={{color: value.fexiTypeColor}}>{value.presentSelectedValue}</p>
                        </div>
                        <div className='col-span-2'>
                            <BubbleVariation value={value.flexiTypeVariation} color={value.fexiTypeColor} eligibleBubbleMapState={eligibleBubbleMapState} setEligibleBubbleMapState={setEligibleBubbleMapState} />
                        </div>
                    </div>
                ))
            }
                </div>
            </div>



        </div>
    )
}

export default Flexiplan



