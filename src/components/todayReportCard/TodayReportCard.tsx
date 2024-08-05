import { memo, ReactNode } from 'react'
import { DecreaseIcon, IncreaseIcon } from '../icons'
import classNames from 'classnames'

type TodayReportCard = {
  title: string
  percent: number
  icon: ReactNode
  data: string | number
  color?: 'green' | 'orange' | 'blue' | 'red'
  isIncreasing?: boolean
}

const TodayReportCard = memo(({ title, icon, data, color, isIncreasing = true }: TodayReportCard) => {
  return (
    <div className='w-[202px] h-[132px] p-4 bg-white/[.44] backdrop-blur-2xl rounded-2xl shadow-s-4 flex flex-col items-start justify-between relative'>
      <p className='text-[18px]/[18px] font-customMedium capitalize'>{title}</p>
      <p className='text-[32px]/[33.6px] font-customSemiBold'>{data}</p>

      <div className='flex items-center gap-1'>
        {isIncreasing ? (
          <IncreaseIcon color='green' className='size-[15px]' />
        ) : (
          <DecreaseIcon color='pink' className='size-[15px]' />
        )}
        <p className={`text-[12px]/[12px] mt-[4px] ${isIncreasing ? 'text-greenLighter' : 'text-pinkMain'}`}>
          10% <span className='text-[#8E8E93]'>since last week</span>
        </p>
      </div>

      <div
        className={classNames(
          'size-10 rounded-lg flex items-center justify-center absolute top-3 right-3',
          color === 'orange'
            ? 'bg-orangeLight'
            : color === 'blue'
              ? 'bg-blueLight'
              : color === 'red'
                ? 'bg-redLight'
                : 'bg-greenLightest'
        )}
      >
        {icon}
      </div>
    </div>
  )
})

export default TodayReportCard
