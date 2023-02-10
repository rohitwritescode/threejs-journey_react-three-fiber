import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import {useRef,  useEffect, useState } from 'react' 
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    // const donutsGroup = useRef()
    // const [torusGeometry, setTorusGeometry] = useState()
    // const [material, setMaterial] = useState()

    const donuts = useRef([])

    const [matcapTexture] = useMatcapTexture('80CA23_B7EE37_D5FA4C_A3E434', 256)

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    useFrame((state, delta) => {
        for(const donut of donuts.current) {
            donut.rotation.y += delta * 0.1
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

        <Center>
            <Text3D
                material={material}
                font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                >
                Hello R3F
            </Text3D>
        </Center>

        {/* <group ref={donutsGroup}> */}
        {[...Array(100)].map((val, idx) =>
            <mesh
            ref={(element) => donuts.current[idx] = element }
            key={idx}
            geometry={torusGeometry}
            material={material}
            position={[
                (Math.random()-0.5) * 10,
                (Math.random()-0.5) * 10, 
                (Math.random()-0.5) * 10
            ]}
            scale={0.2 + Math.random()*0.2}
            rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            ]}
            />
        )}
        {/* </group> */}
    </>
}