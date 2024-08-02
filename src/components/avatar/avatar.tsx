import classNames from 'classnames'
import React, { memo, ReactNode } from 'react'

interface AvatarGroupProps {
  limit: number
  isActive: boolean
  children: ReactNode
}

const AvatarGroup: React.FC<AvatarGroupProps> = memo(({ children, limit, isActive }) => {
  const avatars = React.Children.toArray(children)
  const extraAvatarsCount = avatars.length - limit

  return (
    <div className='flex items-center'>
      {avatars.slice(0, limit).map((avatar, index) => (
        <div key={index} className='-ml-2 first:ml-0'>
          {avatar}
        </div>
      ))}
      {extraAvatarsCount > 0 && (
        <div
          className={classNames(
            isActive ? 'size-9 text-sm' : 'size-7 text-xs',
            'pt-[3px] -ml-2 first:ml-0 bg-[#F9F5FF] rounded-full flex items-center justify-center text-[#7F56D9] border-[1.5px] border-solid border-white'
          )}
        >
          +{extraAvatarsCount}
        </div>
      )}
    </div>
  )
})

interface AvatarItemProps {
  src: string
  alt: string
  isActive: boolean
}

const AvatarItem: React.FC<AvatarItemProps> = memo(({ src, alt, isActive }) => (
  <div className={classNames(isActive ? 'size-9' : 'size-7', 'rounded-full border-[1.5px] border-solid border-white')}>
    <img src={src} alt={alt} className='size-full object-cover object-center' />
  </div>
))

export { AvatarGroup, AvatarItem }
