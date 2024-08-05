import * as React from 'react'
import { cn } from '~/utils/utils'

interface IButtonProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
}

const ButtonPrimary: React.FunctionComponent<IButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  icon,
  ...props
}) => {
  return (
    <button type={type} {...props} onClick={onClick} className={cn('btn-primary', className)}>
      <div className='wrapper'>
        <div className='button-content'>
          {children}
          {icon && <div className='button-content pl-2'>{icon}</div>}
        </div>

        <div className='circle circle-12' />
        <div className='circle circle-11' />
        <div className='circle circle-10' />
        <div className='circle circle-9' />
        <div className='circle circle-8' />
        <div className='circle circle-7' />
        <div className='circle circle-6' />
        <div className='circle circle-5' />
        <div className='circle circle-4' />
        <div className='circle circle-3' />
        <div className='circle circle-2' />
        <div className='circle circle-1' />
      </div>
    </button>
  )
}

export default ButtonPrimary
