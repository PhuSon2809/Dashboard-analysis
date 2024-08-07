import { memo } from 'react'
import { CurrentVisitorCard } from '~/components/currentVisitorCard'
import { TodayVistorCard } from '~/components/todayVistorCard'
import { UnhappyVistorCard } from '~/components/unhappyVistorCard'

const FoodBeverage = memo(() => {
  return (
    <div className='xs:pt-[57px] sm:pt-[106px] relative'>
      <div className='xs:px-4 sm:px-0 xs:space-y-[2px] sm:space-y-4 text-center relative z-20'>
        <h2 className='xs:text-[32px] sm:text-[54px] leading-[70.2px] font-bold'>Food & Beverage</h2>
        <p className='xs:leading-[26px] sm:leading-[24px] text-grey999/[.64]'>
          Here are report of F&B data, refers to the collection of information and metrics related to the food and{' '}
          <br className='xs:hidden sm:flex' /> beverage store make informed decisions, improve operations, enhance
          customer satisfaction, and stay <br className='xs:hidden sm:flex' /> competitive in the market.
        </p>
      </div>

      <div className='w-full xs:px-0 sm:px-4 absolute top-[181px] z-10'>
        <div className='w-full xs:h-[278px] sm:h-[398.01px] bg-ln-grey-to-b xs:rounded-bl-[28px] xs:rounded-br-[28px] sm:rounded-bl-[60px] sm:rounded-br-[60px]' />
      </div>

      <div className='size-[434px] bg-[#ECF2F3] rounded-full absolute left-[261px] top-[455px] z-20' />

      <div className='w-full xs:mt-[71px] sm:mt-[60px] xs:hidden sm:flex items-start justify-center gap-[22px] relative z-30'>
        <CurrentVisitorCard />
        <TodayVistorCard />
        <UnhappyVistorCard />
      </div>
      {/* <div className='relative z-30'>
        <CurrentVisitorCard />
      </div> */}
    </div>
  )
})

export default FoodBeverage
