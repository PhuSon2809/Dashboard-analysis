import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'
import useRouteElements from '~/hooks/useRouteElements'
import { useAppDispatch, useAppSelector } from './redux/configStore'
import { fetchReport } from './redux/report/report'
import { setTimecount } from './redux/timecount/timecount.slice'

function App() {
  const dispatch = useAppDispatch()

  const routeElements = useRouteElements()

  const { timecount } = useAppSelector((s) => s.timecount)

  useEffect(() => {
    if (timecount !== 0) dispatch(setTimecount(timecount))
    AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 1000, // Thời gian hiệu ứng (ms)
      offset: 200, // Khoảng cách bắt đầu hiệu ứng
      once: true // Hiệu ứng chỉ xảy ra một lần
    })
  }, [])

  useEffect(() => {
    const duration = 30 * 1000
    if (timecount <= 0) dispatch(setTimecount(duration))
    const timerId = setTimeout(() => dispatch(setTimecount(timecount - 1000)), 1000)
    if (timecount <= 0) dispatch(fetchReport())
    return () => clearTimeout(timerId)
  }, [timecount])

  return (
    <>
      {routeElements}

      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '0px solid #ffffff',
              color: '#ffffff',
              background: 'linear-gradient(270deg, #5495FC 0%, #31D366 100%)'
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#60EC8E'
            }
          }
        }}
      />
    </>
  )
}

export default App
