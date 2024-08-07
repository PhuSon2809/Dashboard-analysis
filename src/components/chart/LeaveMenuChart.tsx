import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo, useCallback, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const LeaveMenuChart = memo(({ isActive }: { isActive: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)
  const [custom, setCustom] = useState({
    cutout: '50%',
    size: 20
  })
  const datasetData = [
    homeReportCurrent?.ENGAGEMENT?.['Levea Menu'],
    100 - homeReportCurrent?.ENGAGEMENT?.['Levea Menu']
  ]
  const handleResize = () => {
    const width = window.innerWidth
    if (width < 480) {
      setCustom({
        cutout: '100',
        size: 10
      })
    } else if (width < 768) {
      setCustom({
        cutout: '40%',
        size: 15
      })
    } else {
      setCustom({
        cutout: '154',
        size: 20
      })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // Call once to set initial value
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const gradients = [
    { start: '#FF7676', end: '#9C1EBC' },
    { start: '#D1D1D6', end: '#D1D1D6' }
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

  return (
    <div className='lg:min-w-[666px] mt-20 xs-min:mt-[7rem] lg:mt-0 min-w-[300px] h-[400px] lg:min-h-[666px]  lg:rounded-[32px] rounded-[20px] rounded-tr-[50px] lg:rounded-tr-[80px] lg:shadow-s-10 relative bg-ln-pink '>
      <div
        className={`absolute flex lg:h-[68px] sm:h-[40px] w-[200px] lg:w-[280px] items-center justify-center lg:rounded-br-[34px] rounded-br-[15px] lg:rounded-tl-[34px] rounded-tl-[20px] z-[9999] bg-white/[.44] shadow-s-7 backdrop-blur-[80px] ${!isActive ? '-left-5 bottom-8' : 'lg:-left-10 left-[-10px] lg:bottom-10 bottom-2'} transition duration-300 ease-in-out`}
      >
        <p className='bg-ln-purple-pink bg-clip-text font-customSemiBold lg:text-[28px] capitalize text-transparent'>
          % menu leave rate
        </p>
      </div>

      <div className='absolute left-1/2 lg:top-[70px] top-[50px] lg:size-[480px] size-[300px] -translate-x-1/2 transform rounded-full bg-white p-[10px] shadow-s-15'>
        <div className='h-full w-full  rounded-full bg-[#D1D1D6]'>
          <Doughnut
            options={{
              cutout: custom.cutout,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: { display: false }
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
                  borderRadius: 6
                }
              ]
            }}
          />
        </div>
        <div className='absolute left-1/2 top-1/2 z-10 flex size-[200px] lg:size-[306px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white'>
          <p className='font-customSemiBold lg:text-[80px] text-[50px] text-[#292D30]'>20%</p>
        </div>
      </div>
    </div>
  )
})

export default LeaveMenuChart
