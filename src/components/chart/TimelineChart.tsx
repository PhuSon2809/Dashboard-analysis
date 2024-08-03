import classNames from 'classnames'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import AvatarImg1 from '~/assets/images/Avatar (1).svg'
import AvatarImg2 from '~/assets/images/Avatar (2).svg'
import AvatarImg3 from '~/assets/images/Avatar (3).svg'
import AvatarImg4 from '~/assets/images/Avatar (4).svg'
import AvatarImg5 from '~/assets/images/Avatar (5).svg'
import AvatarImg6 from '~/assets/images/Avatar (6).svg'
import AvatarImg7 from '~/assets/images/Avatar (7).svg'
import AvatarImg from '~/assets/images/Avatar.svg'
import { AvatarGroup, AvatarItem } from '~/components/avatar/avatar'
import { useAppSelector } from '~/redux/configStore'
import TooltipCustom from '../tooltip/tooltip'

const avatars = [
  { src: AvatarImg, alt: 'Avatar 1' },
  { src: AvatarImg1, alt: 'Avatar 2' },
  { src: AvatarImg2, alt: 'Avatar 3' },
  { src: AvatarImg3, alt: 'Avatar 4' },
  { src: AvatarImg4, alt: 'Avatar 5' },
  { src: AvatarImg5, alt: 'Avatar 6' },
  { src: AvatarImg6, alt: 'Avatar 7' },
  { src: AvatarImg7, alt: 'Avatar 8' },
  { src: AvatarImg, alt: 'Avatar 1' },
  { src: AvatarImg1, alt: 'Avatar 2' },
  { src: AvatarImg2, alt: 'Avatar 3' },
  { src: AvatarImg3, alt: 'Avatar 4' },
  { src: AvatarImg4, alt: 'Avatar 5' },
  { src: AvatarImg5, alt: 'Avatar 6' },
  { src: AvatarImg6, alt: 'Avatar 7' },
  { src: AvatarImg7, alt: 'Avatar 8' }
]

const listTitleChart = ['Reach', 'Engagement', 'Order', 'Payment']

const tooltipContent = [
  'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.',
  'Customers show interest by seeking more information about the store, menu, specials, or ambiance through online research or by visiting the store.',
  'The step taken from deciding to order food or drinks to completing the transaction and receiving their order.',
  'The phase of selecting a payment method, completing the transaction, and receiving confirmation.'
]

