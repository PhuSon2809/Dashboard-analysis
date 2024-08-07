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
    <div ref={reportRef} className='relative sm:pt-24 md:pt-20'>
      <h3
        className={classNames(
          'absolute font-semibold uppercase transition-all ease-in-out xs:text-[32px]/[43px] sm:left-[20px] sm:text-[40px]/[50px] md:left-[45px] md:text-[64px]/[72px]',
          viewing ? 'opacity-100 sm:top-[8%] md:top-[16%]' : 'opacity-0 sm:top-[20%] md:top-[30%]'
        )}
        style={{ transitionDuration: '2500ms' }}
      >
        Build a smarter <br /> in-store <br /> experience today!
      </h3>

      <img
        src={images.image.planet_1}
        alt='planet-1'
        className='sm:-ml-[50px] sm:mt-[0px] sm:w-[560px] md:-ml-[30px] md:mt-[85px] md:w-fit'
      />
      <img
        src={images.image.planet_2}
        alt='planet-2'
        className='translateY-5s absolute sm:-left-4 sm:top-[73%] sm:w-[140px] md:-left-6 md:top-[78.5%] md:w-fit'
      />
      <img
        src={images.image.planet_3}
        alt='planet-3'
        className='translateY-5s absolute sm:left-[60%] sm:top-[50px] sm:w-[100px] md:left-[47%] md:top-[160px] md:w-fit'
      />
      <img
        src={images.image.planet_4}
        alt='planet-4'
        className='translateY-5s absolute sm:left-5 sm:top-[28%] md:left-20 md:top-[34%]'
      />

      <div className='absolute left-[41.3%] top-[22%] xs:hidden md:block'>
        <BoxContentInStore
          duration='1000'
          icon={images.icon.learning}
          title='Advanced AI deep learning'
          content='Smarter AI and deeper analyze for better know your customer need'
          size='small'
          className={`mb-[92px] ml-[232px]`}
        />
        <BoxContentInStore
          duration='1300'
          icon={images.icon.plugplay}
          title='Plug-and-Play'
          content='No professional skill needed, just easily DIY the setup process'
          size='medium'
          className={`mb-[122px] ml-[156px]`}
        />
        <BoxContentInStore
          duration='1600'
          icon={images.icon.compliance}
          title='GDPR & CCPA compliance'
          content='100% anonymous and protect end-users identity'
          size='large'
        />
      </div>

      <div className='absolute left-[41.3%] top-[22%] xs:block md:hidden'>
        <BoxContentInStore
          duration='1000'
          icon={images.icon.learning}
          title='Advanced AI deep learning'
          content='Smarter AI and deeper analyze for better know your customer need'
          size='small'
          className={`mb-[92px] ml-[232px]`}
        />
        <BoxContentInStore
          duration='1300'
          icon={images.icon.plugplay}
          title='Plug-and-Play'
          content='No professional skill needed, just easily DIY the setup process'
          size='medium'
          className={`mb-[122px] ml-[156px]`}
        />
        <BoxContentInStore
          duration='1600'
          icon={images.icon.compliance}
          title='GDPR & CCPA compliance'
          content='100% anonymous and protect end-users identity'
          size='large'
        />
      </div>
    </div>
  )
})

export default InStore
