import { Tooltip } from '@radix-ui/themes'
import React from 'react'

interface AvatarGroupProps {
  children: React.ReactNode
  limit: number
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, limit }) => {
  const avatars = React.Children.toArray(children)
  const extraAvatarsCount = avatars.length - limit

  return (
    <div className='flex items-center'>
      {avatars.slice(0, limit).map((avatar, index) => (
        <div key={index} className='w-10 h-10 -ml-2 first:ml-0'>
          {avatar}
        </div>
      ))}
      {extraAvatarsCount > 0 && (
        <Tooltip
          content={
            <div className='flex space-x-2'>
              {avatars.slice(limit).map((avatar, index) => (
                <div key={index} className='w-10 h-10'>
                  {avatar}
                </div>
              ))}
            </div>
          }
        >
          <div className='w-10 h-10 -ml-2 first:ml-0 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm cursor-pointer'>
            +{extraAvatarsCount}
          </div>
        </Tooltip>
      )}
    </div>
  )
}

interface AvatarItemProps {
  src: string
  alt: string
}

const AvatarItem: React.FC<AvatarItemProps> = ({ src, alt }) => {
  return (
    <div
      className='w-10 h-10 overflow-hidden rounded-full'
      style={{
        border: '2px solid white'
      }}
    >
      <img src={src} alt={alt} className='w-full h-full object-cover' />
    </div>
  )
}

export { AvatarGroup, AvatarItem }

