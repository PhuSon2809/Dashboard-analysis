/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductData, ProductInCart } from '~/@types/models'

export const getPagePagination = (items: any[], pageNumber: number, itemsPerPage: number): any[] => {
  const startIndex = (pageNumber - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return items.slice(startIndex, endIndex)
}

export const separateArray = (array: ProductData[], chunkSize: number): ProductData[][] => {
  const result: ProductData[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}

export const mergeArraysAndAddHeight = (productArrays: ProductData[], heights: string[]): ProductData[] => {
  return productArrays
    ? productArrays.map((product, idx) => ({
        ...product,
        height: heights[idx]
      }))
    : []
}

export const mergeProducts = (products: ProductInCart[]): ProductInCart[] => {
  const productMap = new Map<string, ProductInCart>()

  products.forEach((product) => {
    const key = `${product.id}-${product.vipPriceChange}-${product.retailPriceChange}`

    if (productMap.has(key)) {
      const existingProduct = productMap.get(key)!
      existingProduct.quantityInCart = (existingProduct.quantityInCart ?? 0) + (product.quantityInCart ?? 0)
    } else {
      productMap.set(key, { ...product, quantityInCart: product.quantityInCart ?? 0 })
    }
  })

  return Array.from(productMap.values())
}

export const mergeProductsResale = (products: ProductInCart[]): ProductInCart[] => {
  const productMap = new Map<string, ProductInCart>()

  products.forEach((product) => {
    const key = `${product.id}-${product.vipPriceChange}-${product.retailPriceChange}`

    if (productMap.has(key)) {
      const existingProduct = productMap.get(key)!
      existingProduct.quantityInOrder = (existingProduct.quantityInOrder ?? 0) + (product.quantityInOrder ?? 0)
    } else {
      productMap.set(key, { ...product, quantityInOrder: product.quantityInOrder ?? 0 })
    }
  })

  return Array.from(productMap.values())
}

export const groupByParentOrderId = (products: ProductInCart[]) => {
  const grouped: { [key: string]: ProductInCart[] } = {}

  products.forEach((product) => {
    const parentOrderId = product.parentOrderId as string
    if (!grouped[parentOrderId]) {
      grouped[parentOrderId] = []
    }
    grouped[parentOrderId].push(product)
  })

  return Object.values(grouped)
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
