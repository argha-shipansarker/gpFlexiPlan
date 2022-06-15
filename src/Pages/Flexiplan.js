import React, {useState, useEffect} from 'react'
import BubbleVariation from "../ReusableComponents/BubbleVariation"

const Flexiplan = () => {
    const bubbleMap = require('../RequiredData/bubble-map.json');
    const selectedBubbles = require('../RequiredData/selected-bubbles.json');

    const [bubbleMapState, setBubbleMapState] = useState(null)


    useEffect(() => {
        const tempData = Object.entries(bubbleMap).map(([key, value]) => {
            let temp = []
            value.map((item) => {
                selectedBubbles[key] == item ? temp.push({value:item, selected:true}) : temp.push({value:item, selected:false})
                
            })
            // [key] = temp
            return {value: temp, type: key }
        })
        console.log("manto", tempData)
        setBubbleMapState(tempData)
}, [])

    useEffect(() => {
        console.log("shipan", bubbleMapState)
    }, [bubbleMapState])
    //     useEffect(() => {
    //     console.log("shipan", bubbleMap)
    // }, [bubbleMap])
    if(bubbleMapState == null)
        return null
  return (
    <div className=''>
        <p>Flexiplan</p>
        <p>Make your own plan and enjoy great savings! Only for GP Customers</p>
        {
    bubbleMapState.map((value, index) => (
        <div className='grid grid-cols-3 gap-20' key={index}>
            <p>{value.type}</p>
            <div className='col-span-2'>
            {/* {
                value.map((value, index) => (
                    <div key={index}>
                        <BubbleVariation value={value}/>
                    </div>
                ))
            } */}
            <BubbleVariation value={value.value}/>
            </div>
        </div>
    ))
}



    </div>
  )
}

export default Flexiplan



