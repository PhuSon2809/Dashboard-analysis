import { memo } from 'react'

const PhoneIcon = memo(({ color = '#1A1A1A', className }: { color?: string; className?: string }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.6 14.522C13.205 17.042 7.09603 10.988 9.50003 8.45799C10.968 6.91299 9.31003 5.14799 8.39203 3.84899C6.66903 1.41399 2.88803 4.77599 3.00203 6.91499C3.36503 13.661 10.662 21.655 17.728 20.957C19.938 20.739 22.478 16.747 19.942 15.288C18.675 14.558 16.934 13.118 15.6 14.521'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
})

export default PhoneIcon
