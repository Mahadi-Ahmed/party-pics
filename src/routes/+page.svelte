<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let fileInput: HTMLInputElement;

	const handleClick = () => {
		console.log('btn clicked');
		fileInput.click();
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div>
	<form enctype="multipart/form-data">
		<input
			type="file"
			name="fileToUpload"
			multiple
			accept=".jpg, .jpeg, .png, .heif, .heic, .dng, .tiff"
			class="fileInput"
			bind:this={fileInput}
		/>
		<Button on:click={handleClick}>Click me</Button>
	</form>
</div>

<style>
	.fileInput {
		display: none;
	}
</style>
