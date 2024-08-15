import React, { memo, useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BestSellerChart, MostUsedPaymentChart, PaymentReactionChart, ServeTime } from '~/components/chart'
import PurchasesChart from '~/components/chart/PurchasesChart'
import ReactionsEnjoyChartMobile from '~/components/chart/ReactionsEnjoyChartMobile'
import './styles.scss'

const OrderReportMobile = memo(() => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const charts = [
    { component: <ReactionsEnjoyChartMobile />, key: 'ReactionsEnjoyChart' },
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

  const handlePreviewItemClick = (previewIndex: number) => {
    // previewIndex: 0, 1, 2
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper
      const activeIndex = swiper.realIndex // Current active slide index
      console.log('activeIndex:', activeIndex)
      const totalSlides = charts.length // Total number of slides

      let targetIndex = activeIndex

      switch (previewIndex) {
        case 0:
          targetIndex = (activeIndex + 2) % totalSlides

          break
        case 1:
          targetIndex = (activeIndex + 3) % totalSlides
          break
        case 2:
          targetIndex = (activeIndex + 4) % totalSlides
          break

        default:
          break
      }

      swiper.slideToLoop(targetIndex)
    }
  }

  return (
    <div className=' bg-earth-2  px-5 pt-[8px]'>
      <div className='list-chart-order relative flex flex-col lg:gap-5 '>
        <h3 className='w-fit bg-ln-red-purple bg-clip-text font-customBold lg:text-[52px] text-[32px] uppercase leading-none text-transparent'>
          orders
        </h3>
        <div className='swiper-show w-full'>
          <Swiper
            ref={swiperRef}
            loop
            grabCursor
            slidesPerView={1}
            spaceBetween={80}
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
        <div className='swiper-preview flex  w-full items-center justify-center  z-[99999] gap-[17.6px] '>
          {previewCharts.map((chart, index) => (
            <div
              key={index}
              className='swiper-preview-items cursor-pointer'
              onClick={() => handlePreviewItemClick(index)}
            >
              {chart.component}
            </div>
          ))}
        </div>

        {/* <div className='absolute top-[10%] left-[20%] z-[9999999999999] flex items-center gap-4'>
          <IconButton size='48' color='white' ref={prevRef} onClick={() => swiperRef.current?.swiper?.slidePrev()}>
            <ArrowLeftIcon className='size-6' />
          </IconButton>
          <IconButton size='48' color='white' ref={nextRef} onClick={() => swiperRef.current?.swiper?.slideNext()}>
            <ArrowRightIcon className='size-6' />
          </IconButton>
        </div> */}
      </div>
    </div>
  )
})

export default OrderReportMobile
