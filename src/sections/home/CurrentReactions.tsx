import classNames from 'classnames'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { EffectCreative, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import images from '~/assets'
import { IconButton } from '~/components/iconButton'
import { ArrowLeftIcon, ArrowRightIcon, ChevronRight } from '~/components/icons'
import { PersonreactionCard } from '~/components/personreactionCard'
import './styles.scss'

const listData = [
  {
    id: 1,
    name: 'Table 1',
    gender: 1,
    age: '19 - 24'
  },
  {
    id: 2,
    name: 'Table 2',
    gender: 0,
    age: '19 - 24'
  },
  {
    id: 3,
    name: 'Table 3',
    gender: 1,
    age: '19 - 24'
  },
  {
    id: 4,
    name: 'Table 4',
    gender: 0,
    age: '19 - 24'
  },
  {
    id: 5,
    name: 'Table 5',
    gender: 1,
    age: '19 - 24'
  },
  {
    id: 6,
    name: 'Table 6',
    gender: 0,
    age: '19 - 24'
  },
  {
    id: 7,
    name: 'Table 7',
    gender: 1,
    age: '19 - 24'
  },
  {
    id: 8,
    name: 'Table 8',
    gender: 0,
    age: '19 - 24'
  },
  {
    id: 9,
    name: 'Table 0',
    gender: 0,
    age: '19 - 24'
  }
]

const CurrentReactions = memo(() => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const [typeActive, setTypeActive] = useState<string>('unhappy')
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const listTypePerson = useMemo(() => ['unhappy', 'happy'], [])

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) setActiveSlide(swiperRef.current.swiper.realIndex)
  }, [swiperRef])

  return (
    <div className='pt-[120px] relative'>
      <img src={images.image.dash_line} alt='dash-line' className='absolute left-[317px] top-0' />
      <img src={images.image.dash_line_2} alt='dash-line-2' className='absolute right-[-29px] top-[385px]' />

      <div className='w-full flex gap-28 relative z-10'>
        <div className='pl-[105px]'>
          <h1 className='text-[54px]/[70.2px] font-bold'>
            Current <br />
            Reactions
          </h1>

          <p className='text-[16px]/[24px] text-grey999/[.64] mt-4'>
            Elevate your essence with "Vamp one perfume <br /> bottle", an embodiment of refined masculinity <br /> and
            timeless.
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
                    src={type === 'unhappy' ? images.icon.unhappy_pink : images.icon.happy_green}
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
                      {type}
                    </h4>
                    <p
                      className={classNames(
                        type === typeActive ? 'text-[16px]/[24px]' : 'text-[14px]/[21px] ',
                        'text-grey999/[.64] mt-1'
                      )}
                    >
                      {type === 'unhappy' ? '3' : '8'} persons
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
            {listData.map((person, index) => {
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
