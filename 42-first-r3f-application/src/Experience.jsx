import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.jsx'

extend({ OrbitControls: OrbitControls })

export default function Experience() {

    const { camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame( (state, delta) => {
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta
    })
    
    return <>

        <orbitControls args={[camera, gl.domElement]} />

        <directionalLight position={[1, 2, 3]} intensity={1.25}/>
        <ambientLight intensity={0.5} />

        <group ref={groupRef}>
            <mesh ref={cubeRef} rotation-y={Math.PI * 0.23} position-x={ 3 } scale={ 2 }>
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" wireframe={false}/>
            </mesh>
            
            <mesh position-x={ -3 } scale={ 2 }>
                <sphereGeometry args={ [0.75, 32, 32]} />
                <meshStandardMaterial color="orange" wireframe={false}/>
            </mesh>
        </group>

        <mesh rotation-x={- Math.PI / 2} position-y={ -1.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" wireframe={false}/>
        </mesh>

        <CustomObject />
    </>
}