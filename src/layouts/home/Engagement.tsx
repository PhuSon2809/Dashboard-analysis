import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/icons'
import { MenuCheckTimeChart, ReactionMenuChart, ServeTimeAverageChart } from '~/components/chart'
import LeaveMenuChart from '~/components/chart/LeaveMenuChart'
import { SliderPagination } from '~/components/sliderPagination'
import './styles.scss'

const Engagement = memo(() => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [center, setCenter] = useState(false)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const handleResize = () => {
    const width = window.innerWidth
    if (width < 1024) {
      setCenter(true)
    } else {
      setCenter(false)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // Call once to set initial value
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
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
    <div className='list-chart relative flex h-[600px] items-center gap-2 overflow-hidden bg-ln-white-4 px-4 lg:mt-[191px] lg:h-[810px] lg:w-[1730px] lg:px-0'>
      <Swiper
        ref={swiperRef}
        loop
        grabCursor
        centeredSlides={center}
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
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 80
          },
          1024: {
            slidesPerView: 3
          }
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

      <div className='absolute left-0 top-10 px-4 lg:left-[750px] lg:top-[110px]'>
        <h1 className='w-fit bg-ln-purple-red bg-clip-text font-customBold text-[32px] text-transparent lg:text-[52px]'>
          ENGAGEMENT
        </h1>
      </div>

      <div className='absolute bottom-0 z-50 flex items-center gap-4 lg:bottom-[100px] lg:left-[750px]'>
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
