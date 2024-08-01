<script lang="ts">
  export let previewFiles: string[] = [];
</script>

<div class="flex flex-wrap justify-center gap-2">
  {#each previewFiles as preview}
    <img src={preview} alt="preview" />
    <p>hej</p>
  {/each}
</div>
