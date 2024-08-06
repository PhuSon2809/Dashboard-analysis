import classNames from 'classnames'
import React, { memo, ReactNode } from 'react'

interface AvatarGroupProps {
  limit: number
  children: ReactNode
}

const AvatarGroup: React.FC<AvatarGroupProps> = memo(({ children, limit }) => {
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
            '-ml-2 flex size-[40px] items-center justify-center rounded-full border-[1.5px] border-solid border-white bg-[#F9F5FF] pt-[3px] text-xs text-[#7F56D9] first:ml-0'
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
}

const AvatarItem: React.FC<AvatarItemProps> = memo(({ src, alt }) => (
  <div className={classNames('size-9', 'rounded-full border-[1.5px] border-solid border-white')}>
    <img src={src} alt={alt} className='size-full object-cover object-center' />
  </div>
))

export { AvatarGroup, AvatarItem }
