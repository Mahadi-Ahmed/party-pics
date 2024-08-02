import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import type { PreviewFile } from '@/App'

type PropType = {
  slides: PreviewFile[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
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
    <div className='max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md'>
      <div className='overflow-hidden rounded-lg mb-2' ref={emblaMainRef}>
        <div className='flex'>
          {slides.map((slide, index) => (
            <div className='flex-[0_0_100%] min-w-0' key={index}>
              <div className='aspect-w-16 aspect-h-9'>
                {slide.type.startsWith('image') ? (
                  <img src={slide.url} alt={`Slide ${index + 1}`} className='w-full h-full object-cover' />
                ) : slide.type.startsWith('video') ? (
                  <video src={slide.url} controls className='w-full h-full object-cover'>
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className='flex items-center justify-center w-full h-full text-gray-500'>Unsupported file type</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='overflow-hidden' ref={emblaThumbsRef}>
        <div className='flex gap-2'>
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
  )
}

export default EmblaCarousel
