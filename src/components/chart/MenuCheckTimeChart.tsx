import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: '>5', label: '> 5' },
  { value: '<5', label: '< 5' }
]

const MenuCheckTimeChart = memo(() => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const datasetData = [
    homeReportCurrent.ENGAGEMENT?.['Menu Check Time']?.['1'],
    homeReportCurrent.ENGAGEMENT?.['Menu Check Time']?.['2']
  ]

  const gradients = [
    { start: '#37CFFF', end: '#0D57C6', last: '#0F5ED6' },
    { start: '#FABF26', end: '#FF6B00' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, 0, chartArea.bottom)
      const { start, end, last } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(last ? 0.5 : 1, end)
      if (last) gradient.addColorStop(1, last)
      return gradient
    },
    [gradients]
  )

  return (
    <div className='min-w-[666px] min-h-[666px] bg-ln-white-yellow rounded-[32px] rounded-bl-[80px] shadow-s-10 relative'>
      <div
        className={`w-[300px] h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-2 -left-2`}
      >
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-purple-orange capitalize'>
          Menu check time
        </p>
      </div>

      <div className='size-[480px] p-[10px] absolute top-[85px] left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-s-15'>
        <Doughnut
          options={{
            cutout: 155,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
              datalabels: {
                font: { size: 20 },
                anchor: 'center',
                align: 'center',
                formatter: (value) => (value > 0 ? `${Number(value).toFixed(2)}%` : ''),
                color: (context) => ['#FFF', '#FFF'][context.dataIndex] || '#FFF'
              }
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
                borderWidth: 0
              }
            ]
          }}
        />

        <div className='size-[303px] flex items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' />
      </div>

      <div className='flex items-start justify-center gap-8 absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-2'>
            <div
              className={classNames('size-[16px] rounded-[4px]', data.value === '>5' ? 'bg-ln-blue-3' : 'bg-ln-orange')}
            />
            <p className='text-[18px]/[20px] font-customRegular capitalize'>{data.label} minutes</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default MenuCheckTimeChart
