import React, { useState, useEffect } from 'react'
import Switch from "react-switch";

const ReactSwitch = ({ eligibleBubbleMapState, setEligibleBubbleMapState }) => {

    const [mcaValue, setMcaValue] = useState(null)

    useEffect(() => {
        const tempMcaValue = eligibleBubbleMapState[eligibleBubbleMapState.length - 1].flexiTypeVariation.find(flexiType => flexiType.selected == true)
        setMcaValue(tempMcaValue)

    }, [eligibleBubbleMapState])

    const handleSwitch = () => {
        eligibleBubbleMapState[eligibleBubbleMapState.length - 1].flexiTypeVariation.forEach(flexiType => flexiType.selected == true ? flexiType.selected = false : flexiType.selected = true)
        setEligibleBubbleMapState(eligibleBubbleMapState)
        setMcaValue({
            ...mcaValue,
            value: !mcaValue.value
        })
    }

    if (mcaValue == null)
        return null

    return (
        <div>
            <Switch
                onChange={handleSwitch}
                checked={mcaValue.value}
                onColor="#86d3ff"
                offColor='#ccc'
                onHandleColor="#2693e6"
                handleDiameter={20}
                height={14}
                width={34}
                className="react-switch"
                id="material-switch"
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            />
        </div>
    )
}

export default ReactSwitch