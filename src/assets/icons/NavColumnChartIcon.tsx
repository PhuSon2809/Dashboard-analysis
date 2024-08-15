import React, { memo } from 'react'

const NavColumnChartIcon = memo(
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
          d='M1.99927 13.4014H5.86222V21.9993H1.99927V13.4014ZM7.35758 8.72874H11.2205V21.9993H7.35758V8.72874ZM12.7157 13.4014H16.5786V21.9993H12.7157V13.4014ZM18.074 8.72874H21.937V21.9993H18.074V8.72874Z'
          fill={`url(#${gradientId1})`}
        />
        <path
          d='M5.30137 10.0365C5.86221 9.47563 5.98685 8.66576 5.73758 7.91799L8.35443 5.6128C8.97758 5.98668 9.66285 5.98668 10.2858 5.6128L12.9026 7.91799C12.5911 8.60345 12.778 9.47563 13.3388 10.0365C14.0864 10.784 15.3325 10.784 16.0803 10.0365C16.641 9.47563 16.7656 8.66576 16.5163 7.91799L19.1332 5.6128C19.881 6.049 20.8153 5.92437 21.4384 5.30123C22.1862 4.55367 22.1862 3.3076 21.4384 2.56005C20.6908 1.81228 19.4447 1.81228 18.6972 2.56005C18.1363 3.12066 18.0117 3.93053 18.261 4.6783L15.5818 7.04581C15.0212 6.73424 14.2734 6.73424 13.6504 7.04581L11.0336 4.74061C11.2828 4.05516 11.1582 3.24529 10.5974 2.68446C9.84979 1.93712 8.60369 1.93712 7.8559 2.68446C7.35758 3.18298 7.23274 3.99285 7.48221 4.67809L4.86537 7.04581C4.11758 6.60961 3.18327 6.67193 2.56011 7.29507C1.81232 8.04262 1.81232 9.28869 2.56011 10.0365C3.3079 10.7842 4.55379 10.784 5.30137 10.0365Z'
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

export default NavColumnChartIcon
