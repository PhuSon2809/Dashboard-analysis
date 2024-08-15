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

const listTitleChart = ['Reach', 'Engage', 'Order', 'Pay']

const tooltipContent = [
  'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.',
  'Customers show interest by seeking more information about the store, menu, specials, or ambiance through online research or by visiting the store.',
  'The step taken from deciding to order food or drinks to completing the transaction and receiving their order.',
  'The phase of selecting a payment method, completing the transaction, and receiving confirmation.'
]

const TimelineChartMobileV2 = memo(() => {
  const tableHeaderRef = useRef<HTMLDivElement>(null)
  const tableBottomRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  itemRefs.current = []
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])
  markerRefs.current = []
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())
  const [timeMarkers, setTimeMarkers] = useState<string[]>([])
  const [distanceBetweenItems, setDistanceBetweenItems] = useState(0)
  const [itemHeights, setItemHeights] = useState<Record<number, number>>({})
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)
  const [positions, setPositions] = useState<Record<string, number>>({})
  console.log('positions:', positions)
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
    for (let i = -4; i <= 0; i++) {
      const date = new Date(currentDate.getTime())
      date.setHours(currentHour + i)
      markers.push(date.getHours().toLocaleString())
    }
    // cập nhật giờ mỗi phút

    const interval = setInterval(() => {
      const now = new Date()
      setCurrentHour(now.getHours())
      setCurrentMinute(now.getMinutes())
    }, 10000) // Cập nhật mỗi 30s
    setTimeMarkers(markers)

    return () => clearInterval(interval)
  }, [currentHour])

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

  useEffect(() => {
    if (markerRefs.current.length > 0) {
      markerRefs.current.forEach((ref) => {
        if (ref) {
          if (currentMinute < 60) {
            const top = (currentMinute / 60) * distanceBetweenItems
            ref.style.transform = `translateY(-${top}px)`
          } else {
            const top = ((currentMinute - 60) / 60) * distanceBetweenItems
            ref.style.transform = `translateY(-${top}px)`
          }
        }
      })
    }
  }, [currentMinute, distanceBetweenItems])

  useEffect(() => {
    const positions: Record<string, number> = {}
    document.querySelectorAll('.table-bottom-item').forEach((element) => {
      const id = element.getAttribute('data-id')
      if (id) positions[id] = (element as HTMLElement).offsetLeft - 30
    })
    setPositions(positions)
  }, [titleRenders])
  return (
    <div className='h-full w-full py-8 px-4 overflow-hidden'>
      <div className='h-full'>
        <div className='table-container relative flex items-end h-full w-full flex-grow-0 pb-5'>
          <div
            ref={tableHeaderRef}
            className='overflow-hidden max-h-[400px] z-max:w-[40px] s-max:w-[45px] table-time grid h-full'
          >
            {timeMarkers.map((hour, index) => (
              <div
                key={index}
                ref={index <= 4 ? (el) => el && (markerRefs.current[index] = el) : null}
                className='time-items z-max:text-[13px] flex items-end w-full flex-shink-0   gap-8'
              >
                <p
                  className={classNames(
                    'table-time-item font-medium',
                    +hour === currentHour ? 'text-blackMaim' : 'text-[#999999]'
                  )}
                >
                  {`${hour.padStart(2, '0')}:00`}
                </p>
              </div>
            ))}
          </div>
          <div className='w-full h-full relative grid pl-4 z-max:pl-1'>
            {timeMarkers.map((hour, index) => (
              <div
                key={index}
                className={`box   border-0 border-b border-dashed ${+hour === currentHour ? 'border-blackMain' : 'border-[#E5E5E5]'}`}
              />
            ))}
          </div>
          <div className='absolute inset-0'>
            <div className='table-content relative flex h-full'>
              {titleRenders.map((item, index) => {
                const isHeightest = item.id === isHeightestItem?.id
                const left = positions[`${item.title}-${item.id}`] || 0
                return (
                  item?.count > 0 && (
                    <TooltipCustom position='top' key={item.id} content={item.content}>
                      <div
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        ref={(el) => el && (itemRefs.current[index] = el)}
                        className={classNames(
                          'time-line-items absolute flex flex-col min-h-[170px] rounded-xl text-center w-[50px] z-max:w-[40px] z-max:rounded-lg text-white transition-all duration-200 ease-in-out ',
                          isHeightest ? 'h-[60px] shadow-s-17 hover:h-20' : 'h-[60px]  hover:h-20',
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
                          bottom: `${20}px`,
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
        <div ref={tableBottomRef} className='table-bottom z-max:pl-[40px] pl-[55px] flex gap-5   '>
          {titleRenders.map((item) => (
            <p
              key={`${item.title}-${item.id}`}
              data-id={`${item.title}-${item.id}`}
              className={classNames(
                'table-bottom-item  text-blackMain',
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

export default TimelineChartMobileV2
