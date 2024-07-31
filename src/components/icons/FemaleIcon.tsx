import { memo } from 'react'

const FemaleIcon = memo(({ color = '#EC148F', className }: { color?: string; className?: string }) => {
  return (
    <svg
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 10.5C9.06087 10.5 10.0783 10.0786 10.8284 9.32843C11.5786 8.57828 12 7.56087 12 6.5C12 5.43913 11.5786 4.42172 10.8284 3.67157C10.0783 2.92143 9.06087 2.5 8 2.5C6.93913 2.5 5.92172 2.92143 5.17157 3.67157C4.42143 4.42172 4 5.43913 4 6.5C4 7.56087 4.42143 8.57828 5.17157 9.32843C5.92172 10.0786 6.93913 10.5 8 10.5ZM8 10.5V14.5M6.66667 13.1667H9.33333'
        stroke={color}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
})

export default FemaleIcon
