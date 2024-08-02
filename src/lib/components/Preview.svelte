<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	export let previewFiles: string[] = [];
</script>

<div class="grid grid-cols-3 gap-2">
	{#each previewFiles as preview}
		<Card.Root class="overflow-hidden">
			<Card.Content class="p-0">
				<img src={preview} alt="preview" class="aspect-square h-full w-full object-cover" />
        <p>{preview.split(';')[0]}</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
