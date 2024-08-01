import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import classNames from 'classnames'
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip, Legend)

const listDataSet = [
  { value: 'total-view', label: 'Total View' },
  { value: 'view-menu', label: 'View menu' },
  { value: 'view-stories', label: 'View stories' },
  { value: 'entered-stoves', label: 'Entered stoves' }
]

const TotalViewChart = memo(() => {
  return (
    <div className='w-[639px] h-[450px] px-5 py-8 bg-ln-white-red rounded-[32px] relative'>
      <div className='w-[267px] h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tr-[34px] rounded-bl-[34px] shadow-s-7 absolute top-[-10px] right-[-10px]'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-blue-purple'>Total viewers</p>
      </div>

      <div className='w-full h-[360px]'>
        <Bar
          data={{
            labels: ['11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h'],
            datasets: [
              {
                label: 'Total View',
                data: [10, 20, 30, 60, 50, 60, 70, 50, 20, 80],
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#9DFFB3')
                  gradient.addColorStop(1, '#1AA37A')
                  return gradient
                },
                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#9DFFB3')
                  gradient.addColorStop(1, '#1AA37A')
                  return gradient
                },
                borderWidth: 0,
                borderRadius: 4
              },
              {
                label: 'View menu',
                data: [70, 50, 60, 20, 30, 60, 20, 50, 30, 40],
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#F7F5CA')
                  gradient.addColorStop(1, '#FFF1EB')
                  return gradient
                },
                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#F7F5CA')
                  gradient.addColorStop(1, '#FFF1EB')
                  return gradient
                },
                borderWidth: 0,
                borderRadius: 4
              },
              {
                label: 'View stories',
                data: [10, 20, 30, 70, 50, 60, 40, 50, 20, 40],
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#37CFFF')
                  gradient.addColorStop(1, '#0D57C6')
                  return gradient
                },
                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#37CFFF')
                  gradient.addColorStop(1, '#0D57C6')
                  return gradient
                },
                borderWidth: 0,
                borderRadius: 4
              },
              {
                label: 'Entered stoves',
                data: [10, 20, 30, 40, 50, 60, 70, 50, 20, 20],
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#DAFCFC')
                  gradient.addColorStop(1, '#F9E7FE')
                  return gradient
                },
                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, '#DAFCFC')
                  gradient.addColorStop(1, '#F9E7FE')
                  return gradient
                },
                borderWidth: 0,
                borderRadius: 4
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: { display: false },
              tooltip: {
                displayColors: false,
                callbacks: {
                  title: function () {
                    return ''
                  }
                }
              }
            },
            scales: {
              x: {
                display: true,
                grid: { display: false },
                ticks: { display: false },
                border: { display: true, color: '#000' }
              },
              y: {
                display: true,
                grid: { display: true, tickWidth: 0 },
                ticks: { display: true, font: { size: 14 }, color: '#0D0D0D' },
                border: { display: true, color: '#000', dash: [6, 6] }
              }
            }
          }}
        />
      </div>

      <div className='mt-3 flex items-center justify-center gap-6'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                'size-3 rounded-[1px]',
                data.value === 'total-view'
                  ? 'bg-ln-green-to-b'
                  : data.value === 'view-menu'
                    ? 'bg-ln-yellow-pink'
                    : data.value === 'view-stories'
                      ? 'bg-ln-blue-to-b'
                      : 'bg-ln-blue-pink'
              )}
            />
            <p className='font-customRegular'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default TotalViewChart
