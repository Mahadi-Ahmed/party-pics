import React from 'react'
import type { PreviewFile } from '@/App'

type PropType = {
  selected: boolean
  slide: PreviewFile
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, slide, onClick } = props
  return (
    <button
      onClick={onClick}
      type='button'
      className={`flex-[0_0_calc(16.666%-0.5rem)] min-w-0 aspect-square rounded-md overflow-hidden ${selected ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
        }`}
    >
      {slide.type.startsWith('image') ? (
        <img src={slide.url} alt='Thumbnail' className='w-full h-full object-cover' />
      ) : slide.type.startsWith('video') ? (
        <video src={slide.url} className='w-full h-full object-cover'>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className='flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm'>
          Unsupported
        </div>
      )}
    </button>
  )
}
