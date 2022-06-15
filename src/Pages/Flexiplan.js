import React, { useState, useEffect } from 'react'
import BubbleVariation from "../ReusableComponents/BubbleVariation"

const Flexiplan = () => {
    const bubbleMap = require('../RequiredData/bubble-map.json');
    const selectedBubbles = require('../RequiredData/selected-bubbles.json');
    const eligibilityMap = require('../RequiredData/eligibility-map.json');

    const [bubbleMapState, setBubbleMapState] = useState(null)
    const [eligibleBubbleMapState, setEligibleBubbleMapState] = useState(null)


    useEffect(() => {
        const tempData = Object.entries(bubbleMap).map(([key, value]) => {
            let tempFlexiTypeVariation = []
            let tempFlexiType = null
            let tempFlexiTypeColor = null
            let tempFlexiSerial = null

            switch (key) {
                case "voice":
                    tempFlexiType = "Minutes"
                    tempFlexiSerial = 4
                    tempFlexiTypeColor = "#ee395a"
                    break;
                case "sms":
                    tempFlexiType = "SMS"
                    tempFlexiSerial = 6
                    tempFlexiTypeColor = "#4abbc3"
                    break;
                case "bioscope":
                    tempFlexiType = "Bioscope"
                    tempFlexiSerial = 5
                    tempFlexiTypeColor = "#c34ab7"
                    break;
                case "fourg":
                    tempFlexiType = "4G Internet"
                    tempFlexiSerial = 3
                    tempFlexiTypeColor = "#76c779"
                    break;
                case "longevity":
                    tempFlexiType = "Validity"
                    tempFlexiSerial = 1
                    tempFlexiTypeColor = "#76c779"
                    break;
                case "mca":
                    tempFlexiType = "Missed Call Alert"
                    tempFlexiSerial = 7
                    tempFlexiTypeColor = "null"
                    break;
                case "data":
                    tempFlexiType = "Internet"
                    tempFlexiSerial = 2
                    tempFlexiTypeColor = "#76c779"
                    break;
            }

            value.map((item) => {
                selectedBubbles[key] == item ? tempFlexiTypeVariation.push({ value: item, selected: true }) : tempFlexiTypeVariation.push({ value: item, selected: false })

            })
            // [key] = temp
            return { flexiType: tempFlexiType, flexiTypeVariation: tempFlexiTypeVariation, flexiTypeSerial: tempFlexiSerial, fexiTypeColor: tempFlexiTypeColor, mainFlexiType: key }
        })
        setBubbleMapState(tempData.sort((a, b) => a.flexiTypeSerial - b.flexiTypeSerial))
    }, [])

    useEffect(() => {
        if (bubbleMapState) {

        }
    }, [bubbleMapState])




    useEffect(() => {
        console.log("shipan", bubbleMapState)
    }, [bubbleMapState])


    if (bubbleMapState == null)
        return null

    return (
        <div className=''>
            <p>Flexiplan</p>
            <p>Make your own plan and enjoy great savings! Only for GP Customers</p>
            {
                bubbleMapState.map((value, index) => (
                    <div className='grid grid-cols-3 gap-20' key={index}>
                        <p>{value.flexiType}</p>
                        <div className='col-span-2'>
                            <BubbleVariation value={value.flexiTypeVariation} color={value.fexiTypeColor} />
                        </div>
                    </div>
                ))
            }



        </div>
    )
}

export default Flexiplan



