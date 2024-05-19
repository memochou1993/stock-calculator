<script lang="ts">
  import AppShareButton from './AppShareButton.svelte';
  import AppThemeSwitch from './AppThemeSwitch.svelte';
</script>

<nav class="navbar text-light px-2 py-3">
  <div class="container-fluid">
    <a class="navbar-brand text-light fs-4 py-0" href="/">台股交易試算器</a>
    <div>
      <AppShareButton />
      <AppThemeSwitch />
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    background-color: var(--navbar-bg);
  }
</style>
