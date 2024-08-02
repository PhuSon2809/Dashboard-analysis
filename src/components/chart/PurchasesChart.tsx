import classNames from 'classnames'
import { memo } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Tooltip, Legend, RadialLinearScale, ArcElement, ChartDataLabels)

const listDataSet = [
  { value: '1', label: '1' },
  { value: '2-4', label: '2-4' },
  { value: '5', label: '5' }
]

const PurchasesChart = memo(() => {
  const getGradient = (ctx, chartArea, index) => {
    const gradients = [
      {
        start: '#64FBD7',
        end: '#5383FF'
      },
      {
        start: '#FE7E07',
        end: '#FFDE67'
      },
      {
        start: '#FF5D5D',
        end: '#FFB648'
      }
    ]

    if (!chartArea) return gradients[index].start
    const { width, height } = chartArea
    const gradient = ctx.createLinearGradient(0, 0, width, height)

    gradient.addColorStop(0, gradients[index].start)
    gradient.addColorStop(1, gradients[index].end)
    return gradient
  }

  return (
    <div className='size-[535px] bg-ln-orange-3 backdrop-blur-2xl rounded-[32px] shadow-s-11 relative'>
      <div className='w-[191px] h-[54px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tr-[34px] rounded-bl-[34px] shadow-s-7 absolute -bottom-1 -left-1'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-green-orange capitalize'>
          Purchases
        </p>
      </div>

      <div className='w-full h-[400px] absolute left-1/2 transform -translate-x-1/2 top-10'>
        <div className='w-full h-full'>
          <PolarArea
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  grid: { display: false },
                  ticks: { display: false }
                }
              },
              plugins: {
                datalabels: {
                  font: { size: 28 },
                  color: '#fff',
                  anchor: 'center',
                  align: 'center',
                  formatter: (value) => `${value}%`
                },
                legend: { display: false },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    title: () => '',
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
                  }
                }
              }
            }}
            data={{
              labels: ['1', '2-4', '5'],
              datasets: [
                {
                  data: [35, 32, 33],
                  backgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    return getGradient(ctx, chartArea, context.dataIndex)
                  },
                  hoverBackgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    return getGradient(ctx, chartArea, context.dataIndex)
                  },
                  borderWidth: 0,
                  borderRadius: 4
                }
              ]
            }}
          />
        </div>
      </div>

      <div className='w-full flex items-start justify-center gap-[17px] absolute bottom-[65px]'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                'size-4 rounded-full',
                data.value === '2-4' ? 'bg-ln-orange-2' : data.value === '5' ? 'bg-ln-orange' : 'bg-ln-blue-2'
              )}
            />
            <p className='text-[18px]/[18.9px] font-customRegular text-nowrap'>{data.label} Purchases</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default PurchasesChart
