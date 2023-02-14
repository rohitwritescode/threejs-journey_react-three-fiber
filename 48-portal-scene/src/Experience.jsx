import * as THREE from 'three'
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Sparkles, useGLTF, useTexture, shaderMaterial } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial( {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
    },
    portalVertexShader,
    portalFragmentShader
)

extend({PortalMaterial: PortalMaterial})

export default function Experience()
{
    const {nodes} = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    return <>

        <color args={['#030202']} attach="background" />

        <OrbitControls makeDefault />

        <Center>

            {/* Main Scene Mesh */}
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            {/* Left Pole Light Mesh */}
            <mesh 
                geometry={nodes.poleLightLeft.geometry}
                position={nodes.poleLightLeft.position}
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            {/* Right Pole Light Mesh */}
            <mesh 
                geometry={nodes.poleLightRight.geometry}
                position={nodes.poleLightRight.position}
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            {/* Portal Mesh */}
            <mesh 
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <Sparkles
                size={6}
                scale={[4, 2, 4]}
                position-y = {1.2}
                speed={0.4}
                count={40}
            />

        </Center>
    </>
}