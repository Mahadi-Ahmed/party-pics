import type { PreviewFile } from '@/App'

interface Props {
  previewFiles: PreviewFile[]
}
export const Preview = ({ previewFiles }: Props) => {
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        {previewFiles.map((file, index) => (
          <img
            key={index}
            src={file.url}
            alt={`preview ${index}`}
            className='aspect-square h-full w-full object-cover' />
        ))
        }
      </div>
    </>
  )
}
