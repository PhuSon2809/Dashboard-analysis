import React, { useEffect, useRef } from 'react'
import Lottie, { AnimationItem } from 'lottie-web'
import Astronaut from '../../assets/astronaut.json'
import { GoArrowRight } from 'react-icons/go'

const InStoreExperienceToday = () => {
  const loadingRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    ;(async () => {
      if (animationRef.current) {
        console.log('xxx')
        animationRef.current.destroy()
      }

      animationRef.current = Lottie.loadAnimation({
        container: loadingRef.current as HTMLElement, // Required
        animationData: Astronaut,
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: status // Name for future reference. Optional.
      })
    })()

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }
    }
  }, [status])

  return (
    <React.Fragment>
      <div className='relative'>
        <div className='relative z-50 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-center text-center xs:bg-[length:640px_100%] sm:bg-cover'>
          <div ref={loadingRef} className='aspect-square w-full sm:size-[400px]' key={status} />
          <div>
            <h2 className='text-[40px] font-bold md:text-[64px]'>
              Create a more intelligent <br /> in-store experience today!
            </h2>
          </div>
          <button className='btn-gradien-astronaut mt-8'>
            Get started
            <GoArrowRight />
          </button>
        </div>
        <div
          className='absolute bottom-[-150px] left-0 right-0 z-[0] h-full'
          style={{
            background: 'linear-gradient(180deg, rgba(244, 247, 249, 0) 46.5%, rgba(12, 36, 162, 0.88) 100%)'
          }}
        ></div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(InStoreExperienceToday)
