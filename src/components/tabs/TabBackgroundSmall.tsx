import { memo } from 'react'

const TabBackgroundSmall = memo(({ color = 'white', className }: { color?: 'white' | 'grey'; className?: string }) => {
  return (
    <svg
      width='97'
      height='48'
      viewBox='0 0 97 48'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_3011_3064)'>
        <path
          d='M0 4.65842C0 3.19021 1.19021 2 2.65842 2H74.9242C79.0479 2 82.6266 4.84458 83.5571 8.86197L92.1584 46H0V4.65842Z'
          fill={color === 'white' ? 'white' : '#F4F4F5'}
        />
      </g>
      <defs>
        <filter
          id='filter0_d_3011_3064'
          x='0'
          y='0.227723'
          width='96.5889'
          height='47.5446'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='2.65842' />
          <feGaussianBlur stdDeviation='0.886139' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_3011_3064' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_3011_3064' result='shape' />
        </filter>
      </defs>
    </svg>
  )
})

export default TabBackgroundSmall
