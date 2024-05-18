<script lang="ts">
  import AppTitle from './AppTitle.svelte';

  export let title: string = '';
</script>

<div class="bg-body-secondary rounded-3">
  <div class="container-fluid p-4">
    {#if $$slots.title}
      <slot name="title" />
      <hr />
    {:else if title}
      <AppTitle {title} />
      <hr />
    {/if}
    <slot />
  </div>
</div>
