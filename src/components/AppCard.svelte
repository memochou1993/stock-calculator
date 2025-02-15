<script lang="ts">
import AppCardTitle from './AppCardTitle.svelte';

export let title: string = '';
</script>

<div class="bg-body-secondary rounded-3">
  <div class="container-fluid p-4">
    {#if $$slots.title}
      <slot name="title" />
      <hr />
    {:else if title}
      <AppCardTitle {title} />
      <hr />
    {/if}
    <slot />
  </div>
</div>
