import { useAnimations, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import unpleash from '~/assets/images/unpleash.svg'

interface ModelProps {
  model: { name: string }
  rotationY: number
  scale: [number, number, number]
  position: [number, number, number]
}

const MyModel = ({ model, rotationY, scale, position }: ModelProps) => {
  const modelRef = useRef<THREE.Object3D>(null)
  const modelUrl = '/models/' + model?.name
  const { scene, animations } = useGLTF(modelUrl)

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

  return <primitive ref={modelRef} object={scene} />
}

const Unleash = () => {
  const [rotationY, setRotationY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 1700 && scrollY < 2300) {
        setRotationY(scrollY * -0.01)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className='unleash-the-power container-wrapper relative flex h-screen flex-col items-center gap-[24px] py-[150px] md:flex-row'>
      <div className='absolute z-[1000] flex w-[100%] flex-col'>
        <h2 className='text-[28px] font-bold md:text-[56px] md:font-medium'>Unleash the power</h2>
        <h1 className='text-[46px] font-bold md:pl-[17%] md:text-[104px]'>Of Offline </h1>
        <h2 className='text-[24px] font-bold md:pl-[30%] md:text-[56px] md:font-medium'>Commerce </h2>
      </div>
      <div
        className='relative top-[140px] ml-auto h-full w-[100%] md:w-[60%]'
        style={{
          backgroundImage: `url(${unpleash})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Canvas
          shadows
          camera={{
            position: [0, 0, 8]
            // fov: 35,
            // near: 1,
            // far: 30
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} intensity={1} />
          <MyModel
            model={{ name: 'IHVtsHAQU7cF91LAuAlKN5.glb' }}
            rotationY={rotationY}
            scale={[1.2, 1.2, 1.2]}
            position={[0, -4, 0]}
          />
        </Canvas>
      </div>
    </div>
  )
}
export default Unleash
