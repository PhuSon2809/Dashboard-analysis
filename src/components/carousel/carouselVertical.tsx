import React from 'react'
import 'swiper/css'
import 'swiper/css/bundle'
import { A11y, EffectCoverflow, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ICarouselProps {
  listData: any[]
}

const CarouselVertical: React.FunctionComponent<ICarouselProps> = ({ listData }) => {
  return (
    <Swiper
      modules={[A11y, Keyboard, EffectCoverflow]}
      slidesPerView={2.4}
      loop={true}
      keyboard={{ enabled: true }}
      initialSlide={1}
      effect='coverflow'
      centeredSlides={true}
      direction='vertical'
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }}
      className='swiper-food-beverage-mobile max-h-[500px]'
    >
      {listData.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CarouselVertical
