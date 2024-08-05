import classNames from 'classnames'
import { memo, ReactNode } from 'react'
import { DecreaseIcon, IncreaseIcon } from '../icons'

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
    <div className='relative flex h-[132px] w-[202px] flex-col items-start justify-between rounded-2xl bg-white/[.44] p-4 shadow-s-4 backdrop-blur-2xl'>
      <p className='font-customMedium text-[18px]/[18px] capitalize'>{title}</p>
      <p className='font-customSemiBold text-[32px]/[33.6px]'>{data}</p>

      <div className='flex items-center gap-1'>
        {isIncreasing ? (
          <IncreaseIcon color='green' className='size-[15px]' />
        ) : (
          <DecreaseIcon color='pink' className='size-[15px]' />
        )}
        <p className={`mt-[4px] text-[12px]/[12px] ${isIncreasing ? 'text-greenLighter' : 'text-pinkMain'}`}>
          10% <span className='text-[#8E8E93]'>{title === 'Viewers' ? 'since yesterday' : 'since last week'}</span>
        </p>
      </div>

      <div
        className={classNames(
          'absolute right-3 top-3 flex size-10 items-center justify-center rounded-lg',
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
