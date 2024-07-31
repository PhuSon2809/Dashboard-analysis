import { memo } from 'react'
import { CurrentViewCard } from '~/components/currentViewCard'
import { TodayVistorCard } from '~/components/todayVistorCard'
import { UnhappyVistorCard } from '~/components/unhappyVistorCard'

const FoodBeverage = memo(() => {
  return (
    <div className='pt-[106px] relative'>
      <div className='text-center space-y-4 relative z-20'>
        <h2 className='text-[54px]/[70.2px] font-bold'>Food & Beverage</h2>
        <p className='text-[16px]/[24px] font-normal text-grey999/[.64]'>
          Elevate your essence with "Vamp one perfume bottle", an embodiment of refined masculinity and timeless <br />
          sophistication. Crafted for the modern gentleman who exudes confidence and charm, this fragrance captures the{' '}
          <br />
          essence of strength and elegance.
        </p>
      </div>

      <div className='w-full xs:px-0 sm:px-4 absolute top-[181px] z-10'>
        <div className='w-full xs:h-[278px] sm:h-[398.01px] bg-ln-grey-to-b xs:rounded-bl-[28px] xs:rounded-br-[28px] sm:rounded-bl-[60px] sm:rounded-br-[60px]' />
      </div>

      <div className='size-[434px] bg-[#ECF2F3] rounded-full absolute left-[261px] top-[455px] z-20' />

      <div className='w-full mt-[60px] flex items-start justify-center gap-[22px] relative z-30'>
        <CurrentViewCard />
        <TodayVistorCard />
        <UnhappyVistorCard />
      </div>
    </div>
  )
})

export default FoodBeverage
