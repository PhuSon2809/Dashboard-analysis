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
import { memo, useEffect, useMemo, useState } from 'react'
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
    <div className='lg:min-w-[666px] mt-20 min-w-[300px] h-[400px] lg:min-h-[666px] bg-ln-white-blue-2 lg:rounded-[32px] rounded-[20px] rounded-tr-[50px] lg:rounded-tr-[80px] lg:shadow-s-10 relative'>
      <div
        className={`lg:w-[340px] w-[200px] h-[40px] lg:h-[68px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute ${!isActive ? '-left-5 bottom-8' : 'lg:-left-10 lg:bottom-10  bottom-3'} transition duration-300 ease-in-out`}
      >
        <p className='lg:text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-yellow-green capitalize'>
          Serve time average
        </p>
      </div>

      <div className='lg:h-[500px] h-[330px] relative top-4'>
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
