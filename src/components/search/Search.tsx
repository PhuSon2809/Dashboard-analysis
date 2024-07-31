/* eslint-disable @typescript-eslint/no-unused-vars */
import HeadlessTippy from '@tippyjs/react/headless'
import { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useMemo, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { ProductData } from '~/@types/models'
import images from '~/assets'
import { PATH_PUBLIC_APP } from '~/constants/paths'
import { useAppSelector } from '~/redux/configStore'
import { SearchProductItem } from '../searchProductItem'
import { removeAccents } from '~/utils/format'

type SearchProps = {
  className?: string
  placeholder?: string
  variant?: 'container' | 'outline'
  setListProductId?: Dispatch<SetStateAction<string[]>>
}

const Search = memo(({ className, placeholder = 'Search', variant = 'container', setListProductId }: SearchProps) => {
  const { pathname } = useLocation()

  const { listProduct } = useAppSelector((s) => s.products)

  const [searchTerm, setSearchTerm] = useState('')
  const [showResult, setShowResult] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const listProductSearch = useMemo(() => {
    const keyword = removeAccents(searchTerm)
    if (keyword.trim() === '') {
      return []
    }

    const lowerKeyword = keyword.toLowerCase().trim()
    return listProduct.filter((product) => product.params.name.toLowerCase().includes(lowerKeyword))
  }, [searchTerm, listProduct])

  useEffect(() => {
    if (setListProductId) {
      setListProductId(listProductSearch.map((product) => product.id))
    }
  }, [setListProductId, listProductSearch])

  return (
    <div>
      <HeadlessTippy
        interactive
        placement='bottom'
        appendTo={() => document.body}
        visible={showResult && searchTerm !== '' && listProductSearch?.length > 0}
        render={(attrs) => (
          <div
            className='min-w-[300px] max-h-[280px] bg-white/[.64] backdrop-blur-2xl border-[1px] border-solid border-white rounded-lg shadow-popover-custom overflow-y-auto wrapper-content'
            tabIndex={-1}
            {...attrs}
          >
            {searchTerm !== '' && listProductSearch?.length > 0 && (
              <div className='p-2 space-y-2'>
                {listProductSearch?.map((product: ProductData) => (
                  <SearchProductItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
        onClickOutside={() => setShowResult(false)}
      >
        <div
          className={`flex items-center gap-2 xs:min-w-full sm:min-w-[320px] ${variant === 'container' ? ' h-12 px-5 bg-greyMain rounded-[44px]' : 'h-11 px-3 bg-white/[.44] rounded-lg border-blackMain/[.1] border border-solid'} ${pathname === PATH_PUBLIC_APP.category.list ? 'focus-within:bg-greyMain' : 'focus-within:bg-white'} ${className}`}
        >
          <img
            src={images.icons.search}
            alt='icon-search'
            className={`${variant === 'container' ? 'size-6' : 'size-5'}`}
          />
          {variant === 'outline' && <div className='h-6 border-0 border-r-[1px] border-solid border-blackMain/[.1]' />}
          <input
            value={searchTerm}
            onChange={handleChange}
            onFocus={(_e: any) => setShowResult(true)}
            placeholder={placeholder}
            className={`w-full h-full ${variant === 'container' ? 'bg-greyMain' : 'bg-white/[.44]'} border-none outline-none rounded-tr-[44px] rounded-br-[44px] ${pathname === PATH_PUBLIC_APP.category.list ? 'focus:bg-greyMain' : 'focus:bg-white'}`}
          />
        </div>
      </HeadlessTippy>
    </div>
  )
})

export default Search
