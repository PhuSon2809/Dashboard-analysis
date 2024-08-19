import React, { ReactNode } from 'react'
import classNames from 'classnames'
import * as Tooltip from '@radix-ui/react-tooltip'

interface TooltipProps {
  position: 'top' | 'bottom' | 'left' | 'right'
  content: ReactNode
  children: ReactNode
}

const TooltipCustom: React.FC<TooltipProps> = ({ content, children, position }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={position}
            align='center'
            sideOffset={5}
            className={classNames(
              'z-50 min-w-[308px] max-w-[308px] rounded-xl border border-solid border-[#F2F2F2] bg-[#FCFCFC] p-6 text-blackMain shadow-s-18'
            )}
          >
            {content}
            <Tooltip.Arrow className='fill-[#FCFCFC]' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipCustom
