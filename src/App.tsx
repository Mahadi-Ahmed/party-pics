import { ChangeEvent, useRef } from 'react'
import { Button } from '@/components/ui/button'

function App() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPhoto = () => {
    console.log('click select photo')
    fileInputRef.current?.click()
  }

  // NOTE: Async or not async?
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('click upload')
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files)
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
              accept='.jpg, .jpeg, .png, .heif, .heic, .dng, .tiff'
              className='hidden'
              ref={fileInputRef}
              onChange={handleFileInput}
            />
            <Button type='button' onClick={handleSelectPhoto}>Select Photos</Button>
            <Button type='submit' variant='secondary'>Upload</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
