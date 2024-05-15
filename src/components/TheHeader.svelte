<script lang="ts">
  import AppThemeSwitch from './AppThemeSwitch.svelte';
</script>

<nav class="navbar navbar-expand-md text-light px-2 py-3">
  <div class="container-fluid">
    <a class="navbar-brand text-light" href="/">台股交易計算器</a>
    <div>
      <button class="btn btn-md">設定</button>
      <button class="btn btn-md">分享</button>
      <AppThemeSwitch />
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    background-color: var(--navbar-bg);
  }
  .btn {
    border: 0;
    color: var(--bs-gray-400);
  }
</style>
