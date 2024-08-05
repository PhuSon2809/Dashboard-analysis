import { memo } from 'react'
import { TimelineChart } from '~/components/chart'

const RealTimeReport = memo(() => {
  return (
    <div className='xs:px-4 sm:px-0 mt-[120px]'>
      <div className='xs:space-y-[14px] sm:space-y-4 text-center relative z-20'>
        <h2 className='xs:text-[32px]/[38px] sm:text-[54px]/[70.2px] font-bold'>Real - Time Report</h2>
        <p className='xs:leading-[26px] sm:leading-[24px] text-grey999/[.64]'>
          We offer up-to-the-minute account of <br className='xs:flex sm:hidden' /> current events or data, provided{' '}
          <br /> immediately as the situation unfolds.
        </p>
      </div>

      <div className='w-[1216px] h-[542px] bg-grey100 rounded-3xl shadow-s-3 mx-auto mt-[60px]'>
        <TimelineChart />
      </div>
    </div>
  )
})

export default RealTimeReport
