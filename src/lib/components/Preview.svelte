<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	interface PreviewFile {
		url: string;
		type: string;
	}

	export let previewFiles: PreviewFile[] = []
</script>

<div class="grid grid-cols-3 gap-2">
	{#each previewFiles as preview}
		<Card.Root class="overflow-hidden">
			<Card.Content class="p-0">
				<img src={preview.url} alt="preview" class="aspect-square h-full w-full object-cover" />
				<p>{preview.type}</p>
				<p>{preview.url}</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
