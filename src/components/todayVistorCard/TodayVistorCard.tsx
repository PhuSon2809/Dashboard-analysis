import classNames from 'classnames'
import { memo } from 'react'
import images from '~/assets'
import { useAppSelector } from '~/redux/configStore'
import { DecreaseIcon, IncreaseIcon } from '../icons'

const TodayVistorCard = memo(() => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const isIncrease = Math.random() >= 0.5

  return (
    <div className='relative  flex flex-shrink-0 items-center justify-center overflow-hidden bg-white/[.44] lg:shadow-s-1 backdrop-blur-2xl w-full  h-[235px] lg:h-[300px] lg:w-[454px] rounded-[32px]'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform xs:size-[292px] sm:size-[450px]'>
        <img src={images.bg.bg_vistor_card} alt='bg-vistor-card' className='size-full object-cover object-center' />
      </div>

      <div className='flex flex-col items-center'>
        <p className='text-grey999/[.64] xs:text-[11.46px]/[17.46px] sm:text-[18px]/[27px]'>Today's vistors</p>
        <h5 className='font-bold xs:text-[52.38px]/[68.1px] sm:text-[81px]/[105.3px]'>
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
              `font-semibold transition-colors duration-200 ease-in-out xs:text-[13.09px]/[19.4px] sm:text-[16px]/[24px]`,
              isIncrease ? 'text-greenNeonMain' : 'text-pinkMain'
            )}
          >
            {homeReportCurrent?.todayVisitorsPercent}%
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
