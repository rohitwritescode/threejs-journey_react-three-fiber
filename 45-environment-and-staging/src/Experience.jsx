import { useFrame } from '@react-three/fiber'
import { softShadows, BakeShadows, useHelper, OrbitControls, SoftShadows, AccumulativeShadows, RandomizedLight, ContactShadows, Sky, Environment, Lightformer, Stage } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings:11
// })

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const {color, opacity, blur} = useControls('contact shadows', {
        color: '#383838',
        opacity: {value: 0.37, min: 0, max: 1},
        blur: {value: 1.3, min: 0, max: 10}
    })

    const {sunPosition} = useControls('sky', {
        sunPosition: {value: [1, 2, 3]}
    })
    
    const {envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: {value: 3.5, min: 0, max: 12},
        envMapHeight: {value: 7, min: 0, max: 100},
        envMapRadius: {value: 20, min: 10, max: 1000},
        envMapScale: {value: 100, min: 10, max: 1000}
    })

    return <>

        {/* <Environment 
            // background
            // files={[
            //     './environmentMaps/2/px.jpg',
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg'
            // ]}
            // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
            ground={ {
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            }
            }
            preset="sunset"
            // resolution={32}
        >
            <color args={['black']} attach="background" />
            {/* <Lightformer 
                position-z={-5}
                scale={10}
                color="red"
                intensity={10}
                form="ring"
            /> */}
            {/* <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={[1, 0, 0]}/>
            </mesh> */}
        {/* </Environment>  */}

        

        {/* <BakeShadows />  */}
            
        {/* <color args={['#ivory']} attach="background"/> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <SoftShadows 
            frustum={3.75}
            size={0.005}
            near={9.5}
            samples={17}
            rings={11}                
        /> */}

        {/* <AccumulativeShadows 
            position={[0, -0.99, 0]}
            scale={10}
            color="#316d39"
            opacity={0.8}
            frames={Infinity}
            temporal
            blend={100}
        >
            <RandomizedLight 
            amount={8}
            radius={1}
            ambient={0.5}
            intensity={1}
            position={[1, 2, 3]}
            bias={0.001}
            />
        </AccumulativeShadows> */}

        {/* <ContactShadows
            position={[0, 0, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1}
        /> */}

        {/* <directionalLight 
            ref={directionalLight} 
            position={ sunPosition } 
            intensity={ 1.5 }
            castShadow 
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
        /> */}

        {/* <ambientLight intensity={ 0.5 } /> */}

        {/* <Sky sunPosition={sunPosition} /> */}

        {/* <mesh castShadow position-x={-2} position-y={1}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 } position-y={1}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh> */}

        {/* <mesh 
            // receiveShadow 
            position-y={0} 
            rotation-x={ - Math.PI * 0.5 } 
            scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh> */}

        <Stage
                shadows={{type: 'contact', opacity: 0.2, blur: 3}}        
                environment="sunset"
                preset="portrait"
                intensity={0.25}
        >
            <mesh castShadow position-x={-2} position-y={1}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 } position-y={1}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
            </mesh>
        </Stage>
    </>
}