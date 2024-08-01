import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useRef } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'curious', label: 'Curious' },
  { value: 'normal', label: 'Normal' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' }
]

const ReactionViewChart = memo(() => {
  const chartTotalOrderRef = useRef<ChartJS<'doughnut'>>(null)

  const gradients = [
    { start: '#5383FF', end: '#64FBD7' },
    { start: '#FF6B00', end: '#FABF26' },
    { start: '#D1E4F2', end: '#DEECF6' },
    { start: '#F2F2F2', end: '#F2F2F2' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, chartArea.bottom)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )

  const datasetData = [25, 30, 15, 30]
  const total = datasetData.reduce((acc, value) => acc + value, 0)

  return (
    <div className='w-[639px] h-[521px] bg-ln-white-blue rounded-[32px] relative'>
      <div className='w-[267px] h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tr-[34px] rounded-bl-[34px] shadow-s-7 absolute top-[-10px] right-[-10px]'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-blue-purple'>
          Reaction viewers
        </p>
      </div>

      <div className='size-[400px] absolute top-[71px] left-[36px]'>
        <div className='w-full h-full p-1'>
          <div className='relative'>
            <Doughnut
              className='relative z-50'
              ref={chartTotalOrderRef}
              options={{
                cutout: 132,
                plugins: {
                  datalabels: {
                    font: { size: 12 },
                    anchor: 'center',
                    align: 'center',
                    formatter: (value) => `${formatLocaleString(value)}%`,
                    color: (context) => ['#0D0D0D', '#FFF', '#0D0D0D', '#0D0D0D'][context.dataIndex] || '#FFF'
                  },
                  legend: { display: false },
                  tooltip: {
                    position: 'nearest',
                    displayColors: false,
                    backgroundColor: 'rgba(14, 14, 14, 0.6)',
                    padding: 10,
                    callbacks: {
                      title: function () {
                        return ''
                      },
                      label: function (tooltipItem: TooltipItem<'doughnut'>) {
                        const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex]
                        const currentValue = dataset.data[tooltipItem.dataIndex] as number
                        const percentage = (currentValue / total) * 100
                        return `${percentage}%`
                      }
                    }
                  }
                }
              }}
              data={{
                labels: ['5.0', '4.0', '3.0', '2.0', '1.0'],
                datasets: [
                  {
                    data: datasetData,
                    backgroundColor: (ctx: any) =>
                      ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                    hoverBackgroundColor: (ctx: any) =>
                      ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                    borderRadius: 5,
                    borderWidth: 0,
                    spacing: 6
                  }
                ]
              }}
            />
          </div>

          <div className='size-[256.2px] flex items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
            <div className='size-[246.64px] flex items-center justify-center bg-[#F8F8F8] rounded-full'>
              <div className='size-[205.97px] flex flex-col items-center justify-center gap-1 bg-white rounded-full shadow-s-8'>
                <h3 className='text-[30px]/[45px] font-medium text-[#292D30]'>${510}</h3>
                <p className='text-[19px]/[28px] text-[#474B4E]'>December</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-3 flex flex-col items-start justify-center gap-6 absolute bottom-10 right-10'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                'size-3 rounded-[1px]',
                data.value === 'curious'
                  ? 'bg-ln-orange'
                  : data.value === 'normal'
                    ? 'bg-ln-blue'
                    : data.value === 'positive'
                      ? 'bg-ln-grey'
                      : 'bg-[#F2F2F2]'
              )}
            />
            <p className='font-customRegular'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionViewChart
