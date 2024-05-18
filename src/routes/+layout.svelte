<script lang="ts">
  import { TheFooter, TheHeader } from '$components';
  import { onMount } from 'svelte';
  import './layout.scss';

  onMount(async () => {
    const bootstrap = await import('bootstrap');
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
  });
</script>

<div class="app">
  <TheHeader />
  <main class="pt-4 pt-sm-5">
    <slot />
  </main>
  <TheFooter />
</div>
