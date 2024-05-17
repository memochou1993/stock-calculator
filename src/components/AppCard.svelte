<script lang="ts">
  export let title: string = '';
</script>

<div class="bg-body-secondary rounded-3">
  <div class="container-fluid p-4">
    {#if $$slots.title}
      <slot name="title" />
      <hr />
    {:else if title}
      <p class="fs-4 fw-medium mb-0">
        {title}
      </p>
      <hr />
    {/if}
    <slot />
  </div>
</div>
