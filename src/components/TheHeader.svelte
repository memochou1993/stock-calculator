<script>
  let theme = 'dark';

  const toggleTheme = () => {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
  };
</script>

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>
<nav class="navbar navbar-expand-sm px-2 py-3">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">台股交易計算器</a>
    <div class="ms-auto">
      <button class="btn btn-sm btn-light-subtle mx-1">設定</button>
      <button class="btn btn-sm btn-light-subtle mx-1">分享</button>
      <button
        class="btn btn-light-subtle mx-1"
        on:click={toggleTheme}
        style="--bs-btn-padding-x: .125rem; --bs-btn-padding-y: .125rem;"
      >
        <span class="material-symbols-outlined d-flex">
          {theme === 'light' ? 'dark_mode' : 'light_mode'}
        </span>
      </button>
    </div>
  </div>
</nav>
