<script>
  import TheFooter from '$components/TheFooter.svelte';
  import TheHeader from '$components/TheHeader.svelte';
  import './layout.scss';
</script>

<div class="app">
  <TheHeader />
  <main class="my-4 my-md-5">
    <slot />
  </main>
  <TheFooter />
</div>
