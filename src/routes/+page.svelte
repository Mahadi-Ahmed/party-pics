<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Preview from '$lib/components/Preview.svelte';
	import { onDestroy } from 'svelte';

	let fileInputElement: HTMLInputElement;
	let files: FileList | null;

	interface PreviewFile {
		url: string;
		type: string;
	}

	let previewFiles: PreviewFile[] = [];

	const handleUploadClick = () => {
		console.log('upload clicked');
		console.log(files);
		console.log(previewFiles);
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
			for (const file of files) {
				const url = URL.createObjectURL(file);
				previewFiles = [
					...previewFiles,
					{
						url: url,
						type: file.type
					}
				];
			}
		}
	};

  onDestroy(() => {
    previewFiles.forEach(file => URL.revokeObjectURL(file.url))
  })

</script>

<div class="m-2 flex flex-col items-center gap-6">
	<h1 class="text-2xl font-bold">Välkomna till vårt gemensamma fotoalbum</h1>
	<p class="text-center">
		Ladda upp kvällens bilder från ditt bildbibliotek så delas allt med oss, då har vi något att se
		fram emot efter ikväll!
	</p>
	<p class="text-sm italic">PS. Det är bara brudparet som kan se bilderna</p>
	<div class="flex justify-center gap-2">
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
	<Preview {previewFiles} />
	<!-- {#if previewFiles.length > 0} -->
	<!-- 	<Preview {previewFiles} /> -->
	<!-- {/if} -->
	{#if files}
		{#each files as file}
			<div>
				<p>{file.name}</p>
				<p>{file.type}</p>
			</div>
		{/each}
	{/if}
</div>
