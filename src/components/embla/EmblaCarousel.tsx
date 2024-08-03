import { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import type { PreviewFile } from '@/App'
import Fade from 'embla-carousel-fade'

type PropType = {
  slides: PreviewFile[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    ...options,
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps'
  },[Fade()])
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    align: 'start'
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className='w-full max-w-3xl mx-auto bg-card text-card-foreground rounded-lg shadow-md overflow-hidden'>
      <div className='p-2'>
        <div className='overflow-hidden' ref={emblaMainRef}>
          <div className='flex'>
            {slides.map((slide, index) => (
              <div className='flex-[0_0_100%] min-w-0 relative aspect-[4/3]' key={index}>
                {slide.type.startsWith('image') ? (
                  <img src={slide.url} alt={`Slide ${index + 1}`} className='w-full h-full object-cover rounded-md' />
                ) : slide.type.startsWith('video') ? (
                  <video src={slide.url} controls className='w-full h-full object-cover rounded-md'>
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className='flex items-center justify-center w-full h-full bg-muted text-muted-foreground rounded-md'>Unsupported file type</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='p-2'>
        <div className='overflow-hidden' ref={emblaThumbsRef}>
          <div className='flex -ml-2'>
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={slide}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
