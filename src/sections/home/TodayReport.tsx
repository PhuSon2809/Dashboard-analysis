import { memo, useEffect, useRef, useState } from 'react'
import { ReactionViewChart, RealHoursChart, TotalViewChart } from '~/components/chart'
import { ConversionRateCard } from '~/components/conversionRateCard'
import { OrderIcon, PayIcon, ViewerIcon, VisitorIcon } from '~/components/icons'
import TodayReportCard from '~/components/todayReportCard/TodayReportCard'
import { useAppSelector } from '~/redux/configStore'
import { formatLocaleString, formatNumber } from '~/utils/format'

const TodayReport = memo(() => {
  const reportRef = useRef<HTMLDivElement>(null)

  const { homeReportCurrent } = useAppSelector((s) => s.report)

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
            <TodayReportCard
              color='orange'
              title='Visitor'
              data={formatLocaleString(homeReportCurrent?.todayReportsOrder || 0)}
              percent={homeReportCurrent?.todayReportsOrderPercent || 0}
              icon={<VisitorIcon />}
            />
            <TodayReportCard
              color='blue'
              title='Viewers'
              data={formatLocaleString(homeReportCurrent?.todayReportsPurchase || 0)}
              percent={homeReportCurrent?.todayReportsPurchasePercent || 0}
              icon={<ViewerIcon />}
            />
            <TodayReportCard
              color='red'
              title='Order'
              data={formatLocaleString(homeReportCurrent?.todayReportsViewers || 0)}
              percent={homeReportCurrent?.todayReportsViewersPercent || 0}
              icon={<OrderIcon />}
            />
            <TodayReportCard
              color='green'
              title='Purchases/Pay'
              data={formatLocaleString(homeReportCurrent?.todayReportsVisitors || 0)}
              percent={homeReportCurrent?.todayReportsVisitorsPercent || 0}
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
            data={formatNumber(homeReportCurrent?.conversionRateReach || 0)}
            title='Reach/View'
            className={`${viewing ? 'ml-0' : '-ml-10'}`}
          />
          <ConversionRateCard
            viewing={viewing}
            data={formatNumber(homeReportCurrent?.conversionRateEngagement || 0)}
            title='Engagement/Reach'
            percentage={homeReportCurrent?.conversionRatePercent1 || 0}
            dotSize='size-[18px]'
            className={`${viewing ? 'ml-[110px]' : '-ml-10'}`}
          />
          <ConversionRateCard
            viewing={viewing}
            data={formatNumber(homeReportCurrent?.conversionRateOrder || 0)}
            title='Reach/Order'
            percentage={homeReportCurrent?.conversionRatePercent2 || 0}
            dotSize='size-5'
            className={`${viewing ? 'ml-[152px]' : '-ml-10'}`}
          />
          <ConversionRateCard
            viewing={viewing}
            data={formatNumber(homeReportCurrent?.conversionRatePay || 0)}
            title='Pay/Order'
            percentage={homeReportCurrent?.conversionRatePercent3 || 0}
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
