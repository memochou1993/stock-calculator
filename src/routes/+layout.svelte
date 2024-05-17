<script lang="ts">
  import { TheFooter, TheHeader } from '$components';
  import { onMount } from 'svelte';
  import './layout.scss';

  onMount(() => {
    import('bootstrap');
  });
</script>

<div class="app">
  <TheHeader />
  <main class="pt-4 pt-sm-5">
    <slot />
  </main>
  <TheFooter />
</div>
