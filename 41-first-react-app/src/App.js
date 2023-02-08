import { useState, useMemo } from 'react'
import Clicker from './Clicker.js'
import People from './People.js'

export default function App({clickersCount, children}) {
    // console.log(children)

    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)

    const toggleClickerState = () => {
        setHasClicker(!hasClicker)
    }

    const incrementGlobalCount = () => {
        setCount(count + 1)
    }

    const colors = useMemo(() => {
        // console.log('useMemo is being called!');
        const colors =  [...Array(clickersCount)].map(() => {
        return `hsl(${Math.random() * 360}deg, 100%, 70%)`
        })
        return colors
    }, [clickersCount])

    return <>
    { children }
    <div>Total count: {count}</div>
        <button onClick={toggleClickerState}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
        {/* {hasClicker ? <Clicker/> : null} */}
        {hasClicker && <>
            { 
            [...Array(clickersCount)].map((value, index) => 
                <Clicker 
                    key={index}
                    incrementGlobalCount={incrementGlobalCount} 
                    keyName={`count${index}`} 
                    color={colors[index]}
                />
            )}
        </>}

        <People/>
    </> 
        
}