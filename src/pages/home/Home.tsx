import { memo, useCallback, useEffect, useRef } from 'react'
import { listDataReport } from '~/assets/mocks/report'
import { Navbar } from '~/layouts/components/navbar'
import { useAppDispatch, useAppSelector } from '~/redux/configStore'
import { setDataKey, setReportHomeDataCurrent, setReportHomeDataOld } from '~/redux/report/report'
import { CurrentReactions, FoodBeverage, OrderReport, RealTimeReport, TodayReport } from '~/sections/home'
import Engagement from '~/sections/home/Engagement'
import { getRandomIntegerInRange } from '~/utils/random'
import { smoothScrollToElement } from '~/utils/scroll'

const Home = memo(() => {
  const dispatch = useAppDispatch()

  const foodBeverageRef = useRef<HTMLDivElement>(null)
  const todayReportRef = useRef<HTMLDivElement>(null)

  const { isFinishTimecount } = useAppSelector((s) => s.timecount)
  const { dataKey, homeReportCurrent } = useAppSelector((s) => s.report)

  useEffect(() => {
    if (isFinishTimecount) {
      dispatch(
        setDataKey(
          homeReportCurrent === null ? 0 : +dataKey === 0 ? 1 : +dataKey === 1 ? 2 : getRandomIntegerInRange(0, 100)
        )
      )
      if (+dataKey === 0) {
        dispatch(setReportHomeDataOld(listDataReport[0]))
        dispatch(setReportHomeDataCurrent(listDataReport[0]))
      } else if (+dataKey === 1) {
        dispatch(setReportHomeDataCurrent(listDataReport[1]))
      } else if (+dataKey === 2) {
        dispatch(setReportHomeDataOld(listDataReport[1]))
        dispatch(setReportHomeDataCurrent(listDataReport[2]))
      } else {
        dispatch(setReportHomeDataOld(homeReportCurrent))
        dispatch(
          setReportHomeDataCurrent({
            id: getRandomIntegerInRange(0, 100),
            currentVisitors: getRandomIntegerInRange(0, 100),
            todayVisitors: getRandomIntegerInRange(0, 100),
            unhappyVisitors: getRandomIntegerInRange(0, 100),
            reach: getRandomIntegerInRange(0, 100),
            engagement: getRandomIntegerInRange(0, 100),
            order: getRandomIntegerInRange(0, 100),
            payment: getRandomIntegerInRange(0, 100),
            unhappyPersons: getRandomIntegerInRange(0, 100),
            happyPersons: getRandomIntegerInRange(0, 1000)
          })
        )
      }
    }
  }, [isFinishTimecount, dataKey])

  const scrollToSection = useCallback(
    (id: string) => {
      const duration = 1000
      if (id === 'NavTimeIcon' && foodBeverageRef.current) {
        smoothScrollToElement(foodBeverageRef.current, duration)
      } else if (id === 'NavPieChartIcon' && todayReportRef.current) {
        smoothScrollToElement(todayReportRef.current, duration)
      }
    },
    [foodBeverageRef, todayReportRef]
  )

  return (
    <div className='max-w-[1440px] w-full h-full bg-grey500 relative'>
      <Navbar scrollToSection={scrollToSection} />
      <div ref={foodBeverageRef} className='relative z-20'>
        <FoodBeverage />
      </div>

      <div className='xs:hidden sm:flex w-full h-[907px] bg-ln-grey-white absolute left-0 top-[0px] flex items-center justify-between z-10'>
        <svg width='289' height='907' viewBox='0 0 289 907' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M0 0C63.3571 0 117.885 44.7698 130.218 106.915L289 907H0V0Z' fill='url(#paint0_linear_25_8393)' />
          <defs>
            <linearGradient
              id='paint0_linear_25_8393'
              x1='-72'
              y1='19.5'
              x2='234.499'
              y2='1002'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#F8F8F9' />
              <stop offset='1' stopColor='white' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>

        <svg width='289' height='907' viewBox='0 0 289 907' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M289 0C225.643 0 171.115 44.7698 158.782 106.915L0 907H289V0Z' fill='url(#paint0_linear_25_8394)' />
          <defs>
            <linearGradient
              id='paint0_linear_25_8394'
              x1='361'
              y1='19.5'
              x2='54.5005'
              y2='1002'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#F8F8F9' />
              <stop offset='1' stopColor='white' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='relative z-20'>
        <RealTimeReport />
      </div>

      <div className='overflow-hidden'>
        <CurrentReactions />
        <div ref={todayReportRef}>
          <TodayReport />
        </div>
        <Engagement />
      </div>

      <div className='relative'>
        <div className='h-[810px] bg-ln-white-5 mt-[151px] relative z-10' />

        <div className='relative z-20 mt-[-1240px]'>
          <OrderReport />
        </div>
      </div>
    </div>
  )
})

export default Home
