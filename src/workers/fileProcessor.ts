interface ProcessedFile {
  url: string;
  type: string;
}

self.onmessage = (event: MessageEvent<FileList>) => {
  console.log('Worker Called')
  const eventData = event.data;
  const files = Array.from(eventData)
  const processedFiles: ProcessedFile[] = files.map((file: File) => ({
    url: URL.createObjectURL(file),
    type: file.type
  }));

  self.postMessage(processedFiles);
};

export { };
