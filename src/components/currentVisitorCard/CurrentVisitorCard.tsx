import { memo, useMemo } from 'react'
import images from '~/assets'
import { DecreaseIcon, IncreaseIcon } from '../icons'
import { useAppSelector } from '~/redux/configStore'

const CurrentViewCard = memo(() => {
  const { homeReportCurrent, homeReportOld } = useAppSelector((s) => s.report)

  const percent = useMemo(
    () =>
      (((homeReportCurrent?.currentVisitors || 0) - (homeReportOld?.currentVisitors || 0)) /
        (homeReportOld?.currentVisitors || 0)) *
      100,
    [homeReportCurrent, homeReportOld]
  )

  const isIncrease = useMemo(
    () => (homeReportCurrent?.currentVisitors || 0) >= (homeReportOld?.currentVisitors || 0),
    [homeReportCurrent, homeReportOld]
  )

  console.log('percent', percent)

  return (
    <div className='w-[355px] h-[235px] rounded-[32px] bg-white/[.44] backdrop-blur-2xl overflow-hidden shadow-s-1 relative'>
      <div className='w-fit flex flex-col items-center gap-1 mt-[52px] ml-[52px]'>
        <p className='text-[18px]/[28px] font-normal text-grey999/[.64]'>Current visitors</p>
        <div className='flex items-center gap-[9px]'>
          <h6 className='text-[36px]/[46.8px] font-bold'>{homeReportCurrent?.currentVisitors}</h6>
          <div className='flex items-center gap-1'>
            {isIncrease ? <IncreaseIcon color='green' /> : <DecreaseIcon color='pink' />}
            <p className={`text-[16px]/[24px] font-medium ${isIncrease ? 'text-greenNeonMain' : 'text-pinkMain'} `}>
              {Math.abs(percent).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <img
        src={images.image.current_view_top}
        alt='shipping-top'
        className='w-[200px] absolute right-[-42px] bottom-[32px] z-10 rotate-[1.72deg] '
      />
      <img
        src={images.image.current_view_bottom}
        alt='shipping-bottom'
        className='w-[220px] rotate-[13.63deg] absolute right-[-35px] bottom-[-85px]'
      />
    </div>
  )
})

export default CurrentViewCard
