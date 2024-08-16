import { memo } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { TimelineChart } from '~/components/chart'
import TimelineChartMobileV2 from '~/components/chart/timeLineChart/TimeLineChartMobileV2'

const RealTimeReport = memo(() => {
  return (
    <div className='lg:mt-[120px] xs:px-4 sm:px-0'>
      <div className='relative z-20 text-center xs:space-y-[14px] sm:space-y-4'>
        <h2 className='font-bold xs:text-[32px]/[38px] sm:text-[54px]/[70.2px]'>Real - Time Report</h2>
        <p className='text-grey999/[.64] xs:leading-[26px] xs:text-[13px] sm:leading-[24px]'>
          We offer up-to-the-minute account of <br className='xs:flex sm:hidden' /> current events or data, provided{' '}
          <br /> immediately as the situation unfolds.
        </p>
      </div>

      {isMobile && (
        <div className='mx-auto mt-[60px] h-[542px]   rounded-xl bg-grey100 shadow-s-3'>
          <TimelineChartMobileV2 />
        </div>
      )}
      {isDesktop && (
        <div className='mx-auto mt-[60px] h-[542px] max-w-[1216px] rounded-3xl bg-grey100 shadow-s-3'>
          <TimelineChart />
        </div>
      )}
    </div>
  )
})

export default RealTimeReport
