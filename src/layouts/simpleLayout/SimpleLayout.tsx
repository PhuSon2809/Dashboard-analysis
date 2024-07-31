import { memo } from 'react'
import { Outlet } from 'react-router-dom'

const SimpleLayout = memo(() => {
  return (
    <div className='container'>
      <Outlet />
    </div>
  )
})

export default SimpleLayout
