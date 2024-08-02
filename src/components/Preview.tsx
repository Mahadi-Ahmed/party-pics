import type { PreviewFile } from '@/App'
import EmblaCarousel from './embla/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

interface Props {
  previewFiles: PreviewFile[]
}

export const Preview = ({ previewFiles }: Props) => {
  const OPTIONS: EmblaOptionsType = {}

  return (
    <>
      {previewFiles.length > 0 && (
        <EmblaCarousel slides={previewFiles} options={OPTIONS} />
      )}
    </>
  )
}
