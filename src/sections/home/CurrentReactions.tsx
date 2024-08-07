import classNames from 'classnames'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Autoplay, EffectCreative, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import images from '~/assets'
import { IconButton } from '~/components/iconButton'
import { ArrowLeftIcon, ArrowRightIcon, ChevronRight } from '~/components/icons'
import { PersonreactionCard } from '~/components/personreactionCard'
import { useAppSelector } from '~/redux/configStore'
import './styles.scss'

const CurrentReactions = memo(() => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const [typeActive, setTypeActive] = useState<number>(0)
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const listTypePerson = useMemo(() => [0, 1], [])

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) setActiveSlide(swiperRef.current.swiper.realIndex)
  }, [swiperRef])

  const listDataRender = useMemo(
    () => homeReportCurrent?.currentReactions?.filter((p: any) => p.status === typeActive),
    [typeActive, homeReportCurrent]
  )

  return (
    <div className='relative pt-[120px]'>
      <img src={images.image.dash_line} alt='dash-line' className='absolute left-[317px] top-0' />
      <img src={images.image.dash_line_2} alt='dash-line-2' className='absolute right-[-29px] top-[385px]' />

      <div className='relative z-10 flex w-full flex-col gap-28 lg:flex-row'>
        <div className='flex w-full flex-col px-3 lg:pl-[105px]'>
          <h1 className='font-bold xs:text-[32px]/[42px] sm:text-[54px]/[70.2px]'>
            Current <br />
            Reactions
          </h1>

          <p className='mt-4 font-semibold leading-[24px] text-grey999/[.64]'>
            Reactions measured during the whole time interval <br /> at an F&B store, reflecting real-time customer{' '}
            <br /> engagement and satisfaction.
          </p>

          <div className='mt-[47px] flex flex-col gap-[26px] lg:min-w-[472px]'>
            {listTypePerson.map((type) => (
              <div
                key={type}
                onClick={() => setTypeActive(type)}
                className={classNames(
                  type === typeActive
                    ? 'py-5 lg:h-[164px] lg:w-[472px] lg:py-8'
                    : 'w-[250px] cursor-pointer lg:h-[120px] lg:w-[292px] lg:py-6',
                  'flex h-[100px] items-center justify-between rounded-3xl bg-grey100 px-6 transition-all duration-300 ease-in-out'
                )}
              >
                <div className='flex items-center gap-8'>
                  <img
                    src={type === 0 ? images.icon.unhappy_pink : images.icon.happy_green}
                    alt={`${type}-icon`}
                    className={classNames(
                      type === typeActive ? 'size-[60px] lg:size-[100px]' : 'size-[50px] lg:size-[68.5px]'
                    )}
                  />

                  <div>
                    <h4
                      className={classNames(
                        type === typeActive ? 'text-[24px]/[36px]' : 'text-[18px]/[27px]',
                        'font-semibold capitalize'
                      )}
                    >
                      {type === 0 ? 'Unhappy' : 'Happy'}
                    </h4>
                    <p
                      className={classNames(
                        type === typeActive ? 'text-[16px]/[24px]' : 'text-[14px]/[21px]',
                        'mt-1 text-grey999/[.64]'
                      )}
                    >
                      {type === 0 ? homeReportCurrent?.currentReactionUnhappy : homeReportCurrent?.currentReactionHappy}{' '}
                      persons
                    </p>
                  </div>
                </div>

                <div className={classNames(type === typeActive ? 'opacity-100' : 'opacity-0')}>
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='list-person pt-[30px] lg:w-[800px] lg:pr-[97px]'>
          <Swiper
            ref={swiperRef}
            loop
            grabCursor
            effect={'creative'}
            slidesPerView={1}
            initialSlide={2}
            freeMode={true}
            centeredSlides={true}
            creativeEffect={{
              perspective: true,
              limitProgress: 3,
              prev: {
                translate: ['-310px', 0, 0],
                rotate: [0, 0, 0],
                scale: 0.56
              },
              next: {
                translate: ['150px', 0, 0],
                rotate: [0, 0, 0],
                scale: 0.56
              }
            }}
            modules={[EffectCreative, Navigation, Autoplay]}
            navigation={{
              prevEl: prevRef.current ? prevRef.current : undefined,
              nextEl: nextRef.current ? nextRef.current : undefined
            }}
            onSlideChange={handleSlideChange}
          >
            {listDataRender?.map((person: any, index: number) => {
              return (
                <SwiperSlide key={person.id}>
                  <PersonreactionCard person={person} isActive={activeSlide === index} />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className='mt-10 flex items-center justify-center gap-4 pr-7'>
            <IconButton size='48' ref={prevRef} onClick={() => swiperRef.current?.swiper?.slidePrev()}>
              <ArrowLeftIcon className='size-6' />
            </IconButton>
            <IconButton size='48' ref={nextRef} onClick={() => swiperRef.current?.swiper?.slideNext()}>
              <ArrowRightIcon className='size-6' />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CurrentReactions
