<script lang="ts">
  import AppThemeSwitch from './AppThemeSwitch.svelte';
</script>

<nav class="navbar navbar-expand-sm text-light px-2 py-3">
  <div class="container-fluid">
    <a class="navbar-brand text-light" href="/">台股交易計算器</a>
    <div class="ms-auto">
      <button class="btn btn-sm btn-outline-light mx-1">設定</button>
      <button class="btn btn-sm btn-outline-light mx-1">分享</button>
      <AppThemeSwitch />
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    background-color: var(--navbar-bg);
  }
</style>
