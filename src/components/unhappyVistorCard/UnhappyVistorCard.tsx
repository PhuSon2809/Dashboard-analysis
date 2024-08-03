import { memo } from 'react'
import images from '~/assets'
import useCalculatePercent from '~/hooks/useCalculatePercent'
import { useAppSelector } from '~/redux/configStore'
import { DecreaseIcon, IncreaseIcon } from '../icons'
import classNames from 'classnames'

const UnhappyVistorCard = memo(() => {
  const { homeReportCurrent, homeReportOld } = useAppSelector((s) => s.report)

  const { percent, isIncrease } = useCalculatePercent(
    Number(homeReportCurrent?.unhappyVisitors),
    Number(homeReportOld?.unhappyVisitors)
  )

  return (
    <div className='w-[355px] h-[235px] rounded-[32px] bg-white/[.44] backdrop-blur-2xl relative shadow-s-1 overflow-hidden'>
      <div className='w-fit flex flex-col items-center gap-1 mt-[52px] ml-[158px]'>
        <p className='text-[18px]/[28px] font-normal text-grey999/[.64]'>Unhappy vistors</p>
        <div className='flex items-center gap-[9px]'>
          <h6 className='text-[36px]/[46.8px] font-bold'>{homeReportCurrent?.unhappyVisitors}</h6>
          <div className='flex items-center gap-1'>
            {isIncrease ? (
              <IncreaseIcon color='green' className='xs:size-[20px] sm:size-6' />
            ) : (
              <DecreaseIcon color='pink' className='xs:size-[20px] sm:size-6' />
            )}
            <p
              className={classNames(
                `xs:text-[13.09px]/[19.4px] sm:text-[16px]/[24px] font-semibold transition-colors duration-200 ease-in-out`,
                isIncrease ? 'text-greenNeonMain' : 'text-pinkMain'
              )}
            >
              {percent}%
            </p>
          </div>
        </div>
      </div>

      <div className='size-[245.16px] rounded-full bg-ln-white border-solid border-[1.29px] border-white/[.22] shadow-s-2 absolute left-1/2 transform -translate-x-1/2 top-[150px]' />

      <div className='absolute left-0 bottom-0'>
        <img src={images.icon.unhappy_vistor} alt='unhappy-icon' />
      </div>
    </div>
  )
})

export default UnhappyVistorCard
