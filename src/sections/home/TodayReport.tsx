import { memo } from 'react'
import { RealHoursChart } from '~/components/chart'

const TodayReport = memo(() => {
  return (
    <div className='bg-earth mt-[83px]'>
      <div className='h-[332px] px-16 pt-16 flex items-center gap-5 bg-ln-white-2'>
        <RealHoursChart />
        <div className='space-y-5'>
          <h5 className='text-[18px]/[28px] font-customSemiBold'>Today’s Report</h5>
          <div className='flex items-center gap-5'></div>
        </div>
      </div>
    </div>
  )
})

export default TodayReport
