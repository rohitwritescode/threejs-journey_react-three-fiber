import { MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cubeRef = useRef()
    const sphereRef = useRef()

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls 
            anchor={[0,0,0]} 
            depthTest={false}
            lineWidth={1.5}
            axisColors={['#ff4d6d', '#7ae582', '#9381ff']}
            scale={1}
            fixed={false}
            >
            <mesh ref={sphereRef} position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html 
                    position={[1,1,0]}
                    wrapperClass="label"
                    center
                    distanceFactor={8}
                    occlude={[cubeRef]}
                >Wow! A sphere!</Html>
            </mesh>
        </PivotControls>

        <mesh ref={cubeRef} position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
        </mesh>

        {/* <TransformControls object={cubeRef} mode="translate" /> */}

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial 
                resolution={512} 
                blur={[1000, 1000]}
                mixBlur={0.75}
                mirror={0.75}
                color="greenyellow"
            />
        </mesh>

        <Float
            speed={5}
            floatIntensity={0.0001}
        >
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={0.5}
                color="salmon"
                position-y={1.75}
                maxWidth={2}
                textAlign="center"
            >
                R3F is AWESOME!
            </Text>
        </Float>
    </>
}