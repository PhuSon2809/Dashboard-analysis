import { memo, useMemo } from 'react'
import images from '~/assets'
import { DecreaseIcon, IncreaseIcon } from '../icons'
import { useAppSelector } from '~/redux/configStore'

const TodayVistorCard = memo(() => {
  const { homeReportCurrent, homeReportOld } = useAppSelector((s) => s.report)

  const percent = useMemo(
    () =>
      (((homeReportCurrent?.todayVisitors || 0) - (homeReportOld?.todayVisitors || 0)) /
        (homeReportOld?.todayVisitors || 0)) *
      100,
    [homeReportCurrent, homeReportOld]
  )

  const isIncrease = useMemo(
    () => (homeReportCurrent?.todayVisitors || 0) >= (homeReportOld?.todayVisitors || 0),
    [homeReportCurrent, homeReportOld]
  )

  return (
    <div className='w-[454px] h-[300px] rounded-[32px] bg-white/[.44] backdrop-blur-2xl flex items-center justify-center relative shadow-s-1 overflow-hidden'>
      <div className='size-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <img src={images.bg.bg_vistor_card} alt='bg-vistor-card' className='size-full object-center object-cover' />
      </div>

      <div className='flex flex-col items-center'>
        <p className='text-[18px]/[27px] font-normal text-grey999/[.64]'>Today's vistors</p>
        <h5 className='text-[81px]/[105.3px] font-bold'>{homeReportCurrent?.todayVisitors}</h5>
        <div className='flex items-center gap-1'>
          {isIncrease ? <IncreaseIcon color='green' /> : <DecreaseIcon color='pink' />}
          <p
            className={`text-[16px]/[24px] font-medium ${isIncrease ? 'text-greenNeonMain' : 'text-pinkMain'} transition-colors duration-200 ease-in-out`}
          >
            {Math.abs(percent).toFixed(2)}%
          </p>
        </div>
      </div>
      {[
        'absolute top-[35%] right-[14.5%]',
        'absolute top-[40%] left-[22.2%]',
        'absolute bottom-[20%] left-[9.5%]',
        'absolute bottom-[18%] right-[10%]'
      ].map((item, index) => (
        <div key={index} className={`absolute ${item}`}>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
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
        </div>
      ))}
    </div>
  )
})

export default TodayVistorCard
