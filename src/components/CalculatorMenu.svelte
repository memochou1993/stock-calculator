<script>
  export let outputCount = 0;
  export let onOutputCountIncrease = () => {};
  export let onOutputCountDecrease = () => {};
</script>

<div class="dropdown">
  <button type="button" class="btn btn-variant" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
    <div class="d-flex align-items-center">
      <span class="material-symbols-outlined">tune</span>
    </div>
  </button>
  <ul class="dropdown-menu">
    <button type="button" class="btn dropdown-item" on:click={onOutputCountIncrease} disabled={outputCount >= 100}>
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">unfold_more</span>
        <span class="px-2">增加試算結果</span>
      </div>
    </button>
    <button type="button" class="btn dropdown-item" on:click={onOutputCountDecrease} disabled={outputCount <= 0}>
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">unfold_less</span>
        <span class="px-2">減少試算結果</span>
      </div>
    </button>
  </ul>
</div>
