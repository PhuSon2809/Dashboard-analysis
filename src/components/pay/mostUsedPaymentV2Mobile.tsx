import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import * as React from 'react'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'
interface IMostUsedPaymentV2MobileProps {
  listPayment: string[]
  title: string
  dataset?: number[]
}
ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip, ChartDataLabels)

const MostUsedPaymentV2Mobile: React.FunctionComponent<IMostUsedPaymentV2MobileProps> = ({
  listPayment,
  title,
  dataset
}) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)
  const dataChart = useMemo(() => homeReportCurrent?.mostUsedPayment, [homeReportCurrent])
  const datasetData = dataset || Array.from({ length: 7 }).map((_, index) => dataChart?.[`${index + 1}`])
  const gradients = [
    {
      start: '#CB2C2C',
      end: '#FF9432'
    },
    {
      start: '#3D10BD',
      end: '#5383FF'
    },
    {
      start: '#9C1EBC',
      end: '#FF7676'
    }
  ]
  return (
    <div className={classNames('best-seller-chart relative bg-ln-pink rounded-[25px] ')}>
      <div className={classNames('w-full px-2', 'h-[420px] px-8 pt-5')}>
        <div className='h-full w-full'>
          <Bar
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  font: { size: 16 },
                  color: '#ffffff',
                  anchor: 'center',
                  align: 'center',
                  formatter: (value) => `$${value}`
                },
                legend: { display: false },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    title: () => '',
                    label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`
                  }
                }
              },
              scales: {
                x: { display: false },
                y: {
                  display: true,
                  grid: { display: false },
                  border: { display: true, dashOffset: 10 },
                  ticks: { display: true, color: 'rgb(13, 13, 13)', font: { size: 13 } }
                }
              }
            }}
            data={{
              labels: listPayment.map((pay) => pay),
              datasets: [
                {
                  data: datasetData,

                  borderRadius: 10,
                  backgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx, chartArea } = chart

                    if (!chartArea) return gradients[0].start

                    const { width, height } = chartArea
                    const gradientCache = datasetData.map((_, index) => {
                      const gradient = canvasCtx.createLinearGradient(0, 0, width, height)
                      gradient.addColorStop(0, gradients[index % gradients.length].start)
                      gradient.addColorStop(1, gradients[index % gradients.length].end)
                      return gradient
                    })

                    const index = ctx.dataIndex
                    return gradientCache[index]
                  },

                  hoverBackgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx, chartArea } = chart

                    if (!chartArea) return gradients[0].start

                    const { width, height } = chartArea
                    const gradientCache = datasetData.map((_, index) => {
                      const gradient = canvasCtx.createLinearGradient(0, 0, width, height)
                      gradient.addColorStop(0, gradients[index % gradients.length].start)
                      gradient.addColorStop(1, gradients[index % gradients.length].end)
                      return gradient
                    })

                    const index = ctx.dataIndex
                    return gradientCache[index]
                  },
                  barThickness: 50
                }
              ]
            }}
          />
        </div>
      </div>
      <div
        className={classNames(
          ' flex items-center justify-center bg-white/[.44] shadow-s-6 backdrop-blur-[80px]',
          'h-[40px] w-[240px]  rounded-tr-[34px] rounded-bl-[34px] '
        )}
      >
        <p
          className={classNames(
            'bg-ln-blue-green-2 bg-clip-text font-customSemiBold capitalize text-transparent',
            'text-[20px]'
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

export default MostUsedPaymentV2Mobile
