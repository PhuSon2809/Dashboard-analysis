import { memo } from 'react'
import images from '~/assets'
import useCalculatePercent from '~/hooks/useCalculatePercent'
import { useAppSelector } from '~/redux/configStore'
import { DecreaseIcon, IncreaseIcon } from '../icons'
import classNames from 'classnames'

const TodayVistorCard = memo(() => {
  const { homeReportCurrent, homeReportOld } = useAppSelector((s) => s.report)

  const { percent, isIncrease } = useCalculatePercent(
    Number(homeReportCurrent?.todayVisitors),
    Number(homeReportOld?.todayVisitors)
  )

  return (
    <div className='xs:w-[294px] xs:h-[194px] sm:w-[454px] sm:h-[300px] xs:rounded-[20.7px] sm:rounded-[32px] bg-white/[.44] backdrop-blur-2xl flex items-center justify-center relative shadow-s-1 overflow-hidden'>
      <div className='xs:size-[292px] sm:size-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <img src={images.bg.bg_vistor_card} alt='bg-vistor-card' className='size-full object-center object-cover' />
      </div>

      <div className='flex flex-col items-center'>
        <p className='xs:text-[11.46px]/[17.46px] sm:text-[18px]/[27px] text-grey999/[.64]'>Today's vistors</p>
        <h5 className='xs:text-[52.38px]/[68.1px] sm:text-[81px]/[105.3px] font-bold'>
          {homeReportCurrent?.todayVisitors}
        </h5>
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
      {[
        'xs:top-[62.9px] xs:right-[51.32px] sm:top-[35%] sm:right-[14.5%]',
        'xs:top-[66px] xs:left-[70px] sm:top-[40%] sm:left-[22.2%]',
        'xs:bottom-[44px] xs:left-[22px] sm:bottom-[20%] sm:left-[9.5%]',
        'xs:bottom-[44px] xs:right-[22.21px] sm:bottom-[18%] sm:right-[10%]'
      ].map((item, index) => (
        <div key={`${item}-${index}`} className={classNames('absolute', item)}>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' className='xs:hidden sm:flex'>
            <circle cx='6' cy='6' r='6' fill='url(#radial_1)' />
            <defs>
              <radialGradient
                id='radial_1'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(7.78105 0.700351) scale(9.67719)'
              >
                <stop offset='0.01' stopColor='#60EC8E' />
                <stop offset='0.99' stopColor='#5495FC' />
              </radialGradient>
            </defs>
          </svg>
          <svg width='9' height='9' viewBox='0 0 9 9' fill='none' className='xs:flex sm:hidden'>
            <circle cx='4.90703' cy='4.18065' r='4.09191' fill='url(#paint0_radial_73_17938)' />
            <defs>
              <radialGradient
                id='paint0_radial_73_17938'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(6.12168 0.566374) scale(6.5997)'
              >
                <stop offset='0.01' stopColor='#60EC8E' />
                <stop offset='0.99' stopColor='#5495FC' />
              </radialGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  )
})

export default TodayVistorCard
