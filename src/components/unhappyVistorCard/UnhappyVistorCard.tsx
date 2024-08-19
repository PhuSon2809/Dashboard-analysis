import classNames from 'classnames'
import { memo } from 'react'
import images from '~/assets'
import { useAppSelector } from '~/redux/configStore'
import { DecreaseIcon, IncreaseIcon } from '../../assets/icons'

const UnhappyVistorCard = memo(() => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const isIncrease = Math.random() >= 0.5

  return (
    <div className='relative h-[235px] w-full overflow-hidden rounded-[32px] bg-white/[.60] backdrop-blur-2xl lg:w-[355px] lg:bg-white/[.44] lg:shadow-s-1'>
      <div className='ml-[158px] mt-[52px] flex w-fit flex-col items-center gap-1'>
        <p className='text-[18px]/[28px] font-normal text-grey999/[.64]'>Unhappy vistors</p>
        <div className='flex items-center gap-[9px]'>
          <h6 className='text-[36px]/[46.8px] font-bold'>{homeReportCurrent?.currentViews}</h6>
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
              {homeReportCurrent?.currentViewsPercent}%
            </p>
          </div>
        </div>
      </div>

      <div className='absolute left-1/2 top-[150px] size-[245.16px] -translate-x-1/2 transform rounded-full border-[1.29px] border-solid border-white/[.22] bg-ln-white shadow-s-2' />

      <div className='absolute bottom-0 left-0'>
        <img src={images.icon.unhappy_vistor} alt='unhappy-icon' />
      </div>
    </div>
  )
})

export default UnhappyVistorCard
