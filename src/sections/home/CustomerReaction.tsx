import classNames from 'classnames'
import React from 'react'
import ListBannerCustomerReaction from '~/components/ListBannerCustomerReaction'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

const CustomerReaction = () => {
  return (
    <React.Fragment>
      <div className={classNames('flex w-full flex-col', 'md:flex-row')}>
        <div className='h-10 w-full flex-1'>aa</div>
        <div className={classNames('md:w-1/2')}>
          <Swiper pagination={true} modules={[Pagination]} className='mySwiper w-full'>
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
