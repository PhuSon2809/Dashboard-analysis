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
  { src: AvatarImg7, alt: 'Avatar 8' }
]

const generateAvatars = (count) => {
  // Lấy các avatar thực tế từ mảng avatars
  const realAvatars = avatars.slice(0, Math.min(count, avatars.length))

  // Nếu count lớn hơn số avatar thực tế, tạo các avatar ảo
  if (count > avatars.length) {
    const fakeAvatars = new Array(count - avatars.length).fill(null).map((_, index) => ({
      src: `https://via.placeholder.com/150?text=Avatar+${avatars.length + index + 1}`, // Placeholder image
      alt: `Avatar ${avatars.length + index + 1}`
    }))

    // Gộp các avatar thực tế và ảo
    return [...realAvatars, ...fakeAvatars]
  }

  return realAvatars
}

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

  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())
  const [timeMarkers, setTimeMarkers] = useState<string[]>([])
  const [positions, setPositions] = useState<Record<string, number>>({})
  const [itemWidths, setItemWidths] = useState<Record<number, number>>({})
  const [distanceBetweenItems, setDistanceBetweenItems] = useState(0)
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

  // tính toán vị trí right của các item
  const positonRight = useMemo(() => {
    const lastMarker = +timeMarkers[timeMarkers.length - 1]
    const positionStart = 50
    const totalMinutesInHour = 60

    // Tính tổng số phút từ giờ hiện tại và phút hiện tại
    const currentTotalMinutes = currentHour * totalMinutesInHour + currentMinute
    const lastMarkerTotalMinutes = lastMarker * totalMinutesInHour

    // left = vị trí bắt đầu + khoảng cách giữa các item * (tổng số phút marker cuối - tổng số phút hiện tại)
    const left =
      positionStart + distanceBetweenItems * ((lastMarkerTotalMinutes - currentTotalMinutes) / totalMinutesInHour)

    return left
  }, [currentHour, currentMinute, distanceBetweenItems, timeMarkers])

  // cập nhật giờ mỗi phút
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentHour(now.getHours())
      setCurrentMinute(now.getMinutes())
    }, 60000) // Cập nhật mỗi phút

    return () => clearInterval(interval)
  }, [])
  const listDataReport = useMemo(
    () => [
      homeReportCurrent?.realTimeReportTime?.['10'].realTimeReportReach,
      homeReportCurrent?.realTimeReportTime?.['10'].realTimeReportEngagement,
      homeReportCurrent?.realTimeReportTime?.['10'].realTimeReportOrder,
      homeReportCurrent?.realTimeReportTime?.['10'].realTimePayment
    ],
    [homeReportCurrent]
  )
  // tính toán dữ liệu cho từng item
  const titleRenders = useMemo(
    () =>
      listTitleChart.map((title, i) => ({ id: i + 1, title, count: listDataReport[i], content: tooltipContent[i] })),
    [listDataReport]
  )

  const isHeightestItem = useMemo(
    () => titleRenders.reduce((max, item) => (Number(item.count) > Number(max.count) ? item : max), titleRenders[0]),
    [titleRenders]
  )
  // tính khoảng cách giữa các item

  useEffect(() => {
    if (markerRefs.current.length > 1) {
      const firstItem = markerRefs.current[0]
      const secondItem = markerRefs.current[1]
      if (firstItem && secondItem) {
        const distance = secondItem.offsetLeft - firstItem.offsetLeft
        setDistanceBetweenItems(distance)
      }
    }
  }, [timeMarkers])
  // tính toán marker cho timeline
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

  const calculateWidths = (titleRenders) => {
    const maxItem = titleRenders.reduce((max, item) => (item.count > max.count ? item : max), titleRenders[0])
    const maxCount = maxItem.count

    return titleRenders.map((item) => {
      if (item.count === maxCount) {
        return 400 // giá trị tối đa
      }
      const width = 200 + Math.floor((item.count - 1) / 5)
      return Math.min(width, 380) // đảm bảo không vượt quá 380px
    })
  }

  useEffect(() => {
    const updateWidths = () => {
      const newItemWidths = calculateWidths(titleRenders)
      const widthMap = {}
      newItemWidths.forEach((width, index) => {
        widthMap[index] = width
      })
      setItemWidths(widthMap)
    }

    updateWidths()
  }, [titleRenders])

  return (
    <div className='h-full w-full p-10'>
      <div className='flex h-full min-w-full'>
        <div ref={tableLeftRef} className='table-left min-w-[200px] pt-[84px]'>
          {titleRenders.map((item) => (
            <p
              key={`${item.title}-${item.id}`}
              data-id={`${item.title}-${item.id}`}
              className={classNames(
                'table-left-item h-[110px] text-blackMain',
                item.id === hoveredItemId ? 'text-[24px]/[36px] font-semibold' : 'text-[18px]/[27px] font-medium'
              )}
            >
              {item.title}
            </p>
          ))}
        </div>
        <div className='table-container relative flex w-full flex-grow flex-col'>
          <div ref={tableHeaderRef} className='hidden-scroll relative flex h-full w-full flex-1 items-center gap-20'>
            {timeMarkers.map((hour, index) => (
              <div
                key={index}
                ref={index <= 5 ? (el) => el && (markerRefs.current[index] = el) : null}
                className='time-items flex h-full min-w-[42px] flex-col items-center gap-8'
              >
                <p
                  className={classNames(
                    'table-header-item font-medium',
                    +hour === currentHour ? 'text-blackMaim' : 'text-[#999999]'
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
            <div className='table-content relative flex h-full items-end'>
              {titleRenders.map((item, index) => {
                const isHeightest = item.id === isHeightestItem?.id
                const top = (positions[`${item.title}-${item.id}`] || 0) - (isHeightest ? 60 : 50)

                return (
                  item?.count > 0 && (
                    <TooltipCustom position='right' key={item.id} content={item.content}>
                      <div
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        ref={(el) => el && (itemRefs.current[index] = el)}
                        className={classNames(
                          'time-line-items absolute flex min-w-[170px] rounded-xl text-center text-white transition-all duration-200 ease-in-out',
                          isHeightest ? 'h-[60px] px-8 shadow-s-17 hover:h-20' : 'h-[60px] px-[18px] hover:h-20',
                          index === 0
                            ? 'bg-ln-blue-yellow'
                            : index === 1
                              ? 'bg-ln-pink-2'
                              : index === 2
                                ? 'bg-ln-pink-blue'
                                : 'bg-ln-yellow-red'
                        )}
                        style={{
                          right: `${positonRight}px`,
                          top: `${top}px`,
                          width: itemWidths[index]
                        }}
                      >
                        <div className={classNames('flex h-full w-full cursor-pointer items-center justify-between')}>
                          <span className={classNames('text-[16px]/[24px]')}>{item?.count} persons</span>
                          <AvatarGroup limit={isHeightest ? 4 : 1}>
                            {generateAvatars(item.count).map((avatar, index) => (
                              <AvatarItem key={index} src={avatar.src} alt={avatar.alt} />
                            ))}
                          </AvatarGroup>
                        </div>
                      </div>
                    </TooltipCustom>
                  )
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
