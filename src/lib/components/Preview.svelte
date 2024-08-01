<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	export let previewFiles: string[] = [];
</script>

<div class="relative w-full pb-12 pt-12">
	<Carousel.Root 
    opts={{
      align: "center"
    }}
    orientation="vertical"
    class="w-full max-w-xs mx-auto" 
  >
		<Carousel.Content>
			{#each previewFiles as preview}
				<Carousel.Item class="basis-full">
          <div class="">
					<img src={preview} alt="preview" class="w-full h-full object-cover rounded-md" />
          </div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
