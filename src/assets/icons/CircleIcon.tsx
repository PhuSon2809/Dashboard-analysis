import React, { memo } from 'react'

const CircleIcon = memo(
  ({ color = 'linear', className }: { color?: 'linear' | string; opacity?: string; className?: string }) => {
    const gradientId = React.useId()

    return (
      <svg
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        className={className}
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='6' cy='6' r='6' fill={`url(#${gradientId})`} />
        <defs>
          <radialGradient
            id={gradientId}
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(7.78105 0.700351) scale(9.67719)'
          >
            <stop offset='0.01' stopColor={color === 'linear' ? '#60EC8E' : color} />
            <stop offset='0.99' stopColor={color === 'linear' ? '#5495FC' : color} />
          </radialGradient>
        </defs>
      </svg>
    )
  }
)

export default CircleIcon
