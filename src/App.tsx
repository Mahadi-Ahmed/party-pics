import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Preview } from './components/Preview';

export interface PreviewFile {
  url: string;
  type: string;
}

function App() {
  const [rawUserFiles, setRawUserFiles] = useState<File[]>([])
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([])
  const [debug, setDebug] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPhoto = async () => {
    console.log('click select photo')
    fileInputRef.current?.click()
    await getHelloWorld()
  }

  const getHelloWorld = async () => {
    const response = await fetch('https://europe-north1-mahadi-tabu-wedding-pic-app.cloudfunctions.net/hello-world')
    // const response = await fetch('http://localhost:8080')
    try {
      console.log('response from api:')
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    return () => {
      return previewFiles.forEach(file => URL.revokeObjectURL(file.url))
    }
  }, [previewFiles])

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('click upload')
    // console.log(rawUserFiles)
    console.log('previewFiles')
    console.log(previewFiles)
    setDebug(true)
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileInput ')
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      setRawUserFiles(fileArray)
      const previewUrls = fileArray.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type
      }))
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
        <Preview previewFiles={previewFiles} />
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
