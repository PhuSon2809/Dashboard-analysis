import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
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

  return (
    <div className='min-w-[666px] min-h-[666px] p-8 pl-7 pt-10 bg-ln-white-blue-2 rounded-[32px] rounded-br-[80px] shadow-s-10 relative'>
      <div
        className={`w-[340px] h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute ${!isActive ? '-left-5 bottom-8' : '-left-10 bottom-10'} transition duration-300 ease-in-out`}
      >
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-yellow-green capitalize'>
          Serve time average
        </p>
      </div>

      <div className='h-[500px]'>
        <Chart
          type='bar'
          data={{
            labels,
            datasets: [
              {
                type: 'bar',
                label: 'Bar Dataset',
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
                label: 'Line Dataset',
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
            plugins: { legend: { display: false }, datalabels: { display: false } },
            scales: {
              x: {
                display: true,
                grid: { display: false },
                ticks: { display: true, font: { size: 20 }, color: '#0D0D0D' },
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
