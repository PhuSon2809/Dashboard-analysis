import classNames from 'classnames'
import { memo } from 'react'
import images from '~/assets'
import { useAppSelector } from '~/redux/configStore'
import { DecreaseIcon, IncreaseIcon } from '../icons'

const CurrentVisitorCard = memo(() => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const isIncrease = Math.random() >= 0.5

  return (
    <div className=' relative h-[235px] w-[355px] overflow-hidden rounded-[32px] bg-white/[.44] shadow-s-1 backdrop-blur-2xl'>
      <div className='ml-[52px] mt-[52px] flex w-fit flex-col items-center gap-1'>
        <p className='text-[18px]/[28px] font-normal text-grey999/[.64]'>Current visitors</p>
        <div className='flex items-center gap-[9px]'>
          <h6 className='text-[36px]/[46.8px] font-bold'>{homeReportCurrent?.currentVisitors}</h6>
          <div className='flex items-center gap-1'>
            {isIncrease ? (
              <IncreaseIcon color='green' className='xs:size-[20px] sm:size-6' />
            ) : (
              <DecreaseIcon color='pink' className='xs:size-[20px] sm:size-6' />
            )}
            <p
              className={classNames(
                `font-semibold transition-colors duration-200 ease-in-out xs:text-[13.09px]/[19.4px] sm:text-[16px]/[24px]`,
                isIncrease ? 'text-greenNeonMain' : 'text-pinkMain'
              )}
            >
              {homeReportCurrent?.currentVisitorsPercent}%
            </p>
          </div>
        </div>
      </div>
      <img
        src={images.image.current_view_top}
        alt='shipping-top'
        className='absolute bottom-[32px] right-[-42px] z-10 w-[200px] rotate-[1.72deg]'
      />
      <img
        src={images.image.current_view_bottom}
        alt='shipping-bottom'
        className='absolute bottom-[-85px] right-[-35px] w-[220px] rotate-[13.63deg]'
      />
    </div>
  )
})

export default CurrentVisitorCard
