import React, { memo, useEffect, useRef, useState } from 'react'
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

  const charts = [
    { component: <ReactionsEnjoyChart />, key: 'ReactionsEnjoyChart' },
    { component: <BestSellerChart />, key: 'BestSellerChart' },
    { component: <PurchasesChart />, key: 'PurchasesChart' },
    { component: <PaymentReactionChart />, key: 'PaymentReactionChart' },
    { component: <MostUsedPaymentChart />, key: 'MostUsedPaymentChart' },
    { component: <ServeTime />, key: 'ServeTime' }
  ]

  const [previewCharts, setPreviewCharts] = useState([
    { component: <PaymentReactionChart isSmall />, key: 'PaymentReactionChart' },
    { component: <MostUsedPaymentChart isSmall />, key: 'MostUsedPaymentChart' },
    { component: <ServeTime isSmall />, key: 'ServeTime' }
  ])

  const updatePreviewCharts = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper
      const activeIndex = swiper.realIndex
      const newPreviewCharts = [
        {
          ...charts[(activeIndex + 3) % charts.length],
          component: React.cloneElement(charts[(activeIndex + 3) % charts.length].component, { isSmall: true })
        },
        {
          ...charts[(activeIndex + 4) % charts.length],
          component: React.cloneElement(charts[(activeIndex + 4) % charts.length].component, { isSmall: true })
        },
        {
          ...charts[(activeIndex + 5) % charts.length],
          component: React.cloneElement(charts[(activeIndex + 5) % charts.length].component, { isSmall: true })
        }
      ]
      setPreviewCharts(newPreviewCharts)
    }
  }

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      updatePreviewCharts()
      swiperRef.current.swiper.on('slideChange', updatePreviewCharts)
    }

    return () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.off('slideChange', updatePreviewCharts)
      }
    }
  }, [])

  return (
    <div className='h-[1309px] bg-earth-2 px-5 pt-[8px]'>
      <div className='list-chart-order relative mt-[329px] flex flex-col gap-5'>
        <h3 className='w-fit bg-ln-red-purple bg-clip-text font-customBold text-[52px] uppercase leading-none text-transparent'>
          orders
        </h3>

        <div className='swiper-preview absolute mt-10 flex w-full items-center justify-end gap-[17.6px]'>
          {previewCharts.map((chart, index) => (
            <div key={index} className='swiper-preview-items'>
              {chart.component}
            </div>
          ))}
        </div>

        <div className='swiper-show w-full'>
          <Swiper
            ref={swiperRef}
            loop
            grabCursor
            slidesPerView={3}
            spaceBetween={70}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            navigation={{
              prevEl: prevRef.current ? prevRef.current : undefined,
              nextEl: nextRef.current ? nextRef.current : undefined
            }}
            onInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current
              swiper.navigation.update()
            }}
          >
            {charts.map((chart, index) => (
              <SwiperSlide key={index}>{React.cloneElement(chart.component, { isSmall: false })}</SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='absolute bottom-[60px] left-[60px] z-20 flex items-center gap-4'>
          <IconButton size='48' color='white' ref={prevRef} onClick={() => swiperRef.current?.swiper?.slidePrev()}>
            <ArrowLeftIcon className='size-6' />
          </IconButton>
          <IconButton size='48' color='white' ref={nextRef} onClick={() => swiperRef.current?.swiper?.slideNext()}>
            <ArrowRightIcon className='size-6' />
          </IconButton>
        </div>
      </div>
    </div>
  )
})

export default OrderReport
