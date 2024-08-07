import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
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
      duration: 1000,
      offset: 200,
      once: true
    })
  }, [])

  useEffect(() => {
    const duration = 10 * 1000
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
