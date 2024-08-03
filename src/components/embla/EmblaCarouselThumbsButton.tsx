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
      className={`flex-[0_0_calc(33.333%-0.5rem)] min-w-0 relative pb-[20%] ml-2 rounded-md overflow-hidden ${selected ? 'ring-2 ring-primary' : 'ring-1 ring-border'
        }`}
    >
      <div className='absolute inset-0'>
        {slide.type.startsWith('image') ? (
          <img src={slide.url} alt='Thumbnail' className='w-full h-full object-cover' />
        ) : slide.type.startsWith('video') ? (
          <video src={slide.url} className='w-full h-full object-cover'>
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className='flex items-center justify-center w-full h-full bg-muted text-muted-foreground text-sm'>
            Unsupported
          </div>
        )}
      </div>
    </button>
  )
}
