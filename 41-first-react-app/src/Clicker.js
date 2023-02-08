import { useEffect, useState, useRef } from 'react'

export default function Clicker({incrementGlobalCount, keyName, color = 'darkOrchid'}) {
    // console.log(incrementGlobalCount)

    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0)) //Calls useState hook with an initial value of 0
    const buttonRef = useRef()

    useEffect(() => {
        // console.log('First render.')
        buttonRef.current.style.backgroundColor = 'papayawhip'
        buttonRef.current.style.color = 'salmon'
        
        return () => {
            localStorage.removeItem(keyName)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [count])
    
    const buttonClick = () => {
        setCount(count + 1)
        incrementGlobalCount()
        // setCount((currentValue) => currentValue + 1)
    }

    return <div>
            <div style={ {color: color} }>Clicks count: { count }</div>
            <button ref={buttonRef} onClick={ buttonClick }>Click me!</button>
        </div>
}