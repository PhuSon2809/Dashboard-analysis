import { Tooltip } from '@radix-ui/themes'
import React, { useEffect, useRef, useState } from 'react'
import AvatarImg1 from '~/assets/images/Avatar (1).svg'
import AvatarImg2 from '~/assets/images/Avatar (2).svg'
import AvatarImg3 from '~/assets/images/Avatar (3).svg'
import AvatarImg4 from '~/assets/images/Avatar (4).svg'
import AvatarImg5 from '~/assets/images/Avatar (5).svg'
import AvatarImg6 from '~/assets/images/Avatar (6).svg'
import AvatarImg7 from '~/assets/images/Avatar (7).svg'
import AvatarImg from '~/assets/images/Avatar.svg'
import { AvatarGroup, AvatarItem } from '~/components/avatar/avatar'

interface ITimeLineChart {
  data: {
    id: number
    title: string
    start: string
    end: string
    bgColor: string
    count: string
    tooltipContent: string
  }[]
}

const avatars = [
  { src: AvatarImg, alt: 'Avatar 1' },
  { src: AvatarImg1, alt: 'Avatar 2' },
  { src: AvatarImg2, alt: 'Avatar 3' },
  { src: AvatarImg3, alt: 'Avatar 4' },
  { src: AvatarImg4, alt: 'Avatar 5' },
  { src: AvatarImg5, alt: 'Avatar 6' },
  { src: AvatarImg6, alt: 'Avatar 7' },
  { src: AvatarImg7, alt: 'Avatar 8' }
]

const TimelineChart: React.FC<ITimeLineChart> = ({ data }) => {
  const tableHeaderRef = useRef<HTMLDivElement>(null)
  const tableLeftRef = useRef<HTMLDivElement>(null)

  const [positions, setPositions] = useState<Record<string, number>>({})
  const [contentWidthHeight, setContentWidthHeight] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const currentHour = new Date().getHours()

  useEffect(() => {
    if (tableHeaderRef.current) {
      setContentWidthHeight({
        ...contentWidthHeight,
        width: tableHeaderRef.current.scrollWidth
      })
    }

    if (tableLeftRef.current) {
      setContentWidthHeight({
        ...contentWidthHeight,
        height: tableLeftRef.current.scrollHeight - 100
      })
    }
  }, [])

  useEffect(() => {
    if (tableHeaderRef.current) {
      const currentHourElement = tableHeaderRef.current.children[currentHour] as HTMLElement
      if (currentHourElement) {
        if (tableHeaderRef.current.parentElement) {
          tableHeaderRef.current.parentElement.scrollTo({
            left: currentHourElement.offsetLeft,
            behavior: 'smooth'
          })
        }
      }
    }
  }, [currentHour])

  useEffect(() => {
    const positions: Record<string, number> = {}
    document.querySelectorAll('.table-left-item').forEach((element) => {
      const id = element.getAttribute('data-id')
      if (id) {
        positions[id] = (element as HTMLElement).offsetTop - 250
        console.log('element.getBoundingClientRect().top:', (element as HTMLElement).offsetTop)
      }
    })
    setPositions(positions)
  }, [data])

  const getPixelFromTime = (time: string) => {
    const date = new Date(time)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    return hours * 100 + (minutes / 60) * 100
  }

  const getLimit = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const diffInMs = endDate.getTime() - startDate.getTime()

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

    if (diffInHours <= 1) {
      return 0
    }

    return diffInHours
  }

  return (
    <div className='w-full h-full p-10 overflow-hidden'>
      <div className='min-w-full h-full flex'>
        <div ref={tableLeftRef} className='table-left min-w-[200px] overflow-y-scroll pt-[100px]'>
          {data.map((item) => (
            <div
              data-id={`${item.title}-${item.id}`}
              key={item.id}
              className={`table-left-item h-[100px] text-black font-semibold ${item.id === data.reduce((max, item) => (item.count > max.count ? item : max), data[0]).id ? 'text-[20px] font-extrabold' : ''}`}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className='table-container w-full flex flex-col flex-grow overflow-x-scroll relative'>
          <div ref={tableHeaderRef} className='table-header h-[100px] flex items-center relative'>
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className={`table-header-item w-[100px] flex-shrink-0 text-center ${
                  index === currentHour ? 'text-black font-bold' : 'text-[#999999]'
                }`}
              >
                {`${index.toString().padStart(2, '0')}:00`}
              </div>
            ))}
          </div>
          <div
            className='table-content h-full bg-white flex relative'
            style={{ width: contentWidthHeight.width, height: contentWidthHeight.height }}
          >
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className={`border-l opacity-50 border-dashed ${index === currentHour ? 'border-black' : 'border-[#E5E5E5]'} `}
                style={{
                  height: '100%',
                  position: 'absolute',
                  left: `${index * 100 + 50}px`,
                  top: '0'
                }}
              ></div>
            ))}
            {data.map((item) => {
              const startPixel = getPixelFromTime(item.start)
              const endPixel = getPixelFromTime(item.end)
              const width = endPixel - startPixel
              const top = positions[`${item.title}-${item.id}`] || 0

              return (
                <div
                  key={item.id}
                  className='time-line-items h-[50px] rounded-[25px] text-white text-center absolute flex '
                  style={{
                    background: item.bgColor,
                    left: `${startPixel + 50}px`,
                    width: `${width}px`,
                    top: `${top - 50}px`
                  }}
                >
                  <Tooltip content={item.tooltipContent}>
                    <div className='flex w-full h-full gap-5 px-5 items-center justify-between cursor-pointer'>
                      <span className='text-[14px] font-semibold'>{item.count}</span>
                      <AvatarGroup limit={getLimit(item.start, item.end)}>
                        {avatars.map((avatar, index) => (
                          <AvatarItem key={index} src={avatar.src} alt={avatar.alt} />
                        ))}
                      </AvatarGroup>
                    </div>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineChart
