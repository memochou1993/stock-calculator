<script lang="ts">
  import AppThemeSwitch from './AppThemeSwitch.svelte';
</script>

<nav class="navbar text-light px-2 py-3">
  <div class="container-fluid">
    <a class="navbar-brand text-light title-variant fs-4 py-0" href="/">台股交易計算器</a>
    <div>
      <button type="button" class="btn btn-md btn-dark-variant mx-2">分享</button>
      <AppThemeSwitch />
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    background-color: var(--navbar-bg);
  }
</style>
