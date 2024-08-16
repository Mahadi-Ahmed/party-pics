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
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      return previewFiles.forEach(file => URL.revokeObjectURL(file.url))
    }
  }, [previewFiles])

  const handleSelectPhoto = async () => {
    console.log('click select photo')
    fileInputRef.current?.click()
  }

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('click upload')
    setUploading(true)

    /*
     * NOTE: Create a 2 stage rocket
     * 1. Gest signed urls for each picture
     * 2. Upload each picture using the signed url
     * */
    const gcpUrl = 'https://europe-north1-mahadi-tabu-wedding-pic-app.cloudfunctions.net/generate-signed-urls'
    // const gcpUrl = 'http://localhost:8080'
    const filesInfo = rawUserFiles.map(file => ({ name: file.name, type: file.type }))
    console.log(filesInfo)
    try {
      const signedUrlsResponse = await fetch(gcpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filesInfo)
      })

      if (!signedUrlsResponse.ok) {
        throw new Error(`Error with getSignedUrls  for : ${signedUrlsResponse.status}`)
      }

      const signedUrls = await signedUrlsResponse.json()
      const uploadAll = rawUserFiles.map(async (file) => {
        const signedUrl = signedUrls[file.name]
        if (!signedUrl) {
          throw new Error(`No signed url for file ${file.name}`)
        }

        const upload = await fetch(signedUrl, {
          method: 'PUT',
          body: file
        })

        if (!upload.ok) {
          throw new Error(`Error uploading the file ${file.name}`)
        }
      })

      const uploadResult = await Promise.allSettled(uploadAll)
      console.log('All files uploaded successfully')
      console.log(uploadResult)
    } catch (error) {
      console.log('kalabalik uploading')
      console.log(error)
    } finally {
      setDebug(true)
      setUploading(false)
    }
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
              <Button type='submit' variant='secondary' disabled={uploading || rawUserFiles.length === 0}>{uploading ? 'Uploading...' : 'Upload'}</Button>
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
