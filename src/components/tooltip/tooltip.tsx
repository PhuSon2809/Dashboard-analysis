import React from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent, TooltipArrow } from '@radix-ui/react-tooltip'
import { cn } from '~/utils/taiwindMerge'

interface CustomTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

const TooltipComponent: React.FC<CustomTooltipProps> = ({ children, content, position = 'top', className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent
          side={position}
          className={cn(
            'p-2 bg-white max-w-[300px] text-black border text-sm rounded shadow-lg ',
            'data-[state=delayed-open]:animate-fadeIn',
            'data-[state=closed]:animate-fadeOut',
            className
          )}
        >
          {content}
          <TooltipArrow className='fill-current text-gray-800' />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipComponent
