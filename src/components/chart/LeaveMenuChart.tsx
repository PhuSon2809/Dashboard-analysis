import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo, useCallback } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const LeaveMenuChart = memo(({ isActive }: { isActive: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const datasetData = [homeReportCurrent.ENGAGEMENT?.['Levea Menu'], 100 - homeReportCurrent.ENGAGEMENT?.['Levea Menu']]

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
    <div className='min-w-[666px] min-h-[666px] bg-ln-pink rounded-[32px] rounded-tr-[80px] shadow-s-10 relative'>
      <div
        className={`w-[267px] h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute ${!isActive ? '-left-5 bottom-8' : '-left-10 bottom-10'} transition duration-300 ease-in-out`}
      >
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-purple-pink capitalize'>
          % leave menu
        </p>
      </div>

      <div className='size-[480px] p-[10px] absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-s-15'>
        <div className='w-full h-full bg-[#D1D1D6] rounded-full'>
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
        <div className='size-[306px] flex items-center justify-center rounded-full bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
          <p className='text-[80px] text-[#292D30] font-customSemiBold'>20%</p>
        </div>
      </div>
    </div>
  )
})

export default LeaveMenuChart
