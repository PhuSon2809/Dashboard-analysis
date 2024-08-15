import React, { memo } from 'react'

const NavUserIcon = memo(
  ({ color, className }: { color?: 'black' | 'white' | 'linear' | string; className?: string }) => {
    const gradientId1 = React.useId()

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
          d='M12 12.0001C14.7614 12.0001 17 9.76149 17 7.00006C17 4.23864 14.7614 2.00006 12 2.00006C9.23858 2.00006 7 4.23864 7 7.00006C7 9.76149 9.23858 12.0001 12 12.0001Z'
          fill={`url(#${gradientId1})`}
        />
        <path
          d='M21 17.77V19C21 20.65 19.65 22 18 22H6C4.35 22 3 20.65 3 19V17.77C3 16.28 4.09 15.02 5.54 14.8L10.35 13.43C11.43 13.12 12.57 13.12 13.64 13.43L18.46 14.8C19.91 15.02 21 16.28 21 17.77Z'
          fill={`url(#${gradientId1})`}
        />
        <defs>
          <linearGradient id={gradientId1} x1='23' y1='7.74704' x2='1' y2='7.74704' gradientUnits='userSpaceOnUse'>
            <stop
              stopColor={
                color === 'black' ? '#333333' : color === 'white' ? 'white' : color === 'linear' ? '#5495FC' : color
              }
            />
            <stop offset='1' stopColor={color === 'black' ? '#0D0D0D' : color === 'linear' ? '#31D366' : color} />
          </linearGradient>
        </defs>
      </svg>
    )
  }
)

export default NavUserIcon
