<script lang="ts">
	import { Button } from '$lib/components/ui/button';
  import Preview from '$lib/components/Preview.svelte'

	let fileInputElement: HTMLInputElement;
	let files: FileList | null;
	let previewFiles: string[] = [];

	const handleUploadClick = () => {
		console.log('upload clicked');
		console.log(files);
		// console.log('previewFiles')
		// console.log(previewFiles)
	};
	const handleSelectClick = (event: MouseEvent) => {
		console.log('btn select clicked');
		event.preventDefault();
		fileInputElement.click();
	};

	const handleFileInput = (event: Event) => {
		console.log('handleFileInput ');
		let target = event.target as HTMLInputElement;
		files = target.files;
		previewFiles = [];

		if (files) {
			console.log('files yooo');
			for (const file of files) {
				let reader = new FileReader();
				reader.onload = (e) => {
					previewFiles = [...previewFiles, e.target?.result as string];
				};
				reader.readAsDataURL(file);
			}
		}
	};
</script>

<div class="m-2 flex flex-col items-center gap-2">
	<h1>Wedding party pics</h1>
	<p>Ladda upp dina bilder från festen</p>
	<div>
		<form enctype="multipart/form-data">
			<input
				type="file"
				name="fileToUpload"
				multiple
				accept=".jpg, .jpeg, .png, .heif, .heic, .dng, .tiff"
				bind:this={fileInputElement}
				class="hidden"
				on:change={handleFileInput}
			/>
			<Button on:click={handleSelectClick}>Select Photos</Button>
			<Button on:click={handleUploadClick} variant="secondary">Upload</Button>
		</form>
	</div>
  <Preview {previewFiles}/>
</div>
