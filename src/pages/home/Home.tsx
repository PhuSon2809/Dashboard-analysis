import { memo } from 'react'
import { CurrentReactions, FoodBeverage, OrderReport, RealTimeReport, TodayReport } from '~/sections/home'
import Engagement from '~/sections/home/Engagement'

const Home = memo(() => {
  return (
    <div className='w-full h-full bg-red-400 relative'>
      <div className='relative z-20'>
        <FoodBeverage />
      </div>

      <div className='w-full h-[907px] bg-ln-grey-white absolute left-0 top-[332px] flex items-center justify-between z-10'>
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

      <CurrentReactions />
      <TodayReport />
      <Engagement />

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
