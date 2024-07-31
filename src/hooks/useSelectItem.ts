import { useState } from 'react'

function useSelectItem(listSelect: any[]) {
  const [selected, setSelected] = useState<readonly string[]>([])

  const handleSelectAll = () => {
    if (selected.length === listSelect.length) {
      setSelected([])
    } else {
      const newSelected = listSelect.map((item, index) => `${item.id}-${item.quantityInCart}-${index}`)
      setSelected(newSelected)
    }
  }

  const handleSelectItem = (cartItemId: string) => {
    const selectedIndex = selected.indexOf(cartItemId)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, cartItemId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  return { selected, handleSelectItem, handleSelectAll }
}

export default useSelectItem
