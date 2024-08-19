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
import TooltipCustom from '~/components/tooltip/tooltip'
import { useAppSelector } from '~/redux/configStore'

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
console.log('avatars:', avatars)

// const generateAvatars = (count) => {
//   // Lấy các avatar thực tế từ mảng avatars
//   const realAvatars = avatars.slice(0, Math.min(count, avatars.length))

//   // Nếu count lớn hơn số avatar thực tế, tạo các avatar ảo
//   if (count > avatars.length) {
//     const fakeAvatars = new Array(count - avatars.length).fill(null).map((_, index) => ({
//       src: `https://via.placeholder.com/150?text=Avatar+${avatars.length + index + 1}`, // Placeholder image
//       alt: `Avatar ${avatars.length + index + 1}`
//     }))

//     // Gộp các avatar thực tế và ảo
//     return [...realAvatars, ...fakeAvatars]
//   }

//   return realAvatars
// }

const listTitleChart = ['Reach', 'Engage', 'Order', 'Payment']

const tooltipContent = [
  'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.',
  'Customers show interest by seeking more information about the store, menu, specials, or ambiance through online research or by visiting the store.',
  'The step taken from deciding to order food or drinks to completing the transaction and receiving their order.',
  'The phase of selecting a payment method, completing the transaction, and receiving confirmation.'
]

const TimelineChartMobile = memo(() => {
  const tableHeaderRef = useRef<HTMLDivElement>(null)
  const tableBottomRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  itemRefs.current = []
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])
  markerRefs.current = []
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())
  const [timeMarkers, setTimeMarkers] = useState<string[]>([])
  const [itemHeights, setItemHeights] = useState<Record<number, number>>({})
  const [distanceBetweenItems, setDistanceBetweenItems] = useState(0)
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

  const { homeReportCurrent } = useAppSelector((s) => s.report)
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

  // tính toán marker cho timeline
  useEffect(() => {
    const currentDate = new Date()
    const markers: string[] = []
    for (let i = -3; i <= 2; i++) {
      const date = new Date(currentDate.getTime())
      date.setHours(currentHour + i)
      markers.push(date.getHours().toLocaleString())
    }
    // cập nhật giờ mỗi phút

    const interval = setInterval(() => {
      const now = new Date()
      setCurrentHour(now.getHours())
      setCurrentMinute(now.getMinutes())
    }, 60000) // Cập nhật mỗi phút
    setTimeMarkers(markers)

    return () => clearInterval(interval)
  }, [currentHour])

  // tính khoảng cách giữa các item

  useEffect(() => {
    if (markerRefs.current.length > 1) {
      const firstItem = markerRefs.current[0]
      const secondItem = markerRefs.current[1]
      if (firstItem && secondItem) {
        const distance = secondItem.offsetTop - firstItem.offsetTop
        setDistanceBetweenItems(distance)
      }
    }
  }, [timeMarkers])

  // tính toán chiều cao cho từng item
  useEffect(() => {
    const calculateHeight = (titleRenders) => {
      const maxItem = titleRenders.reduce((max, item) => (item.count > max.count ? item : max), titleRenders[0])
      const maxCount = maxItem.count

      return titleRenders.map((item) => {
        if (item.count === maxCount) {
          return 300 // giá trị tối đa
        }
        const height = 100 + Math.floor((item.count - 1) / 10)
        return Math.min(height, 280) // đảm bảo không vượt quá 280px
      })
    }

    const updateHeight = () => {
      const newItemHeight = calculateHeight(titleRenders)
      const heightMap = {}
      newItemHeight.forEach((height, index) => {
        heightMap[index] = height
      })
      setItemHeights(heightMap)
    }

    updateHeight()
  }, [titleRenders])

  // tính toán vị trí bottom của các item
  const potionBottom = useMemo(() => {
    const lastMarker = +timeMarkers[timeMarkers.length - 1]
    const positionStart = -40
    const totalMinutesInHour = 60

    // Tính tổng số phút từ giờ hiện tại và phút hiện tại
    const currentTotalMinutes = currentHour * totalMinutesInHour + currentMinute
    const lastMarkerTotalMinutes = lastMarker * totalMinutesInHour

    // left = vị trí bắt đầu + khoảng cách giữa các item * (tổng số phút marker cuối - tổng số phút hiện tại)
    const bottom =
      positionStart + distanceBetweenItems * ((lastMarkerTotalMinutes - currentTotalMinutes) / totalMinutesInHour)

    return bottom
  }, [currentHour, currentMinute, distanceBetweenItems, timeMarkers])

  return (
    <div className='h-full w-full px-4 py-8'>
      <div className='h-full'>
        <div className='table-container relative flex h-full w-full flex-grow-0'>
          <div ref={tableHeaderRef} className='table-header overflow-hidden pt-[100px] s-max:w-[45px]'>
            {timeMarkers.map((hour, index) => (
              <div
                key={index}
                ref={index <= 3 ? (el) => el && (markerRefs.current[index] = el) : null}
                className='time-items flex-shink-0 flex min-h-[80px] w-full gap-8'
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
            <div className='table-content relative flex h-full'>
              {titleRenders.map((item, index) => {
                const isHeightest = item.id === isHeightestItem?.id
                // const top = (positions[`${item.title}-${item.id}`] || 0) - (isHeightest ? 60 : 50)

                return (
                  item?.count > 0 && (
                    <TooltipCustom position='top' key={item.id} content={item.content}>
                      <div
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        ref={(el) => el && (itemRefs.current[index] = el)}
                        className={classNames(
                          'time-line-items absolute flex min-h-[170px] w-[50px] flex-col rounded-xl text-center text-white transition-all duration-200 ease-in-out',
                          isHeightest ? 'h-[60px] shadow-s-17 hover:h-20' : 'h-[60px] hover:h-20',
                          index === 0
                            ? 'bg-ln-blue-yellow'
                            : index === 1
                              ? 'bg-ln-pink-2'
                              : index === 2
                                ? 'bg-ln-pink-blue'
                                : 'bg-ln-yellow-red'
                        )}
                        style={{
                          left: `${50}px`,
                          bottom: `${potionBottom}px`,
                          height: itemHeights[index]
                        }}
                      ></div>
                    </TooltipCustom>
                  )
                )
              })}
            </div>
          </div>
        </div>
        <div ref={tableBottomRef} className='table-bottom flex items-center justify-center gap-5 pl-9'>
          {titleRenders.map((item) => (
            <p
              key={`${item.title}-${item.id}`}
              data-id={`${item.title}-${item.id}`}
              className={classNames(
                'table-bottom-item text-blackMain',
                item.id === hoveredItemId ? 'text-[18px]/[20px] font-semibold' : 'text-[13px]/[27px] font-medium'
              )}
            >
              {item.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
})

export default TimelineChartMobile
