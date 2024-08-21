interface ProcessedFile {
  url: string;
  type: string;
}

self.onmessage = (event: MessageEvent<File[]>) => {
  console.log('Worker Called')
  const files = event.data;
  const processedFiles: ProcessedFile[] = files.map((file: File) => ({
    url: URL.createObjectURL(file),
    type: file.type
  }));

  self.postMessage(processedFiles);
};

export { };
