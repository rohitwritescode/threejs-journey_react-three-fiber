import { useKeyboardControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'
import useGame from './stores/useGame.jsx'

export default function Interface() {
    const time = useRef()

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)

    const forward = useKeyboardControls((state) => state.forward)
    const back = useKeyboardControls((state) => state.back)
    const left = useKeyboardControls((state) => state.left)
    const right = useKeyboardControls((state) => state.right)
    const jump = useKeyboardControls((state) => state.jump)

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()

            let elapsedTime = 0

            if(state.phase === 'playing')
                elapsedTime = Date.now() - state.startTime
            else if(state.phase === 'ended')
                elapsedTime = state.endTime - state.startTime

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if(time.current)
                time.current.textContent = elapsedTime

        })

        return () => {
            unsubscribeEffect()
        }

    }, [])

    return <div className="interface">
        {/* Time */}
        <div ref={time} className="time">0.00</div>
        
        {/* Restart */}
        {phase === 'ended' && <div className="restart" onClick={restart}>Restart</div>}

        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? 'active' : ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${left ? 'active' : ''}`}></div>
                <div className={`key ${back ? 'active' : ''}`}></div>
                <div className={`key ${right ? 'active' : ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ? 'active' : ''} `}></div>
            </div>
        </div>

    </div>
}