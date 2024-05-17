<script lang="ts">
  import theme_dark from '$lib/assets/theme_dark.svg';
  import theme_light from '$lib/assets/theme_light.svg';
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
  $: alt = isLightTheme ? 'light theme' : 'dark theme';
  $: src = isLightTheme ? theme_dark : theme_light;
</script>

<button class="btn ms-2" on:click={() => setTheme(isLightTheme ? THEME_DARK : THEME_LIGHT)}>
  <img {alt} {src} width="28" />
</button>

<style lang="scss">
  .btn {
    --bs-btn-padding-x: 0;
    --bs-btn-padding-y: 0;
    border: 0;
    color: var(--bs-gray-400);
  }
</style>
