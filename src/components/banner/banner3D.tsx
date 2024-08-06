import { Html, Stage, useAnimations, useGLTF, useProgress } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ModelProps {
  model: { name: string }
  rotationY: number
  scale: [number, number, number]
  position: [number, number, number]
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(2)} % loaded</Html>
}

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

  useEffect(() => {
    const handleScroll = () => {
      setRotationY(window.scrollY * -0.01)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 15],
        fov: 35,
        near: 1,
        far: 30
      }}
      className='banner'
    >
      <Suspense fallback={<Loader />}>
        <Stage preset='rembrandt'>
          <MyModel model={{ name: 'main.glb' }} rotationY={rotationY} scale={[1.8, 1.8, 1.6]} position={[0, -6, 0]} />
        </Stage>
      </Suspense>
    </Canvas>
  )
}

export default Banner3D
