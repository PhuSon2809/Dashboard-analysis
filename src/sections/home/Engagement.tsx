import { memo, useCallback, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MenuCheckTimeChart, ReactionMenuChart, ServeTimeAverageChart } from '~/components/chart'
import LeaveMenuChart from '~/components/chart/LeaveMenuChart'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'
import { SliderPagination } from '~/components/sliderPagination'
import './styles.scss'

const Engagement = memo(() => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const [activeSlide, setActiveSlide] = useState<number>(0)

  const handleGoToSlide = useCallback(
    (index: number) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideToLoop(index)
        setActiveSlide(index)
      }
    },
    [swiperRef]
  )

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) setActiveSlide(swiperRef.current.swiper.realIndex)
  }, [swiperRef])

  return (
    <div className='list-chart w-[1730px] h-[810px] mt-[191px] flex items-center gap-2 bg-ln-white-4 overflow-hidden relative'>
      <Swiper
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
        onSlideChange={handleSlideChange}
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
          <ReactionMenuChart />
        </SwiperSlide>
        <SwiperSlide>
          <LeaveMenuChart isActive={activeSlide === 1} />
        </SwiperSlide>
        <SwiperSlide>
          <MenuCheckTimeChart />
        </SwiperSlide>
        <SwiperSlide>
          <ServeTimeAverageChart isActive={activeSlide === 3} />
        </SwiperSlide>
      </Swiper>

      <div className='absolute top-[110px] left-[750px]'>
        <h1 className='w-fit text-[52px] font-customBold text-transparent bg-clip-text bg-ln-purple-red'>ENGAGEMENT</h1>
      </div>

      <div className='flex items-center gap-4 absolute bottom-[120px] left-[750px] z-20'>
        <button ref={prevRef} onClick={() => swiperRef.current?.swiper.slidePrev()}>
          <ArrowLeftIcon className='size-10 cursor-pointer' />
        </button>
        <SliderPagination
          className='!size-[10px]'
          activeIndex={activeSlide}
          slideToGo={handleGoToSlide}
          slideCount={4}
        />
        <button ref={prevRef} onClick={() => swiperRef.current?.swiper.slideNext()}>
          <ArrowRightIcon className='size-10 cursor-pointer' />
        </button>
      </div>
    </div>
  )
})

export default Engagement
