import React, { useState, useEffect } from 'react'
import BubbleVariation from "../ReusableComponents/BubbleVariation"
import ReactSwitch from "../ReusableComponents/ReactSwitch"
import { FaRedoAlt } from 'react-icons/fa';

const Flexiplan = () => {
    const bubbleMap = require('../RequiredData/bubble-map.json');
    const selectedBubbles = require('../RequiredData/selected-bubbles.json');
    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    const [bubbleMapState, setBubbleMapState] = useState(null)
    const [eligibleBubbleMapState, setEligibleBubbleMapState] = useState(null)
    const [loading, setLoading] = useState(false)

    function formatBytes(bytes, decimals = 2) {
        if (bytes * 1024 * 1024 === 0) return '0 MB';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes * 1024 * 1024) / Math.log(k));

        return parseFloat(((bytes * 1024 * 1024) / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const handleSettingBubbleMapState = () => {
        const tempData = Object.entries(bubbleMap).map(([key, value]) => {
            let flexiTypeVariation = []
            let flexiType = null
            let fexiTypeColor = null
            let flexiTypeSerial = null
            let presentSelectedValue = null

            let description = null
            let attributeDescription = null

            switch (key) {
                case "voice":
                    flexiType = "Minutes"
                    flexiTypeSerial = 4
                    fexiTypeColor = "#ee395a"
                    presentSelectedValue = `${selectedBubbles["voice"]} Min`
                    description = "Any Local Number"
                    break;
                case "sms":
                    flexiType = "SMS"
                    flexiTypeSerial = 6
                    fexiTypeColor = "#4abbc3"
                    presentSelectedValue = `${selectedBubbles["sms"]} SMS`
                    break;
                case "bioscope":
                    flexiType = "Bioscope"
                    flexiTypeSerial = 5
                    fexiTypeColor = "#c34ab7"
                    presentSelectedValue = formatBytes(selectedBubbles["bioscope"])
                    description = "Only used to watch Bioscope"
                    break;
                case "fourg":
                    flexiType = "4G Internet"
                    flexiTypeSerial = 3
                    fexiTypeColor = "#76c779"
                    presentSelectedValue = formatBytes(selectedBubbles["fourg"])
                    attributeDescription = "4G Only"
                    description = "4G enabled handset + SIM required"
                    break;
                case "longevity":
                    flexiType = "Validity"
                    flexiTypeSerial = 1
                    fexiTypeColor = "#76c779"
                    presentSelectedValue = `${selectedBubbles["longevity"]} Days`
                    break;
                case "mca":
                    flexiType = "Missed Call Alert"
                    flexiTypeSerial = 7
                    fexiTypeColor = "null"
                    presentSelectedValue = selectedBubbles["mca"]
                    description = "Validity: 30 days"
                    break;
                case "data":
                    flexiType = "Internet"
                    flexiTypeSerial = 2
                    fexiTypeColor = "#76c779"
                    presentSelectedValue = formatBytes(selectedBubbles["data"])
                    attributeDescription = "Regular"
                    break;
            }

            value.map((item) => {
                let data = {
                    value: item,
                    validityDay: (key == "mca" || key == "longevity") ? true : false,
                    type: key,
                    internet: (key == "data" || key == "fourg" || key == "bioscope") ? formatBytes(item) : null
                }
                selectedBubbles[key] == item ? flexiTypeVariation.push(
                    {
                        ...data,
                        selected: true,
                    }
                ) : flexiTypeVariation.push(
                    {
                        ...data,
                        selected: false,
                    }
                )
            })

            return { flexiType, flexiTypeVariation, flexiTypeSerial, fexiTypeColor, mainFlexiType: key, presentSelectedValue, attributeDescription, description }
        })
        setBubbleMapState(tempData.sort((a, b) => a.flexiTypeSerial - b.flexiTypeSerial))
    }


    useEffect(() => {
        handleSettingBubbleMapState()
    }, [])

    useEffect(() => {
        if (bubbleMapState) {

            let selectedValidityDay = bubbleMapState[0].flexiTypeVariation.find(type => type.selected == true)
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
            setLoading(false)

        }
    }, [bubbleMapState])

    const handleReset = () => {
        setLoading(true)
        setTimeout(() => {
            handleSettingBubbleMapState()
        }, 500);
    }

    if (eligibleBubbleMapState == null)
        return null

    return (
        <div className='grid grid-cols-3'>
            <div className='col-span-3 md:col-span-2 mb-20'>
                <div className='flex justify-between pt-10 pb-5'>
                <p className='text-4xl font-telenor'>Flexiplan</p>
                <div className='flex md:mr-2'>
                    <FaRedoAlt className={`mt-3.5 mr-2 ${loading ? "animate-spin" : ""}`}/>
                    <p className='text-lg font-telenor mt-2 cursor-pointer' onClick={handleReset}>Reset</p>
                </div>
                </div>
                
                <p className='text-lg mt-1.5 font-telenor hidden md:block'>Make your own plan and enjoy great savings! Only for GP Customers</p>
                {
                    eligibleBubbleMapState.map((value, index) => (
                        <div className={`grid grid-cols-3 md:gap-16 pt-6 pb-4 ${index != 1 ? "border-b-1" : ""}`} key={index}>
                            <div className='pr-8 md:pr-0'>
                                <p className='text-xl font-telenor'>{value.flexiType}</p>
                                {
                                    value.attributeDescription && <p className='text-lg font-telenor mt-1 hidden md:block'>{value.attributeDescription}</p>
                                }
                                {
                                    value.mainFlexiType != "mca" && <p className='text-xl font-telenor mt-1 transition duration-300' style={{ color: value.fexiTypeColor }}>{value.presentSelectedValue}</p>
                                }
                                {
                                    value.description && <p className='text-base mt-3 text-description font-telenor'>{value.description}</p>
                                }
                            </div>
                            {
                                value.mainFlexiType == "mca" ? (
                                    <div className='col-span-2 flex justify-end pr-4'>
                                        <ReactSwitch
                                            eligibleBubbleMapState={eligibleBubbleMapState}
                                            setEligibleBubbleMapState={setEligibleBubbleMapState}
                                        />
                                    </div>
                                ) : (
                                    <div className='col-span-2'>
                                        <BubbleVariation value={value.flexiTypeVariation} color={value.fexiTypeColor} eligibleBubbleMapState={eligibleBubbleMapState} setEligibleBubbleMapState={setEligibleBubbleMapState} />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Flexiplan



