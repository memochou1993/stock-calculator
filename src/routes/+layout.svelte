<script lang="ts">
  import TheFooter from '$components/TheFooter.svelte';
  import TheHeader from '$components/TheHeader.svelte';
  import './layout.scss';
</script>

<div class="app">
  <TheHeader />
  <main class="pt-4 pt-sm-5">
    <slot />
  </main>
  <TheFooter />
</div>
