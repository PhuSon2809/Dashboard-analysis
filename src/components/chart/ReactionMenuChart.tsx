import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

const ReactionMenuChart = memo(() => {
  const gradients = [
    { start: '#5383FF', end: '#64FBD7' },
    { start: '#CB5DFF', end: '#1D41BE' },
    { start: '#FF6B00', end: '#FABF26' }
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

  const datasetData = [25, 40, 35]
  const total = datasetData.reduce((acc, value) => acc + value, 0)

  return (
    <div className='min-w-[666px] min-h-[666px] bg-ln-blue-pink-2 rounded-[32px] rounded-tr-[80px] shadow-s-10 relative'>
      <div className='w-[267px] h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-2 -left-2'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-blue-purple'>
          Reaction’s Menu
        </p>
      </div>

      <div className='size-[480px] absolute top-[70px] left-1/2 transform -translate-x-1/2'>
        <Doughnut
          className='relative z-50'
          options={{
            cutout: 158,
            plugins: {
              datalabels: {
                font: { size: 20 },
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
                borderRadius: 6,
                borderWidth: 0
              }
            ]
          }}
        />

        <div className='size-[306px] flex items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
          <div className='size-[292px] flex items-center justify-center bg-[#F8F8F8] rounded-full'>
            <div className='size-[248px] flex flex-col items-center justify-center gap-1 bg-white rounded-full shadow-s-9'>
              <h3 className='text-[48px]/[50.4px] font-customSemiBold text-[#292D30]'>{formatLocaleString(2510)}</h3>
              <p className='text-[19px]/[28px] text-[#0D0D0D]'>Customer’s reaction</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start justify-center gap-2 absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        {listDataSet.map((data) => (
          <div
            key={data.value}
            className='w-[195px] h-12 px-3 flex items-center justify-between rounded-lg bg-white/[.44] shadow-s-10'
          >
            <div className='flex items-center gap-2'>
              <div
                className={classNames(
                  'w-[6px] h-7 rounded-[6.33px]',
                  data.value === 'satisfied'
                    ? 'bg-ln-purple'
                    : data.value === 'dissatisfied'
                      ? 'bg-ln-orange'
                      : 'bg-ln-blue'
                )}
              />
              <p className='text-[18px]/[20px] font-customRegular capitalize'>{data.label}</p>
            </div>

            <div className='w-[50px] h-6 text-[18px] font-customSemiBold bg-[#E5E5EA] rounded-sm flex items-center justify-center'>
              {formatLocaleString(1139)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionMenuChart
