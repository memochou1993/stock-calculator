import { onMount } from 'svelte';
import { writable } from 'svelte/store';

const COOKIE_KEY = '通知';

const useAlert = () => {
  const isAlertEnabled = writable(false);

  onMount(() => {
    const lastAlertTime = localStorage.getItem(COOKIE_KEY);
    const currentTime = new Date().getTime();

    if (!lastAlertTime || currentTime - Number(lastAlertTime) > 7 * 24 * 60 * 60 * 1000) {
      isAlertEnabled.set(true);
    }
  });

  const closeAlert = () => {
    localStorage.setItem(COOKIE_KEY, new Date().getTime().toString());
    isAlertEnabled.set(false);
  };

  return {
    isAlertEnabled,
    closeAlert,
  };
};

export default useAlert;
