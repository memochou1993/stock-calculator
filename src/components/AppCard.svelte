<script lang="ts">
import AppCardTitle from './AppCardTitle.svelte';

export let title: string = '';
</script>

<div class="bg-body-secondary rounded-3 p-lg-4">
  {#if $$slots.title}
    <slot name="title" />
    <hr />
  {:else if title}
    <AppCardTitle {title} />
    <hr />
  {/if}
  <slot />
</div>

<style lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

@include media-breakpoint-down(lg) {
  .bg-body-secondary {
    background-color: transparent !important;
  }
}
</style>
