import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import useRouteElements from '~/hooks/useRouteElements'
import { Cursor } from './components/cursor'
import { Loader } from './layouts/components/loader'
import { useAppDispatch, useAppSelector } from './redux/configStore'
import { fetchReport } from './redux/report/report'
import { setTimecount } from './redux/timecount/timecount.slice'
import AOS from 'aos' 
import 'aos/dist/aos.css'

function App() {
  const dispatch = useAppDispatch()

  const routeElements = useRouteElements()

  const { timecount } = useAppSelector((s) => s.timecount)

  const [loading, setLoading] = useState(true)
  const [showEffect, setShowEffect] = useState(true)
  useEffect(() => {
    if (timecount !== 0) dispatch(setTimecount(timecount))
  }, [])
  useEffect(() => {
    if (showEffect) {
      document.querySelector('body')?.classList.add('loading')
    } else {
      document.querySelector('body')?.classList.remove('loading')
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
  }, [showEffect])

  useEffect(() => {
    const duration = 30 * 1000
    if (timecount <= 0) dispatch(setTimecount(duration))
    const timerId = setTimeout(() => dispatch(setTimecount(timecount - 1000)), 1000)
    if (timecount <= 0) dispatch(fetchReport())
    return () => clearTimeout(timerId)
  }, [timecount])

  useEffect(() => { 
    AOS.init({ 
      startEvent: 'DOMContentLoaded', 
      duration: 1000, // Thời gian hiệu ứng (ms) 
      offset: 200, // Khoảng cách bắt đầu hiệu ứng 
      once: false
    }) 
  }, [])

  return (
    <>
      <LayoutGroup>
        <AnimatePresence>
          {showEffect ? (
            <motion.div key='loader'>
              <Loader setShowEffect={setShowEffect} />
            </motion.div>
          ) : (
            !loading &&
            !showEffect && (
              <>
                {routeElements}
                <Cursor />
              </>
            )
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
