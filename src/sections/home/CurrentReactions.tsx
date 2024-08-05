import classNames from 'classnames'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { EffectCreative, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import images from '~/assets'
import { IconButton } from '~/components/iconButton'
import { ArrowLeftIcon, ArrowRightIcon, ChevronRight } from '~/components/icons'
import { PersonreactionCard } from '~/components/personreactionCard'
import './styles.scss'
import { useAppSelector } from '~/redux/configStore'

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
    [typeActive]
  )

  return (
    <div className='pt-[120px] relative'>
      <img src={images.image.dash_line} alt='dash-line' className='absolute left-[317px] top-0' />
      <img src={images.image.dash_line_2} alt='dash-line-2' className='absolute right-[-29px] top-[385px]' />

      <div className='w-full flex gap-28 relative z-10'>
        <div className='pl-[105px]'>
          <h1 className='xs:text-[32px]/[42px] sm:text-[54px]/[70.2px] font-bold'>
            Current <br />
            Reactions
          </h1>

          <p className='leading-[24px] text-grey999/[.64] mt-4'>
            Reactions measured during the whole time interval <br /> at an F&B store, reflecting real-time customer{' '}
            <br /> engagement and satisfaction.
          </p>

          <div className='min-w-[472px] flex flex-col gap-[26px] mt-[47px]'>
            {listTypePerson.map((type) => (
              <div
                key={type}
                onClick={() => setTypeActive(type)}
                className={classNames(
                  type === typeActive ? 'w-[472px] h-[164px] py-8' : 'w-[292px] h-[120px] py-6 cursor-pointer',
                  'px-6 bg-grey100 rounded-3xl flex items-center justify-between transition-all duration-300 ease-in-out'
                )}
              >
                <div className='flex items-center gap-8'>
                  <img
                    src={type === 0 ? images.icon.unhappy_pink : images.icon.happy_green}
                    alt={`${type}-icon`}
                    className={classNames(type === typeActive ? 'size-[100px]' : 'size-[68.5px]')}
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
                        type === typeActive ? 'text-[16px]/[24px]' : 'text-[14px]/[21px] ',
                        'text-grey999/[.64] mt-1'
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
        <div className='list-person w-[800px] pt-[30px] pr-[97px]'>
          <Swiper
            ref={swiperRef}
            loop
            grabCursor
            effect={'creative'}
            slidesPerView={1}
            initialSlide={2}
            freeMode={true}
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
            modules={[EffectCreative, Navigation]}
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
          <div className='flex items-center justify-center gap-4 mt-10 pr-7'>
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
