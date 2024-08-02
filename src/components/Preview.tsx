import useEmblaCarousel from 'embla-carousel-react'
import type { PreviewFile } from '@/App'

interface Props {
  previewFiles: PreviewFile[]
}
export const Preview = ({ previewFiles }: Props) => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className='overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        {previewFiles.map((file, index) => (
          <div className='flex-none w-full min-w-0'>
            <img
              key={index}
              src={file.url}
              alt={`preview ${index}`}
              className='aspect-square h-full w-full object-cover' />
          </div>
        ))
        }
      </div>
    </div>
  )
}
