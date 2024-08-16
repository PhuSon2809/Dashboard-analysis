import classNames from 'classnames'
import { memo, useCallback, useMemo } from 'react'
import { useAppSelector } from '~/redux/configStore'

const ServeTimeMobile = memo(({ isSmall, isLittleSmall }: { isSmall?: boolean; isLittleSmall?: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  // const duration = 5 * 60 * 1000

  const getFormattedTime = useCallback((milliseconds: number) => {
    const total_seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(total_seconds / 60)
    const seconds = total_seconds % 60
    return { minutes, seconds }
  }, [])

  const formattedTime = useMemo(() => getFormattedTime(homeReportCurrent?.serveTime * 1000), [homeReportCurrent])
  // const formattedTime = useMemo(() => getFormattedTime(duration), [homeReportCurrent])

  return (
    <div
      className={classNames(
        'serve-time flex items-center justify-center bg-rg-white backdrop-blur-2xl shadow-s-14',
        isSmall
          ? 'size-[80px]  rounded-[9.64px]   '
          : isLittleSmall
            ? 'h-[170px] rounded-[15px] '
            : '  w-[470px] h-[520px]  rounded-[32px]  pr-[6.03px] '
      )}
    >
      <div
        className={classNames(
          'relative flex items-center justify-center bg-white shadow-s-9 rounded-full',
          isSmall ? ' size-[70px] ' : isLittleSmall ? 'size-[150px]' : ' size-[400px]'
        )}
      >
        <div role='status'>
          <svg
            aria-hidden='true'
            className={classNames(
              'animate-spin-slow',
              isSmall ? 'size-[50px]' : isLittleSmall ? 'size-[120px]' : 'h-[350px] w-[500px]'
            )}
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='50' cy='50' r='45' stroke='#C3D2E4' strokeWidth='8' fill='none' />
            <path
              d='M50 5
             A 45 45 0 0 1 50 95'
              stroke='url(#gradientFill)'
              strokeWidth='3'
              fill='none'
              strokeLinecap='round'
              strokeDasharray='300'
              strokeDashoffset='200'
            />
            <defs>
              <linearGradient id='gradientFill' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#FF5FF4', stopOpacity: 1 }} />
                <stop offset='15%' style={{ stopColor: '#E669F4', stopOpacity: 1 }} />
                <stop offset='45%' style={{ stopColor: '#A684F4', stopOpacity: 1 }} />
                <stop offset='80%' style={{ stopColor: '#41ADF4', stopOpacity: 1 }} />
                <stop offset='97%' style={{ stopColor: '#11C1F4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center'>
          <h6
            className={classNames(
              'font-customSemiBold',
              isSmall ? 'text-[10px]' : isLittleSmall ? 'text-[15px]' : 'text-[40px]'
            )}
          >
            {(formattedTime.minutes > 0 && formattedTime.minutes) || 0}
            {formattedTime.minutes > 0 && 'm '}
            {formattedTime.seconds || 0}
            {formattedTime.seconds > 0 && 's'}
          </h6>
          <p
            className={classNames(
              'bg-ln-serve-time bg-clip-text font-customSemiBold text-transparent',
              isSmall ? 'text-[5px]' : isLittleSmall ? 'text-[10px]' : 'text-[35px]'
            )}
          >
            Serve Time
          </p>
        </div>
      </div>
    </div>
  )
})

export default ServeTimeMobile
