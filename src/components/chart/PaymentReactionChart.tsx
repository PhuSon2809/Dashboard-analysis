import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useRef } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

const PaymentReactionChart = memo(() => {
  const chartTotalOrderRef = useRef<ChartJS<'doughnut'>>(null)

  const gradients = [
    { start: '#C15CFF', end: '#FF5454' },
    { start: '#0D0D0D', end: '#0D0D0D' },
    { start: '#7D2DFF', end: '#41DDFF' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )

  const datasetData = [25, 40, 35]
  const total = datasetData.reduce((acc, value) => acc + value, 0)

  return (
    <div className='size-[110px] bg-ln-white-blue-2 backdrop-blur-md rounded-[9.64px] relative shadow-s-14'>
      <div className='w-[74px] h-[14px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[7.23px] rounded-br-[7.23px] shadow-s-7 absolute -top-[2.11px] -left-[2.11px]'>
        <p className='text-[6.63px] font-customSemiBold text-transparent bg-clip-text bg-ln-orange-purple'>
          Reaction’s Menu
        </p>
      </div>

      <div className='size-[80px] absolute top-[15.64px] left-1/2 transform -translate-x-1/2'>
        <div className='w-full h-full'>
          <Doughnut
            className='relative z-50'
            ref={chartTotalOrderRef}
            options={{
              cutout: 27,
              plugins: {
                datalabels: {
                  font: { size: 3.62 },
                  anchor: 'center',
                  align: 'center',
                  formatter: (value) => `${formatLocaleString(value)}%`,
                  color: (context) => ['#0D0D0D', '#FFF', '#FFF'][context.dataIndex] || '#FFF'
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
                  borderRadius: 2,
                  borderWidth: 0
                }
              ]
            }}
          />

          <div className='size-[50.72px] flex items-center justify-center rounded-full border-[1px] border-dotted border-[#A6A6A6] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
            <div className='size-[48.4px] flex items-center justify-center bg-[#F8F8F8] rounded-full'>
              <div className='size-[40.99px] flex flex-col items-center justify-center gap-1 bg-white rounded-full shadow-s-13'>
                <h3 className='text-[8.44px]/[8.86px] font-customSemiBold text-[#292D30]'>
                  {formatLocaleString(2510)}
                </h3>
                <p className='text-[3.62px]/[3.8px] text-[#0D0D0D]'>reaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start justify-center gap-[6.52px] absolute bottom-[6.63px] left-1/2 transform -translate-x-1/2'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[2px]'>
            <div
              className={classNames(
                'w-[1px] h-[4.82px] rounded-[1.05px]',
                data.value === 'satisfied'
                  ? 'bg-[#0D0D0D]'
                  : data.value === 'dissatisfied'
                    ? 'bg-ln-orange'
                    : 'bg-ln-blue'
              )}
            />
            <p className='text-[4.82px]/[4.82px] font-customRegular capitalize'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default PaymentReactionChart
