<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	export let previewFiles: string[] = [];
</script>

<Carousel.Root class="" orientation="vertical">
	<Carousel.Content class="">
		{#each previewFiles as preview}
			<Carousel.Item>
				<img src={preview} alt="preview" />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
