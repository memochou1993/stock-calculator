<script lang="ts">
  import AppIcon from './AppIcon.svelte';
  import AppThemeSwitch from './AppThemeSwitch.svelte';
</script>

<nav class="navbar text-light px-2 py-3">
  <div class="container-fluid">
    <div class="d-flex align-items-center">
      <img src="/favicon.png" alt="logo" class="me-2" width="24" height="24" />
      <a class="navbar-brand text-light fs-4 py-0" href="/">台股交易試算器</a>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-dark-variant px-2 me-2"
        on:click={() => {
          window.open('https://www.facebook.com/profile.php?id=61560002601019', '_blank', 'noopener noreferrer');
        }}
      >
        <AppIcon icon="thumb_up" />
      </button>
      <AppThemeSwitch />
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    background-color: var(--navbar-bg);
  }
</style>
