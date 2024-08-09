import classNames from 'classnames'
import { memo } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ListGridListen from '~/components/ListGridListen'

const ListenToOurCustomer = memo(() => {
  return (
    <div className={classNames('mx-auto min-h-screen w-full', '')}>
      <div className='flex min-h-screen w-full flex-col items-center justify-center pt-10'>
        <div className='flex w-full flex-col items-center justify-center px-[20px] text-center'>
          <h2 className='title-wrap font-bold md:text-[64px]' data-aos='fade-up'>
            Listen to our customers
          </h2>
          <div className='w-full max-w-[600px] text-center' data-aos='fade-up'>
            <span className='text-[16px] md:text-[20px]'>
              We provide solution tailored with specific industry, give our clients a special seamless experience with
              top advance technology AI. Connect tech and people together
            </span>
          </div>
        </div>
        <div className='mb-10 flex w-full flex-1' data-aos='fade-up'>
          <Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
            <SwiperSlide>
              <ListGridListen />
            </SwiperSlide>
            <SwiperSlide>
              <ListGridListen />
            </SwiperSlide>
            <SwiperSlide>
              <ListGridListen />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
})

export default ListenToOurCustomer
