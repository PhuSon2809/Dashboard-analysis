import classNames from 'classnames'
import React, { useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import images from '~/assets'
import ListBannerCustomerReaction from '~/components/ListBannerCustomerReaction'

const CustomerReaction = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <React.Fragment>
      <div
        data-aos='fade-up'
        className={classNames(
          'mb-5 flex w-full flex-col items-center justify-center px-5',
          'md:aspect-[2] md:flex-row md:gap-8'
        )}
      >
        <div className={classNames('relative flex-1')}>
          <div className='absolute left-5 top-0'>
            <p
              className={classNames(
                'max-w-[180px] text-[36px]/[40px] font-bold',
                'lg:max-w-[400px] lg:text-[44px]/[50px]'
              )}
            >
              Customer’s Reaction
            </p>
          </div>
          <div className={classNames(' ')}>
            <img src={images.image.customerReact} alt='' className='h-full w-full' />
          </div>
        </div>
        <div className={classNames('flex h-full w-full flex-col', 'md:w-1/2')}>
          <div className='my-3 flex w-full items-end gap-5'>
            {Array.from({ length: 3 }).map((_, i) => (
              <>
                <div className={classNames('block h-1 w-full rounded-full bg-black', 'md:h-2')}></div>
                {i === activeSlide && (
                  <span className={classNames('text-[18px] font-semibold leading-none', 'md:text-[24px]')}>
                    {i + 1}
                  </span>
                )}
              </>
            ))}
          </div>
          <div className='h-full'>
            <Swiper
              onActiveIndexChange={(value) => {
                setActiveSlide(value?.activeIndex || 0)
              }}
              pagination={true}
              modules={[Pagination]}
              className='mySwiper h-full w-full'
            >
              <SwiperSlide>
                <ListBannerCustomerReaction />
              </SwiperSlide>
              <SwiperSlide>
                <ListBannerCustomerReaction />
              </SwiperSlide>
              <SwiperSlide>
                <ListBannerCustomerReaction />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CustomerReaction
