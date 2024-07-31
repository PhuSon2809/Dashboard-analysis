import { useState } from 'react'

function useDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return { handleOpen, setIsOpen, isOpen }
}

export default useDialog
