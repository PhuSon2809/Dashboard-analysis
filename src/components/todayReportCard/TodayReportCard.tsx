import { memo, ReactNode } from 'react'

type TodayReportCard = {
  title: string
  icon: ReactNode
  data: string | number
  color?: 'green' | 'orange' | 'blue' | 'red'
}

const TodayReportCard = memo(({ title, icon, data, color }: TodayReportCard) => {
  return <div className='w-[202px] h-[132px] bg-white/[.44] backdrop-blur-2xl rounded-2xl'>TodayReportCard</div>
})

export default TodayReportCard
