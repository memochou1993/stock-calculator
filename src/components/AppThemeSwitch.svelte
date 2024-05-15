<script lang="ts">
  import { onMount } from 'svelte';

  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_STORAGE_KEY = 'theme';

  let theme: string;

  const setTheme = (v: string) => {
    theme = v;
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  onMount(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    setTheme(localStorage.getItem(THEME_STORAGE_KEY) || (prefersDarkScheme.matches ? THEME_DARK : THEME_LIGHT));

    prefersDarkScheme.addEventListener('change', (e) => {
      setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
    });
  });
</script>

<button class="btn ms-2" on:click={() => setTheme(theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT)}>
  <span class="material-symbols-outlined d-flex">
    {theme === THEME_LIGHT ? 'dark_mode' : 'light_mode'}
  </span>
</button>

<style lang="scss">
  .btn {
    --bs-btn-padding-x: 0;
    --bs-btn-padding-y: 0;
    border: 0;
    color: var(--bs-gray-400);
  }
  .material-symbols-outlined {
    font-size: 1.75rem;
  }
</style>
