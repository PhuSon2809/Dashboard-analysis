import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip)

const MostUsedPaymentChart = memo(() => {
  return (
    <div className='size-[110px] pt-2 pr-[6.03px] bg-ln-white-green backdrop-blur-2xl rounded-[9.64px] shadow-s-14'>
      <div className='w-[78.05px] h-[14px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tr-[7.23px] rounded-bl-[7.23px] absolute -bottom-[1.21px] -left-[1.21px]'>
        <p className='text-[6.63px] font-customSemiBold text-transparent bg-clip-text bg-ln-purple-green capitalize'>
          Most used payment
        </p>
      </div>

      <div className='w-full h-[90px]'>
        <Bar
          data={{
            labels: ['QR Pay', 'Cash', 'Take away'],
            datasets: [
              {
                data: [10, 20, 30],
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                  gradient.addColorStop(0, '#FCFCFD')
                  gradient.addColorStop(0.4, '#FCFCFD')
                  gradient.addColorStop(1, '#53D750')
                  return gradient
                },
                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                  gradient.addColorStop(0, '#FCFCFD')
                  gradient.addColorStop(0.3, '#FCFCFD')
                  gradient.addColorStop(1, '#53D750')
                  return gradient
                },
                borderColor: 'rgba(140, 225, 133 , 0.3)',
                borderWidth: 0.5,
                borderRadius: 2,
                barThickness: 12.04
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
                ticks: { display: true, font: { size: 4.82 }, color: '#0D0D0D' },
                border: { display: true, color: '#000', width: 0.3 }
              },
              y: {
                display: true,
                grid: { display: true, tickWidth: 0 },
                ticks: { display: false },
                border: { display: false, dash: [2, 2] }
              }
            }
          }}
        />
      </div>
    </div>
  )
})

export default MostUsedPaymentChart
