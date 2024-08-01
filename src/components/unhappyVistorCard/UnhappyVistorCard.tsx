import { memo, useMemo } from 'react'
import { DecreaseIcon, IncreaseIcon } from '../icons'
import images from '~/assets'
import { useAppSelector } from '~/redux/configStore'

const UnhappyVistorCard = memo(() => {
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
    <div className='w-[355px] h-[235px] rounded-[32px] bg-white/[.44] backdrop-blur-2xl relative shadow-s-1 overflow-hidden'>
      <div className='w-fit flex flex-col items-center gap-1 mt-[52px] ml-[158px]'>
        <p className='text-[18px]/[28px] font-normal text-grey999/[.64]'>Current views</p>
        <div className='flex items-center gap-[9px]'>
          <h6 className='text-[36px]/[46.8px] font-bold'>{homeReportCurrent?.unhappyVisitors}</h6>
          <div className='flex items-center gap-1'>
            {isIncrease ? <IncreaseIcon color='green' /> : <DecreaseIcon color='pink' />}
            <p className={`text-[16px]/[24px] font-medium ${isIncrease ? 'text-greenNeonMain' : 'text-pinkMain'} `}>
              {Math.abs(percent).toFixed(2)}%
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
