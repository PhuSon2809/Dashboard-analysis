import { memo } from 'react'

const DecreaseIcon = memo(
  ({ color, className }: { color?: 'white' | 'green' | 'pink' | string; className?: string }) => {
    return (
      <svg
        width='24'
        height='25'
        viewBox='0 0 24 25'
        fill='none'
        className={className}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15 18.5H21V12.5'
          stroke={color === 'white' ? 'white' : color === 'green' ? '#00CA39' : color === 'pink' ? '#F04770' : color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3 7.5L7.443 12.723C7.753 13.088 7.909 13.27 8.101 13.363C8.27091 13.4438 8.46016 13.475 8.647 13.453C8.859 13.429 9.065 13.307 9.477 13.063L12.303 11.389C12.688 11.16 12.881 11.046 13.081 11.019C13.2573 10.995 13.4368 11.0185 13.601 11.087C13.788 11.164 13.945 11.324 14.259 11.643L21 18.5'
          stroke={color === 'white' ? 'white' : color === 'green' ? '#00CA39' : color === 'pink' ? '#F04770' : color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  }
)

export default DecreaseIcon
