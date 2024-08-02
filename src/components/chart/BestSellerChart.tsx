import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip, ChartDataLabels)

const listFood = [
  'Fish and Chips',
  'Paella',
  'Coq au Vin',
  'Wiener Schnitzel',
  'Ratatouille',
  'Falafel Wrap',
  'Margherita Pizza'
]

const BestSellerChart = memo(() => {
  return (
    <div className='size-[535px] bg-ln-yellow rounded-[32px] shadow-s-12 relative'>
      <div className='w-[191px] h-[54px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute bottom-7 left-[-30px]'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-blue-green-2 capitalize'>
          Best Seller
        </p>
      </div>

      <div className='w-full h-[420px] px-8 pt-5'>
        <div className='w-full h-full'>
          <Bar
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  font: { size: 14 },
                  color: '#000',
                  anchor: 'end',
                  align: 'start',
                  formatter: (value) => formatLocaleString(value)
                },
                legend: { display: false },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    title: () => '',
                    label: (tooltipItem) => `${tooltipItem.label}: ${formatLocaleString(tooltipItem.raw)}`
                  }
                }
              },
              scales: {
                x: { display: false },
                y: {
                  display: true,
                  grid: { display: false },
                  border: { display: false },
                  ticks: { display: true, color: 'rgb(13, 13, 13)', font: { size: 16 } }
                }
              }
            }}
            data={{
              labels: listFood.map((food) => food),
              datasets: [
                {
                  data: listFood.map((food) => food).map(() => Math.floor(Math.random() * 10000)),
                  borderColor: 'rgb(172, 204, 255)',
                  backgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx } = chart
                    const gradient = canvasCtx.createLinearGradient(0, 0, chart.width, 0)
                    gradient.addColorStop(1, '#F0F33C')
                    gradient.addColorStop(0, '#53D750')
                    return gradient
                  },
                  hoverBackgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx } = chart
                    const gradient = canvasCtx.createLinearGradient(0, 0, chart.width, 0)
                    gradient.addColorStop(1, '#F0F33C')
                    gradient.addColorStop(0, '#53D750')
                    return gradient
                  },
                  barThickness: 28
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default BestSellerChart
