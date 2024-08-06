import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo, useCallback } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const LeaveMenuChart = memo(({ isActive }: { isActive: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const datasetData = [
    homeReportCurrent?.ENGAGEMENT?.['Levea Menu'],
    100 - homeReportCurrent?.ENGAGEMENT?.['Levea Menu']
  ]

  const gradients = [
    { start: '#FF7676', end: '#9C1EBC' },
    { start: '#D1D1D6', end: '#D1D1D6' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, 0, chartArea.bottom)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )

  return (
    <div className='relative min-h-[666px] min-w-[666px] rounded-[32px] rounded-tr-[80px] bg-ln-pink shadow-s-10'>
      <div
        className={`absolute flex h-[68px] w-[280px] items-center justify-center rounded-br-[34px] rounded-tl-[34px] bg-white/[.44] shadow-s-7 backdrop-blur-[80px] ${!isActive ? '-left-5 bottom-8' : '-left-10 bottom-10'} transition duration-300 ease-in-out`}
      >
        <p className='bg-ln-purple-pink bg-clip-text font-customSemiBold text-[28px] capitalize text-transparent'>
          % menu leave rate
        </p>
      </div>

      <div className='absolute left-1/2 top-[70px] size-[480px] -translate-x-1/2 transform rounded-full bg-white p-[10px] shadow-s-15'>
        <div className='h-full w-full rounded-full bg-[#D1D1D6]'>
          <Doughnut
            options={{
              cutout: 154,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: { display: false }
              }
            }}
            data={{
              labels: [],
              datasets: [
                {
                  data: datasetData,
                  backgroundColor: (ctx: any) =>
                    ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                  hoverBackgroundColor: (ctx: any) =>
                    ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                  borderWidth: 0,
                  borderRadius: 6
                }
              ]
            }}
          />
        </div>
        <div className='absolute left-1/2 top-1/2 z-10 flex size-[306px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white'>
          <p className='font-customSemiBold text-[80px] text-[#292D30]'>20%</p>
        </div>
      </div>
    </div>
  )
})

export default LeaveMenuChart
