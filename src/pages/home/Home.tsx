import { memo, useCallback, useRef } from 'react'
import MostUsedPaymentV2 from '~/components/pay/mostUsedPaymentV2'
import PaymentReactionChartV2 from '~/components/pay/paymentReactionChartV2'
import { Navbar } from '~/layouts/components/navbar'
import { CurrentReactions, FoodBeverage, OrderReport, RealTimeReport, TodayReport } from '~/sections/home'
import Engagement from '~/sections/home/Engagement'
import { smoothScrollToElement } from '~/utils/scroll'

const Home = memo(() => {
  const foodBeverageRef = useRef<HTMLDivElement>(null)
  const todayReportRef = useRef<HTMLDivElement>(null)

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
    <div className='relative h-full w-full max-w-[1440px] overflow-x-hidden bg-grey500'>
      <Navbar scrollToSection={scrollToSection} />
      <div ref={foodBeverageRef} className='relative z-20'>
        <FoodBeverage />
      </div>

      <div className='absolute left-0 top-[0px] z-10 flex h-[907px] w-full items-center justify-between bg-ln-grey-white xs:hidden sm:flex'>
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

      <div className='overflow-hidden  lg:px-0'>
        <CurrentReactions />
        <div ref={todayReportRef}>
          <TodayReport />
        </div>
        <Engagement />
      </div>

      <div className='relative'>
        <div className='relative z-10 lg:mt-[151px] lg:h-[810px] bg-ln-white-5' />

        <div className='relative z-20 mt-[20px] lg:mt-[-1240px]'>
          <OrderReport />
        </div>
      </div>
      <div className='my-[168px] py-5 lg:flex items-center justify-around gap-5 overflow-hidden '>
        <PaymentReactionChartV2 />
        <MostUsedPaymentV2 />
      </div>
    </div>
  )
})

export default Home
