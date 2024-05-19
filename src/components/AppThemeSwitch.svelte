<script lang="ts">
  import { onMount } from 'svelte';
  import AppIcon from './AppIcon.svelte';

  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_STORAGE_KEY = '主題';

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

  $: isDarkTheme = theme === THEME_DARK;
</script>

<button type="button" class="btn btn-dark-variant px-2" on:click={() => setTheme(isDarkTheme ? THEME_LIGHT : THEME_DARK)}>
  <AppIcon icon={isDarkTheme ? 'light_mode' : 'dark_mode'} />
</button>
