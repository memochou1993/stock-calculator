<script lang="ts">
import { GTM } from '$lib/gtm';
import { onMount } from 'svelte';
import AppIcon from './AppIcon.svelte';

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_STORAGE_KEY = '主題';

let theme: string;

$: isDarkTheme = theme === THEME_DARK;

onMount(() => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  setTheme(localStorage.getItem(THEME_STORAGE_KEY) || (prefersDarkScheme.matches ? THEME_DARK : THEME_LIGHT));

  prefersDarkScheme.addEventListener('change', (event) => {
    setTheme(event.matches ? THEME_DARK : THEME_LIGHT);
  });
});

const setTheme = (v: string) => {
  theme = v;
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

const toggleTheme = () => {
  setTheme(isDarkTheme ? THEME_LIGHT : THEME_DARK);
  GTM.pushEvent('toggle_theme', { value: theme });
};
</script>

<button type="button" class="btn btn-dark-variant" on:click={toggleTheme}>
  <AppIcon icon={isDarkTheme ? 'light_mode' : 'dark_mode'} />
</button>
