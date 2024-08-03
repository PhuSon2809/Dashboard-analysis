import { memo, useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  BestSellerChart,
  MostUsedPaymentChart,
  PaymentReactionChart,
  ReactionsEnjoyChart,
  ServeTime
} from '~/components/chart'
import PurchasesChart from '~/components/chart/PurchasesChart'
import { IconButton } from '~/components/iconButton'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'
import './styles.scss'

const OrderReport = memo(() => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='h-[1309px] bg-earth-2 pt-[16px]'>
      <div className='list-chart-order mt-[329px] relative'>
        <h3 className='w-fit text-[52px] leading-none mb-[49px] font-customBold uppercase text-transparent bg-clip-text bg-ln-red-purple absolute left-[60px] top-5'>
          orders
        </h3>

        <div className='flex items-center gap-[17.6px] absolute -top-0 right-[60px]'>
          <PaymentReactionChart isSmall />
          <MostUsedPaymentChart />
          <ServeTime />
        </div>

        <div className='w-full'>
          <Swiper
            className='px-5'
            ref={swiperRef}
            loop
            grabCursor
            slidesPerView={3}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            navigation={{
              prevEl: prevRef.current ? prevRef.current : undefined,
              nextEl: nextRef.current ? nextRef.current : undefined
            }}
            onInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current
              swiper.navigation.update()
            }}
          >
            <SwiperSlide>
              <ReactionsEnjoyChart />
            </SwiperSlide>
            <SwiperSlide>
              <BestSellerChart />
            </SwiperSlide>
            <SwiperSlide>
              <PurchasesChart />
            </SwiperSlide>
            <SwiperSlide>
              <ReactionsEnjoyChart />
            </SwiperSlide>
            <SwiperSlide>
              <BestSellerChart />
            </SwiperSlide>
            <SwiperSlide>
              <PurchasesChart />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className='flex items-center gap-4 absolute bottom-[25px] left-[60px] z-20'>
          <IconButton size='48' color='white' ref={prevRef} onClick={() => swiperRef.current?.swiper?.slidePrev()}>
            <ArrowLeftIcon className='size-6' />
          </IconButton>
          <IconButton size='48' color='white' ref={nextRef} onClick={() => swiperRef.current?.swiper?.slideNext()}>
            <ArrowRightIcon className='size-6' />
          </IconButton>
        </div>
      </div>

      {/* <div className='p-10 flex gap-10'>
        <PurchasesChart />
        <PaymentReactionChart />
      </div> */}
    </div>
  )
})

export default OrderReport
