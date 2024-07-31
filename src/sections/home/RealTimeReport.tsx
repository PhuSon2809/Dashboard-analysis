import { memo } from 'react'

const RealTimeReport = memo(() => {
  return (
    <div className='mt-[120px]'>
      <div className='text-center space-y-4 relative z-20'>
        <h2 className='text-[54px]/[70.2px] font-bold'>Real - Time Report</h2>
        <p className='text-[16px]/[24px] font-normal text-grey999/[.64]'>
          We offer up-to-the-minute account of current events or data, provided <br /> immediately as the situation
          unfolds.
        </p>
      </div>

      <div className='w-[1216px] h-[542px] bg-grey100 rounded-3xl shadow-s-3 mx-auto mt-[60px]'></div>
    </div>
  )
})

export default RealTimeReport
