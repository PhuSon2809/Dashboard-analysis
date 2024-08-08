import { Stage, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { ButtonPrimary } from '../button'
import bannerImage from '~/assets/bg/banner.jpg'

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
  const [translateY, setTranslateY] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [canvasDisplay, setCanvasDisplay] = useState('block')
  const [bgOpacity, setBgOpacity] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < 600) {
        setRotationY(scrollY * -0.01)
        setOpacity(1 - scrollY / 400)
        setRotation(scrollY * -0.05)
        setTranslateY(scrollY * -0.5)
        setRotateX(scrollY * 0.3)
        setCanvasDisplay('block')
        setBgOpacity(1 - scrollY / 800)
      } else {
        setOpacity(0)
        setCanvasDisplay('none')
        setBgOpacity(0)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className='carousel relative'
      style={{
        background: isMobile ? 'white' : 'none',
        backgroundImage: isMobile ? 'none' : 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: bgOpacity,
        transition: 'opacity 0.5s'
      }}
    >
      <div className='absolute left-0 top-0 z-50'>
        <div
          className='mt-[100px] flex flex-col items-center gap-7 px-5 md:mt-[200px] md:gap-14'
          style={{
            opacity: isMobile ? 1 : opacity,
            transform: isMobile ? 'none' : `rotate(${rotation}deg) translateY(${translateY}px) rotateX(${rotateX}deg)`,
            transition: 'opacity 1s, transform 1s',
            zIndex: 10,
            position: 'relative'
          }}
        >
          <h1 className='max-w-[800px] text-center text-[30px] font-semibold capitalize md:text-[52px]'>
            With AI, understand customers in-store with ease
          </h1>
          <ButtonPrimary className='z-[99999]'>
            <Link to='http://pre.fi.ai' className='h-full w-full'>
              <span>Start</span>
            </Link>
          </ButtonPrimary>
        </div>
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', zIndex: '2' }}>
          {isMobile ? (
            <div className='mx-auto mt-4 h-[280px] w-[80%]'>
              <img
                src={bannerImage}
                alt='Banner'
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                opacity,
                transition: 'opacity 1s',
                display: canvasDisplay
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
                      position={[0, -6.5, 2]}
                    />
                  </Stage>
                </Suspense>
              </Canvas>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner3D
