import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Legend,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

const ServeTimeAverageChart = memo(({ isActive }: { isActive: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const labels = ['11', '12', '13', '14', '15', '16', '17', '18']

  const datasetData = useMemo(() => homeReportCurrent?.ENGAGEMENT?.['Serve Time Average'], [homeReportCurrent])

  const renderData = useMemo(() => labels.map((item) => datasetData?.[item]), [homeReportCurrent])

  console.log('renderData', renderData)
  return (
    <div className='relative mt-20 h-[400px] min-w-[300px] rounded-[20px] rounded-tr-[50px] bg-ln-white-blue-2 xs-min:mt-[7rem] lg:mt-0 lg:min-h-[666px] lg:min-w-[666px] lg:rounded-[32px] lg:rounded-tr-[80px] lg:shadow-s-10'>
      <div
        className={`absolute flex h-[40px] w-[200px] items-center justify-center rounded-br-[34px] rounded-tl-[34px] bg-white/[.44] shadow-s-7 backdrop-blur-[80px] lg:h-[68px] lg:w-[340px] ${!isActive ? '-left-5 bottom-8' : 'bottom-3 lg:-left-10 lg:bottom-10'} transition duration-300 ease-in-out`}
      >
        <p className='bg-ln-yellow-green bg-clip-text font-customSemiBold capitalize text-transparent lg:text-[28px]'>
          Serve time average
        </p>
      </div>

      <div className='relative top-4 h-[330px] lg:h-[500px]'>
        <Chart
          type='bar'
          data={{
            labels,
            datasets: [
              {
                type: 'bar',
                label: 'Serve time Duration',
                data: renderData,
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                  gradient.addColorStop(0, 'rgba(252, 252, 253, 0)')
                  gradient.addColorStop(1, 'rgba(52, 179, 241, 0.13)')
                  return gradient
                },

                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                  gradient.addColorStop(0, 'rgba(252, 252, 253, 0)')
                  gradient.addColorStop(1, 'rgba(52, 179, 241, 0.13)')
                  return gradient
                },
                borderWidth: 0.6,
                borderColor: 'rgba(52, 179, 241, 0.5)',
                borderRadius: 4
              },
              {
                type: 'line',
                label: 'Serve time Duration',
                data: renderData,
                fill: false,
                tension: 0.5,
                pointRadius: 0.5,
                pointHoverRadius: 5,
                borderWidth: 3,
                borderColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
                  gradient.addColorStop(0, '#31D366')
                  gradient.addColorStop(1, '#5495FC')
                  return gradient
                }
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
                callbacks: {
                  title: (tooltipItems) => {
                    const label = tooltipItems[0].label
                    const hour = parseInt(label)
                    const period = hour < 12 ? 'AM' : 'PM'
                    const formattedHour = hour % 12 === 0 ? 12 : hour % 12
                    return `${formattedHour} ${period}`
                  },
                  label: (tooltipItem) => {
                    const value = tooltipItem.raw
                    return `Serve time Duration: ${value}s`
                  }
                }
              }
            },
            scales: {
              x: {
                display: true,
                grid: { display: false },
                ticks: {
                  display: true,
                  font: { size: 20 },
                  color: '#0D0D0D',
                  callback: (value) => {
                    const hour = parseInt(labels[value])
                    const period = hour < 12 ? 'AM' : 'PM'
                    const formattedHour = hour % 12 === 0 ? 12 : hour % 12
                    return `${formattedHour} ${period}`
                  }
                },
                border: { display: true, color: '#000' }
              },
              y: {
                display: true,
                grid: { display: true, tickWidth: 0 },
                ticks: { display: false },
                border: { display: false, dash: [5, 5] }
              }
            }
          }}
        />
      </div>
    </div>
  )
})

export default ServeTimeAverageChart
