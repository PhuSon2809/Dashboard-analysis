/* eslint-disable @typescript-eslint/no-unused-vars */
export const getPagePagination = (items: any[], pageNumber: number, itemsPerPage: number): any[] => {
  const startIndex = (pageNumber - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return items.slice(startIndex, endIndex)
}

export function findAllDuplicateIndices(arr) {
  const duplicates = arr.reduce((acc, element, index) => {
    if (arr.indexOf(element) !== index) {
      if (!acc[element]) acc[element] = [arr.indexOf(element)]
      acc[element].push(index)
    }
    return acc
  }, {})

  return Object.fromEntries(Object.entries(duplicates).filter(([_, indices]: any) => indices.length > 1))
}
