import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import IconBxChevronUp from '~/components/icons/chevUp'

const BaseLayout = memo(() => {
  return (
    <main className='font-proxima text-light min-h-screen w-full'>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop
        style={{ zIndex: '100' }}
        smooth
        component={<IconBxChevronUp className='rounded-full bg-secondary text-white' />}
      />
    </main>
  )
})

export default BaseLayout
