import React, { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/bundle'
import { A11y, EffectCoverflow, Keyboard, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'

interface ICarouselProps {
  listData: any[]
}

const Carousel: React.FunctionComponent<ICarouselProps> = ({ listData }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState<number>(0)

  useEffect(() => {
    const updateWrapperWidth = () => {
      const swiperSlides = document.querySelectorAll('.swiper-slide')
      if (swiperSlides.length > 0) {
        const firstSlide = swiperSlides[0] as HTMLElement
        setSlideWidth(firstSlide.offsetWidth)
      }
    }

    // Update on initial render
    updateWrapperWidth()

    // Update on window resize
    window.addEventListener('resize', updateWrapperWidth)
    return () => window.removeEventListener('resize', updateWrapperWidth)
  }, [])

  return (
    <>
      <Swiper
        modules={[Navigation, A11y, Keyboard, EffectCoverflow]}
        slidesPerView={1}
        spaceBetween={80}
        centeredSlides={true}
        loop={true}
        keyboard={{ enabled: true }}
        initialSlide={1}
        effect='coverflow'
        coverflowEffect={{
          rotate: 0,
          stretch: 3,
          depth: 80,
          modifier: 1,
          slideShadows: false
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 80
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50
          }
        }}
        navigation={{
          prevEl: '.custom-prev-button',
          nextEl: '.custom-next-button'
        }}
      >
        {listData.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={wrapperRef}
        className='2xl:max-w-[900px] w-full mx-auto relative mt-4'
        style={{ maxWidth: slideWidth ? `${slideWidth}px` : '100%' }}
      >
        <div className='custom-prev-button absolute left-0'>
          <ArrowLeftIcon className='w-6 h-6 text-white' />
        </div>
        <div className='custom-next-button absolute right-0'>
          <ArrowRightIcon className='w-6 h-6 text-white' />
        </div>
      </div>
    </>
  )
}

export default Carousel
