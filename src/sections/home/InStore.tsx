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
    <div ref={reportRef} className='relative pt-20'>
      <h3
        className={classNames(
          'absolute left-[50px] text-[64px]/[72px] font-semibold uppercase transition-all ease-in-out',
          viewing ? 'top-[16%] opacity-100' : 'top-[40%] opacity-0'
        )}
        style={{ transitionDuration: '2500ms' }}
      >
        Build a smarter <br /> in-store <br /> experience today!
      </h3>

      <img src={images.image.planet_1} alt='planet-1' className='-ml-[30px] mt-[85px]' />
      <img src={images.image.planet_2} alt='planet-2' className='translateY-5s absolute -left-4 top-[78.5%]' />
      <img src={images.image.planet_3} alt='planet-3' className='translateY-5s absolute left-[47%] top-[165px]' />
      <img src={images.image.planet_4} alt='planet-4' className='translateY-5s absolute left-20 top-[34%]' />

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
