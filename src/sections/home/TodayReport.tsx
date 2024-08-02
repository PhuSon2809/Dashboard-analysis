import { memo, useEffect, useRef, useState } from 'react'
import { ReactionViewChart, RealHoursChart, TotalViewChart } from '~/components/chart'
import { ConversionRateCard } from '~/components/conversionRateCard'
import { OrderIcon, PayIcon, ViewerIcon, VisitorIcon } from '~/components/icons'
import TodayReportCard from '~/components/todayReportCard/TodayReportCard'
import { formatLocaleString } from '~/utils/format'

const TodayReport = memo(() => {
  const reportRef = useRef<HTMLDivElement>(null)

  const [viewing, setViewing] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setViewing(true), 700)
        } else {
          setViewing(false)
        }
      },
      { root: null, threshold: 0.1 }
    )

    if (reportRef.current) observer.observe(reportRef.current)

    return () => {
      if (reportRef.current) observer.unobserve(reportRef.current)
    }
  }, [])

  return (
    <div ref={reportRef} className='bg-earth mt-[83px]'>
      <div className='h-[332px] px-16 pt-16 flex items-start gap-5 bg-ln-white-2'>
        <RealHoursChart />
        <div className='space-y-5 mt-2'>
          <h5 className='text-[28px]/[18px] font-customSemiBold'>Today’s Report</h5>
          <div className='flex items-center gap-5'>
            <TodayReportCard color='orange' title='Visitor' data={formatLocaleString(578)} icon={<VisitorIcon />} />
            <TodayReportCard color='blue' title='Viewers' data={formatLocaleString(2578)} icon={<ViewerIcon />} />
            <TodayReportCard color='red' title='Order' data={formatLocaleString(1072)} icon={<OrderIcon />} />
            <TodayReportCard
              color='green'
              title='Purchases/Pay'
              data={formatLocaleString(78)}
              icon={<PayIcon />}
              isIncreasing={false}
            />
          </div>
        </div>
      </div>

      <div className='ml-[731px]'>
        <h5 className='text-[28px]/[18px] font-customSemiBold'>Conversion Rate</h5>

        <div className='mt-[59px] ml-[53px] space-y-[26px]'>
          <ConversionRateCard
            viewing={viewing}
            data={'100.000'}
            title='Reach/View'
            className={`${viewing ? 'ml-0' : '-ml-10'}`}
          />
          <ConversionRateCard
            viewing={viewing}
            data={'90.000'}
            title='Engagement/Reach'
            percentage={30}
            dotSize='size-[18px]'
            className={`${viewing ? 'ml-[110px]' : '-ml-10'}`}
          />
          <ConversionRateCard
            viewing={viewing}
            data={'70.000'}
            title='Reach/Order'
            percentage={40}
            dotSize='size-5'
            className={`${viewing ? 'ml-[152px]' : '-ml-10'}`}
          />
          <ConversionRateCard
            viewing={viewing}
            data={'70.000'}
            title='Pay/Order'
            percentage={50}
            dotSize='size-6'
            className={`${viewing ? 'ml-[182px]' : '-ml-10'}`}
          />
        </div>
      </div>

      <div className='flex items-end justify-center gap-5 mt-[168px]'>
        <div className='space-y-8'>
          <h1 className='w-fit text-[52px] leading-none font-customBold text-transparent bg-clip-text bg-ln-purple-red uppercase'>
            reach
          </h1>
          <TotalViewChart />
        </div>
        <div className='space-y-8'>
          <h1 className='text-[54px]/[70.2px] leading-none font-customBold text-blackMain mb-[60px]'>
            Customer Journey
          </h1>
          <ReactionViewChart />
        </div>
      </div>
    </div>
  )
})

export default TodayReport
