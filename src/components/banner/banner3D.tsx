import { Stage, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { ButtonPrimary } from '../button'

interface ModelProps {
  model: { name: string }
  rotationY: number
  scale: [number, number, number]
  position: [number, number, number]
}

// function Loader() {
//   const { progress } = useProgress()
//   return <Html center>{progress.toFixed(2)} % loaded</Html>
// }

const MyModel = ({ model, rotationY, scale, position }: ModelProps) => {
  const modelRef = useRef<THREE.Object3D>(null)
  const modelUrl = '/models/' + model?.name
  const { scene, animations } = useGLTF(modelUrl)

  scene.children[0].children[0].children[0].children[0].children[4].visible = false

  const { actions, names } = useAnimations(animations, modelRef)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = rotationY
      modelRef.current.scale.set(scale[0], scale[1], scale[2])
      modelRef.current.position.set(position[0], position[1], position[2])
    }
  })

  useEffect(() => {
    names.forEach((k) => {
      actions[k]?.play()
    })
  }, [names, actions])

  return <primitive ref={modelRef} object={scene} dispose={null} />
}

const Banner3D = () => {
  const [rotationY, setRotationY] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < 400) {
        setRotationY(scrollY * -0.01)
        setOpacity(1 - scrollY / 400)
        setRotation(scrollY * -0.05)
      } else {
        setOpacity(0)
        // setRotation(40) // Continue to tilt after fade out
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className='mt-[100px] flex flex-col items-center gap-14'
        style={{
          opacity,
          transform: `rotate(${rotation}deg)`,
          transition: 'opacity 0.5s, transform 0.5s',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <h1 className='max-w-[800px] text-center text-[32px] font-semibold capitalize md:text-[52px]'>
          With AI, understand customers in-store with ease
        </h1>
        <ButtonPrimary className='z-[99999]'>
          <Link to='http://pre.fi.ai' className='h-full w-full'>
            <span>Start</span>
          </Link>
        </ButtonPrimary>
      </div>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', zIndex: '2' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            opacity,
            transition: 'opacity 0.5s'
          }}
        >
          <Canvas
            shadows
            camera={{
              position: [0, 0, 5],
              fov: 35,
              near: 1,
              far: 30
            }}
            className='banner'
          >
            <Suspense>
              <Stage preset='rembrandt'>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 0, 5]} intensity={1} />
                <MyModel
                  model={{ name: 'main.glb' }}
                  rotationY={rotationY}
                  scale={[1.6, 1.6, 1.6]}
                  position={[0, -6, 2]}
                />
              </Stage>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default Banner3D
