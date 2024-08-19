import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Dispatch, Fragment, memo, ReactNode, SetStateAction, useRef } from 'react'

type DialogCustomProps = {
  variant?: 'vertical' | 'horizontal'
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  className?: string
  classNameBg?: string
  positionDialog?: string
  showBackground?: boolean
  onMouseLeave?: () => void
}

const DialogCustom = memo(
  ({
    open,
    setOpen,
    children,
    className,
    classNameBg,
    variant = 'vertical',
    positionDialog,
    showBackground = false,
    onMouseLeave
  }: DialogCustomProps) => {
    const cancelButtonRef = useRef(null)

    return (
      <Transition show={open} as={Fragment}>
        <Dialog className='relative z-[600]' initialFocus={cancelButtonRef} onClose={setOpen}>
          {showBackground && (
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div
                className={`fixed inset-0 bg-black/[.22] backdrop-blur-[80px] transition-opacity duration-200 ease-in-out ${classNameBg}`}
              />
            </TransitionChild>
          )}

          <div className='hidden-scroll fixed inset-0 z-[600] w-screen overflow-y-auto'>
            <div
              className={`flex min-h-full xs:px-4 sm:px-0 ${variant !== 'vertical' ? 'sm:pr-[11px]' : ''} ${positionDialog ? positionDialog : 'items-start'} justify-center`}
            >
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <DialogPanel
                  onMouseLeave={onMouseLeave}
                  className={`shadow-4xl transform overflow-hidden bg-white/[.44] backdrop-blur-[40px] ${variant === 'vertical' ? 'rounded-br-xl rounded-tr-xl' : 'rounded-xl'} mx-auto my-5 min-h-[500px] w-full max-w-[1400px] transition-all xs:p-4 sm:p-5 ${className}`}
                >
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
)

export default DialogCustom