const TimelineChart = memo(() => {
  const tableHeaderRef = useRef<HTMLDivElement>(null)
  const tableLeftRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  itemRefs.current = []
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])
  markerRefs.current = []

  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const currentHour = new Date().getHours()
  const listDataReport = useMemo(
    () => [
      homeReportCurrent?.reach,
      homeReportCurrent?.engagement,
      homeReportCurrent?.order,
      homeReportCurrent?.payment
    ],
    [homeReportCurrent]
  )

  const titleRenders = useMemo(
    () =>
      listTitleChart.map((title, i) => ({ id: i + 1, title, count: listDataReport[i], content: tooltipContent[i] })),
    [listDataReport]
  )

  const isHeightestItem = useMemo(
    () => titleRenders.reduce((max, item) => (Number(item.count) > Number(max.count) ? item : max), titleRenders[0]),
    [titleRenders]
  )

  const [timeMarkers, setTimeMarkers] = useState<string[]>([])
  const [positions, setPositions] = useState<Record<string, number>>({})
  const [itemWidths, setItemWidths] = useState<Record<number, number>>({})
  const [widthUpToSixthMarker, setWidthUpToSixthMarker] = useState<number>(0)

  useEffect(() => {
    const currentDate = new Date()
    const markers: string[] = []
    for (let i = -5; i <= 2; i++) {
      const date = new Date(currentDate.getTime())
      date.setHours(currentHour + i)
      markers.push(date.getHours().toLocaleString())
    }
    setTimeMarkers(markers)
  }, [currentHour])

  useEffect(() => {
    const positions: Record<string, number> = {}
    document.querySelectorAll('.table-left-item').forEach((element) => {
      const id = element.getAttribute('data-id')
      if (id) positions[id] = (element as HTMLElement).offsetTop - 200
    })
    setPositions(positions)
  }, [titleRenders])

  useEffect(() => {
    const updateWidths = () => {
      const newItemWidths: Record<number, number> = {}
      itemRefs.current.forEach((item, index) => {
        if (item) newItemWidths[index] = item.offsetWidth
      })
      setItemWidths(newItemWidths)
    }

    requestAnimationFrame(updateWidths)
  }, [titleRenders])

  useEffect(() => {
    if (markerRefs.current.length >= 6) {
      const width = markerRefs.current.slice(0, 6).reduce((totalWidth, marker) => {
        if (marker) return totalWidth + marker.offsetWidth
        return totalWidth
      }, 0)
      setWidthUpToSixthMarker(width)
    }
  }, [timeMarkers])

  return (
    <div className='w-full h-full p-10'>
      <div className='min-w-full h-full flex'>
        <div ref={tableLeftRef} className='table-left min-w-[200px] pt-[84px]'>
          {titleRenders.map((item) => (
            <p
              key={`${item.title}-${item.id}`}
              data-id={`${item.title}-${item.id}`}
              className={classNames(
                'table-left-item h-[110px] text-blackMain',
                item.id === isHeightestItem?.id ? 'text-[24px]/[36px] font-semibold' : 'text-[18px]/[27px] font-medium'
              )}
            >
              {item.title}
            </p>
          ))}
        </div>
        <div className='table-container w-full flex flex-col flex-grow relative'>
          <div ref={tableHeaderRef} className='h-full w-full flex flex-1 items-center gap-20 relative hidden-scroll'>
            {timeMarkers.map((hour, index) => (
              <div
                key={index}
                ref={index <= 5 ? (el) => el && (markerRefs.current[index] = el) : null}
                className='min-w-[42px] h-full flex flex-col items-center gap-8'
              >
                <p
                  className={classNames(
                    'table-header-item font-medium',
                    +hour === currentHour ? 'text-blackMaim' : 'text-[#999999] '
                  )}
                >
                  {`${hour.padStart(2, '0')}:00`}
                </p>
                <div
                  className={`box h-full border-0 border-l border-dashed ${+hour === currentHour ? 'border-blackMain' : 'border-[#E5E5E5]'}`}
                />
              </div>
            ))}
          </div>
          <div className='absolute inset-0'>
            <div className='table-content h-full flex items-end relative'>
              {titleRenders.map((item, index) => {
                const isHeightest = item.id === isHeightestItem?.id
                const top = (positions[`${item.title}-${item.id}`] || 0) - (isHeightest ? 60 : 50)
                const left = widthUpToSixthMarker + (80 * 5 - 10) - itemWidths[index]

                return (
                  <TooltipCustom position='right' key={item.id} content={item.content}>
                    <div
                      ref={(el) => el && (itemRefs.current[index] = el)}
                      className={classNames(
                        'time-line-items rounded-xl text-white text-center absolute flex transition-all duration-200 ease-in-out',
                        isHeightest ? 'h-20 px-8 shadow-s-17' : 'h-[60px] px-[18px]',
                        index === 0
                          ? 'bg-ln-blue-yellow'
                          : index === 1
                            ? 'bg-ln-pink-2'
                            : index === 2
                              ? 'bg-ln-pink-blue'
                              : 'bg-ln-yellow-red'
                      )}
                      style={{
                        left: `${left}px`,
                        top: `${top}px`
                      }}
                    >
                      <div
                        className={classNames(
                          'w-full h-full flex items-center justify-between cursor-pointer',
                          isHeightest ? 'gap-[30px]' : 'gap-[70px]'
                        )}
                      >
                        <span
                          className={classNames(
                            'text-nowrap',
                            isHeightest ? 'text-[20px]/[30px] font-semibold' : 'text-[16px]/[24px] font-medium'
                          )}
                        >
                          {item?.count} persons
                        </span>
                        <AvatarGroup
                          limit={
                            Number(item.count) > 40
                              ? 8
                              : Number(item.count) > 30
                                ? 6
                                : Number(item.count) > 9
                                  ? 4
                                  : Number(item.count) < 9
                                    ? 2
                                    : 2
                          }
                          isActive={isHeightest}
                        >
                          {avatars.slice(0, item.count).map((avatar, index) => (
                            <AvatarItem key={index} src={avatar.src} alt={avatar.alt} isActive={isHeightest} />
                          ))}
                        </AvatarGroup>
                      </div>
                    </div>
                  </TooltipCustom>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default TimelineChart
