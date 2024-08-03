import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' }
]

const ReactionsEnjoyChart = memo(() => {
  const datasetData = [20, 80]

  const gradients = [
    { start: '#FE7E07', end: '#FFDE67' },
    { start: '#C15CFF', end: '#FF5454' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, 0, chartArea.bottom)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )

  const total = datasetData.reduce((acc, value) => acc + value, 0)

  return (
    <div className='min-w-[535px] min-h-[535px] bg-ln-pink rounded-[32px] rounded-tr-[80px] shadow-s-10 relative'>
      <div className='w-[400px] h-[64px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-[6px] -left-[6px]'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-red-green capitalize'>
          Reactions enjoy meal
        </p>
      </div>

      <div className='size-[380px] p-[10px] absolute top-[80px] left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-s-15'>
        <div className='w-full h-full bg-white rounded-full'>
          <Doughnut
            options={{
              cutout: 115,
              plugins: {
                legend: { display: false },
                datalabels: {
                  font: { size: 20 },
                  color: '#FFF',
                  align: 'center',
                  anchor: 'center',
                  formatter: (value) => `${value}%`
                },
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
              labels: [],
              datasets: [
                {
                  data: datasetData,
                  backgroundColor: (ctx: any) =>
                    ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                  hoverBackgroundColor: (ctx: any) =>
                    ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                  borderWidth: 0,
                  borderRadius: 7
                }
              ]
            }}
          />
        </div>
        <div className='size-[220px] flex items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
          <div className='size-[200px] flex items-center justify-center bg-[#F8F8F8] rounded-full'>
            <div className='size-[180px] flex flex-col items-center justify-center gap-1 bg-white rounded-full shadow-s-9'>
              <p className='text-[60px] text-[#292D30] font-customSemiBold'>20%</p>
            </div>
          </div>
        </div>
      </div>

      <div className='px-14 w-full flex items-center justify-center gap-20 absolute bottom-7'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                'size-[18px] rounded-md',
                data.value === 'satisfied'
                  ? 'bg-ln-orange-2'
                  : data.value === 'dissatisfied'
                    ? 'bg-ln-purple-red-2'
                    : 'bg-ln-blue-2'
              )}
            />
            <p className='text-[18px]/[18.9px]'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>

    // <div className='size-[535px] bg-ln-white-6 rounded-[32px] shadow-s-11 relative'>
    //   <div className='w-[400px] h-[64px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-[6px] -left-[6px]'>
    //     <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-red-green capitalize'>
    //       Reactions enjoy meal
    //     </p>
    //   </div>

    //   <div className='absolute top-20 left-1/2 transform -translate-x-1/2 text-white font-medium'>
    //     <div className='size-[378px] relative'>
    //       <div className='size-[268px] bg-ln-orange-2 rounded-full flex items-center justify-center ml-[70px]'>
    //         <p className='text-[34px]'>50%</p>
    //       </div>
    //       <div className='size-[147px] bg-ln-purple-red-2 rounded-full flex items-center justify-center absolute left-0 bottom-[74px]'>
    //         <p className='text-[24px]'>20%</p>
    //       </div>
    //       <div className='size-[203px] bg-ln-blue-2 rounded-full flex items-center justify-center absolute bottom-0 right-0'>
    //         <p className='text-[30px]'>30%</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className='w-full h-[380px] absolute transform -translate-x-1/2 top-[84px] left-1/2'>
    //     <div className='w-full h-full bg-[#D1D1D6] rounded-full'>
    //       <Doughnut
    //         options={{
    //           cutout: 154,
    //           plugins: {
    //             legend: { display: false },
    //             tooltip: { enabled: false },
    //             datalabels: { display: false }
    //           }
    //         }}
    //         data={{
    //           labels: [],
    //           datasets: [
    //             {
    //               data: datasetData,
    //               backgroundColor: (ctx: any) =>
    //                 ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
    //               hoverBackgroundColor: (ctx: any) =>
    //                 ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
    //               borderWidth: 0,
    //               borderRadius: 6
    //             }
    //           ]
    //         }}
    //       />
    //     </div>
    //     <div className='size-[306px] flex items-center justify-center rounded-full bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
    //       <p className='text-[80px] text-[#292D30] font-customSemiBold'>20%</p>
    //     </div>
    //   </div>

    //   <div className='px-14 w-full flex items-center justify-center gap-20 absolute bottom-8'>
    //     {listDataSet.map((data) => (
    //       <div key={data.value} className='flex items-center gap-[6px]'>
    //         <div
    //           className={classNames(
    //             'size-[18px] rounded-md',
    //             data.value === 'satisfied'
    //               ? 'bg-ln-orange-2'
    //               : data.value === 'dissatisfied'
    //                 ? 'bg-ln-purple-red-2'
    //                 : 'bg-ln-blue-2'
    //           )}
    //         />
    //         <p className='text-[18px]/[18.9px]'>{data.label}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
})

export default ReactionsEnjoyChart
