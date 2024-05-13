<script>
  import Footer from '$components/TheFooter.svelte';
  import Header from '$components/TheHeader.svelte';
  import './layout.css';
</script>

<div class="app">
  <Header />
  <main class="my-4 my-md-5">
    <slot />
  </main>
  <Footer />
</div>
