import { memo } from 'react'
import { ReactionMenuChart } from '~/components/chart'

const Engagement = memo(() => {
  return (
    <div className='h-[810px] pl-16 mt-[191px] flex items-center gap-2 bg-ln-white-4'>
      <ReactionMenuChart />

      <div className=''>
        <h1 className='w-fit text-[52px] font-customBold text-transparent bg-clip-text bg-ln-purple-red'>ENGAGEMENT</h1>
      </div>
    </div>
  )
})

export default Engagement
