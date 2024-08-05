import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

import useRouteElements from '~/hooks/useRouteElements'
import { useAppDispatch, useAppSelector } from './redux/configStore'
import { fetchReport } from './redux/report/report'
import { setTimecount } from './redux/timecount/timecount.slice'
import { Loader } from './layouts/components/loader'
import { Cursor } from './components/cursor'

function App() {
  const dispatch = useAppDispatch()

  const routeElements = useRouteElements()

  const { timecount } = useAppSelector((s) => s.timecount)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (timecount !== 0) dispatch(setTimecount(timecount))
  }, [])

  useEffect(() => {
    const duration = 30 * 1000
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
      <LayoutGroup>
        <AnimatePresence>
          {loading ? (
            <motion.div key='loader'>
              <Loader setLoading={setLoading} />
            </motion.div>
          ) : (
            <>
              {routeElements}
              <Cursor />
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>

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
