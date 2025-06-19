<script lang="ts">
import { GTM } from '$lib/gtm';
import AppIcon from './AppIcon.svelte';
import AppThemeSwitch from './AppThemeSwitch.svelte';
</script>

<nav class="navbar text-light px-2 py-3">
  <div class="container-fluid">
    <div class="d-flex align-items-center">
      <img src="/favicon.png" alt="logo" class="me-2" width="24" height="24" />
      <a
        class="navbar-brand text-light fs-4 py-0"
        href="/"
        on:click={() => {
          GTM.pushEvent('refresh_page');
        }}
      >
        股票交易計算器
      </a>
    </div>
    <div class="d-flex">
      <button
        class="btn btn-dark-variant"
        on:click={() => {
          window.open('https://www.facebook.com/profile.php?id=61559734063696', '_blank', 'noopener noreferrer');
          GTM.pushEvent('visit_facebook_page');
        }}
        type="button"
      >
        <AppIcon icon="notifications" />
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
