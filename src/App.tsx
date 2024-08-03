import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouteElements from '~/hooks/useRouteElements'
import { useAppDispatch, useAppSelector } from './redux/configStore'
import { setTimecount } from './redux/timecount/timecount.slice'
import { LoadingScreen } from './components/loading'
import { fetchReport } from './redux/report/report'

function App() {
  const dispatch = useAppDispatch()

  const routeElements = useRouteElements()

  const { isLoading } = useAppSelector((s) => s.report)
  const { timecount } = useAppSelector((s) => s.timecount)

  useEffect(() => {
    if (timecount !== 0) dispatch(setTimecount(timecount))
  }, [])

  useEffect(() => {
    const duration = 5 * 1000
    if (timecount <= 0) dispatch(setTimecount(duration))
  }, [timecount])

  useEffect(() => {
    const timerId = setTimeout(() => dispatch(setTimecount(timecount - 1000)), 1000)
    return () => clearTimeout(timerId)
  }, [timecount])

  useEffect(() => {
    if (timecount <= 0) dispatch(fetchReport())
  }, [timecount])

  return (
    <>
      {isLoading ? (
        routeElements
      ) : (
        <div className='fixed z-[2000] top-0 bottom-0 left-0 right-0'>
          <LoadingScreen />
        </div>
      )}
      {/* {isLoading ? routeElements : 'loading'} */}

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
