import { memo } from 'react'
import { isMobile } from 'react-device-detect'
import CarouselVertical from '~/components/carousel/carouselVertical'
import { CurrentVisitorCard } from '~/components/currentVisitorCard'
import { TodayVistorCard } from '~/components/todayVistorCard'
import { UnhappyVistorCard } from '~/components/unhappyVistorCard'

const FoodBeverage = memo(() => {
  return (
    <div className='relative xs:pt-[57px] sm:pt-[106px]'>
      <div className='relative z-20 text-center xs:space-y-[2px] xs:px-4 sm:space-y-4 sm:px-0'>
        <h2 className='font-bold leading-[70.2px] xs:text-[32px] sm:text-[54px]'>Food & Beverage</h2>
        <p className='text-grey999/[.64] xs:leading-[26px] xs:text-[13px] sm:leading-[24px]'>
          Here are report of F&B data, refers to the collection of information and metrics related to the food and{' '}
          <br className='xs:hidden sm:flex' /> beverage store make informed decisions, improve operations, enhance
          customer satisfaction, and stay <br className='xs:hidden sm:flex' /> competitive in the market.
        </p>
      </div>

      <div className='absolute top-[181px] z-10 w-full xs:px-0 sm:px-4'>
        <div className='w-full bg-ln-grey-to-b xs:h-[278px] xs:rounded-bl-[28px] xs:rounded-br-[28px] sm:h-[398.01px] sm:rounded-bl-[60px] sm:rounded-br-[60px]' />
      </div>

      <div className='absolute left-[150px] top-[455px] z-20 size-[200px] rounded-full bg-[#ECF2F3] lg:left-[261px] lg:top-[455px] lg:size-[434px]' />

      <div className='relative z-30  xs:mt-[71px] sm:mt-[60px] max-h-[500px] px-4'>
        {isMobile && (
          <CarouselVertical listData={[<CurrentVisitorCard />, <TodayVistorCard />, <UnhappyVistorCard />]} />
        )}
        <div className=' w-full items-start justify-center gap-[22px] hidden lg:flex'>
          <CurrentVisitorCard />
          <TodayVistorCard />
          <UnhappyVistorCard />
        </div>
      </div>
    </div>
  )
})

export default FoodBeverage
