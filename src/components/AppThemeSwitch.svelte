<script lang="ts">
  let theme = 'dark';

  const toggle = () => {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
  };
</script>

<button class="btn ms-3" on:click={toggle}>
  <span class="material-symbols-outlined d-flex">
    {theme === 'light' ? 'dark_mode' : 'light_mode'}
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
