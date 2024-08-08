import classNames from 'classnames'
import React from 'react'
import ListBannerCustomerReaction from '~/components/ListBannerCustomerReaction'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import images from '~/assets'

const CustomerReaction = () => {
  return (
    <React.Fragment>
      <div
        className={classNames(
          'flex w-full flex-col items-center justify-center px-5',
          'container-wrapper md:aspect-[2] md:flex-row md:gap-8'
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
        <div className={classNames('h-full w-full', 'md:w-1/2')}>
          <Swiper pagination={true} modules={[Pagination]} className='mySwiper h-full w-full'>
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
    </React.Fragment>
  )
}

export default CustomerReaction
