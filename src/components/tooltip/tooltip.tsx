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
              'min-w-[308px] max-w-[308px] z-50 p-6 text-blackMain bg-[#FCFCFC] rounded-xl shadow-s-18 border-[#F2F2F2] border-solid border'
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
