import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [rawUserFiles, setRawUserFiles] = useState<File[]>([])
  const [previewFiles, setPreviewFiles] = useState<string[]>([])
  const [debug, setDebug] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPhoto = () => {
    console.log('click select photo')
    fileInputRef.current?.click()
  }

  useEffect(() => {
    return () => {
      return previewFiles.forEach(URL.revokeObjectURL)
    }
  }, [previewFiles])

  // NOTE: Async or not async?
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('click upload')
    console.log(rawUserFiles)
    setDebug(true)
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileInput ')
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      setRawUserFiles(fileArray)
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setPreviewFiles(previewUrls)
    }
  }

  return (
    <>
      <div className='m-2 flex flex-col items-center gap-6'>
        <h1 className='text-2xl font-bold'>Välkomna till vårt gemensamma fotoalbum</h1>
        <p className='text-center'>
          Ladda upp kvällens bilder från ditt bildbibliotek så delas allt med oss, då har vi något att se
          fram emot efter ikväll!
        </p>
        <p className='text-sm italic'>PS. Det är bara brudparet som kan se bilderna</p>
        <div className='flex justify-center gap-2'>
          <form encType='multipart/form-data' onSubmit={handleUpload}>
            <input
              type='file'
              multiple
              accept='.jpg, .jpeg, .png, .heif, .heic, .dng, .tiff, video/*'
              className='hidden'
              ref={fileInputRef}
              onChange={handleFileInput}
            />
            <div className='flex gap-2'>
              <Button type='button' onClick={handleSelectPhoto}>Select Photos</Button>
              <Button type='submit' variant='secondary'>Upload</Button>
            </div>
          </form>
        </div>
        <img src={previewFiles[0]} alt='preview' className='aspect-square h-full w-full object-cover' />
      </div>
      {debug && (
        <div className='m-2 flex flex-col items-center gap-6'>
          <h4>Debug stuff</h4>
          {rawUserFiles.map((file, index) => (
            <p key={index}>{file.name}: {file.type}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App
