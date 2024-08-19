// import jsQR from 'jsqr'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import toast from 'react-hot-toast'
// import { SaveIcon } from '~/components/icons'
// import { convertStringToSeedPhrase } from '~/utils/convert'

type UploadQRProps = {
  imageToShow?: string
  setImageToShow?: Dispatch<SetStateAction<string>>
  setCustomSeedphrase?: Dispatch<SetStateAction<string>>
  setPriKey?: Dispatch<SetStateAction<string>>
}

const UploadQR = memo(({ imageToShow, setImageToShow }: UploadQRProps) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('The uploaded file is not an image. Please upload a valid image file.')
      return
    }

    setImageToShow(URL.createObjectURL(file))
    const reader = new FileReader()
    // reader.onloadend = (event) => {
    //   const img = new Image()
    //   img.onload = function () {
    //     const canvas = document.createElement('canvas')
    //     canvas.width = img.width
    //     canvas.height = img.height
    //     const context = canvas.getContext('2d')
    //     context?.drawImage(img, 0, 0)
    //     const imageData = context?.getImageData(0, 0, canvas.width, canvas.height)
    //     if (imageData) {
    //       const code = jsQR(imageData.data, imageData.width, imageData.height)
    //       if (code?.data) {
    //         if (setCustomSeedphrase) {
    //           const codeConvert = convertStringToSeedPhrase(code.data)
    //           const duplicates = codeConvert.filter((word, index) => codeConvert.indexOf(word) !== index)
    //           if (duplicates.length === 0 && codeConvert.length === 24) {
    //             setCustomSeedphrase(codeConvert.join(' '))
    //           } else {
    //             toast.error('Invalid QR seed phrase!')
    //           }
    //         } else if (setPriKey) {
    //           setPriKey(code.data)
    //         }
    //       } else {
    //         toast.error('No QR code found!')
    //       }
    //     } else {
    //       console.error('Failed to get image data!')
    //     }
    //   }

    //   if (typeof event.target?.result === 'string') {
    //     img.src = event.target.result
    //   } else {
    //     console.error('FileReader result is not a string')
    //   }
    // }
    reader.readAsDataURL(file)
  }, [])

  return (
    <div className='w-full h-fit flex flex-1 flex-col items-center gap-3'>
      {/* {!hideOr && (
        <div className='flex items-center gap-2'>
          <div className='w-[67px] h-[1px] bg-black/[.10]' />
          <p className='text-[16px]/[26px] font-customSemiBold tracking-[1%]'>OR</p>
          <div className='w-[67px] h-[1px] bg-black/[.10]' />
        </div>
      )} */}

      <div className='w-full h-fit p-3 flex flex-col gap-3 items-center rounded-[8.4px] border-[2px] border-dotted border-blackMain/[.22]'>
        <div className='p-5 flex min-h-[126px]'>
          {imageToShow ? (
            <div className='size-full p-2 bg-white rounded-lg'>
              <img src={imageToShow} alt='imageToShow' className='size-full object-cover object-center' />
            </div>
          ) : (
            <div className='flex flex-1 flex-col items-center justify-center'>
              {/* <SaveIcon /> */}
              <p className='text-[16px]/[27.3px] tracking-[1%] font-customMedium'>Input with QR code</p>
            </div>
          )}
        </div>

        <div className='w-full flex items-center gap-1 text-[14px] tracking-[1%]'>
          <button className='w-full h-[33px] rounded border-[1px] border-solid border-blackMain hover:scale-[102%] transition-all duration-150 ease-in-out'>
            Scan QR code
          </button>
          <div className='w-full h-[33px] hover:scale-[102%] transition-all duration-150 ease-in-out relative'>
            <button className='size-full rounded border-[1px] border-solid border-blackMain'>Upload image</button>
            <input
              key={imageToShow}
              type='file'
              className='absolute inset-0 opacity-0 cursor-pointer'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default UploadQR
