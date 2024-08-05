import { throttle } from 'lodash'
import { useEffect } from 'react'

interface ICursorProps {}

const Cursor: React.FunctionComponent<ICursorProps> = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor')
    if (!cursor) return

    const updateCursor = (e: MouseEvent) => {
      cursor.setAttribute('style', 'top: ' + (e.pageY - scrollY) + 'px; left: ' + e.pageX + 'px')
    }

    const handleMouseMove = throttle(updateCursor, 16)

    document.addEventListener('mousemove', handleMouseMove)

    document.addEventListener('click', () => {
      cursor.classList.add('expand')

      setTimeout(() => {
        cursor.classList.remove('expand')
      }, 500)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', () => {})
    }
  }, [])

  return <div className='cursor'></div>
}

export default Cursor
