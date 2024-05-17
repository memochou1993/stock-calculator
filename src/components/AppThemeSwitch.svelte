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

    prefersDarkScheme.addEventListener('change', (event) => {
      setTheme(event.matches ? THEME_DARK : THEME_LIGHT);
    });
  });

  $: isLightTheme = theme === THEME_LIGHT;
</script>

<button type="button" class="btn ms-2" on:click={() => setTheme(isLightTheme ? THEME_DARK : THEME_LIGHT)}>
  <div class="d-flex align-items-center">
    <span class="material-symbols-outlined">
      {isLightTheme ? 'dark_mode' : 'light_mode'}
    </span>
  </div>
</button>

<style lang="scss">
  .btn {
    --bs-btn-padding-x: 0.25rem;
    --bs-btn-padding-y: 0.25rem;
    border: 0;
    color: var(--bs-gray-400);
    &:hover {
      background-color: var(--btn-theme-bg);
    }
  }
</style>
