import classNames from 'classnames'
import { memo, useEffect, useRef, useState } from 'react'
import images from '~/assets'
import { BoxContentInStore } from '~/components/boxContentInStore'

const InStore = memo(() => {
  const reportRef = useRef<HTMLDivElement>(null)

  const [viewing, setViewing] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setViewing(true), 700)
        } else {
          setViewing(false)
        }
      },
      { root: null, threshold: 0.1 }
    )

    if (reportRef.current) observer.observe(reportRef.current)

    return () => {
      if (reportRef.current) observer.unobserve(reportRef.current)
    }
  }, [])

  return (
    <div ref={reportRef} className='relative overflow-hidden xs:pt-24 sm:pt-24 md:pt-20'>
      <h3
        className={classNames(
          'absolute font-semibold uppercase transition-all ease-in-out xs:text-[32px]/[43px] sm:left-[20px] sm:text-[40px]/[50px] md:left-[45px] md:text-[64px]/[72px]',
          viewing ? 'opacity-100 xs:top-[2%] xs:ml-4 sm:top-[5%] md:top-[16%]' : 'opacity-0 sm:top-[20%] md:top-[30%]'
        )}
        style={{ transitionDuration: '2500ms' }}
      >
        {/* Build a smarter <br /> in-store <br /> experience today! */}
        Free yourself <br /> with top <br /> tier technologies
      </h3>

      <img
        src={images.image.planet_1}
        alt='planet-1'
        className='overflow-hidden xs:-ml-[97%] xs:mt-[-10%] xs:min-w-[852px] xs:rotate-[18deg] sm:-ml-[180px] sm:mt-[-20px] sm:w-[852px] sm:rotate-0 md:-ml-[0px] md:mt-[85px] md:size-fit'
      />
      <img
        src={images.image.planet_2}
        alt='planet-2'
        className='translateY-5s absolute xs:-left-4 xs:top-[71%] xs:w-[120px] sm:-left-4 sm:top-[75%] sm:w-[140px] md:-left-3 md:top-[78.3%] md:w-fit'
      />
      <img
        src={images.image.planet_3}
        alt='planet-3'
        className='translateY-5s absolute xs:hidden sm:left-[60%] sm:top-[50px] sm:hidden sm:w-[100px] md:left-[47%] md:top-[160px] md:flex md:w-fit'
      />
      <img
        src={images.image.planet_4}
        alt='planet-4'
        className='translateY-5s absolute z-20 xs:right-0 xs:top-[12%] xs:w-[110px] sm:right-[35%] sm:top-[70%] md:left-20 md:top-[34%] md:w-fit'
      />
      <img
        src={images.image.planet_2}
        alt='planet-5'
        className='translateY-5s absolute xs:-right-6 xs:top-[-6%] xs:flex xs:w-[120px] sm:right-[20%] sm:top-[-5%] sm:w-[140px] md:hidden md:w-fit'
      />
      <img
        src={images.image.planet_4}
        alt='planet-6'
        className='translateY-5s absolute z-20 xs:right-[10%] xs:top-[37%] xs:flex xs:w-[70px] sm:right-[-5%] sm:top-[30%] md:left-20 md:top-[34%] md:hidden'
      />
      <img
        src={images.image.planet_4}
        alt='planet-7'
        className='translateY-5s absolute xs:right-[18%] xs:top-[63%] xs:flex xs:w-[60px] sm:left-5 sm:top-[28%] md:left-20 md:top-[34%] md:hidden md:w-fit'
      />

      <div className='absolute xs:left-[4%] xs:top-[18%] sm:left-[34.5%] sm:top-[24%] md:left-[41.8%] md:top-[22%]'>
        <BoxContentInStore
          duration='1000'
          icon={images.icon.learning}
          title='Advanced combination AI & Blockchain'
          content='Ensures data is stored accurately and securely on-chain'
          size='small'
          className={`xs:mb-7 xs:ml-0 sm:mb-16 sm:ml-auto md:mb-[92px] md:ml-[232px]`}
        />
        <BoxContentInStore
          duration='1300'
          icon={images.icon.plugplay}
          title='Plug-and-Play'
          content='No professional skill needed, supports virtual training tailored to each store'
          size='medium'
          className={`xs:mb-7 xs:ml-auto sm:mb-16 sm:ml-auto md:mb-[122px] md:ml-[156px]`}
        />
        <BoxContentInStore
          duration='1600'
          icon={images.icon.compliance}
          title='GDPR & CCPA compliance'
          content='100% anonymous and protect end-users identity'
          size='large'
          className='xs:ml-auto sm:ml-0 md:ml-0'
        />
      </div>
    </div>
  )
})

export default InStore
