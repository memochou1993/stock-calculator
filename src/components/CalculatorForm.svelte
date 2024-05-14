<script lang="ts">
  const MIN_買入價格 = 0;
  const MIN_賣出價格 = 0;
  const MIN_交易股數 = 0;
  const MAX_買入價格 = 10000;
  const MAX_賣出價格 = 10000;
  const MAX_交易股數 = 100000000;

  const state = {
    交易類別: '現股',
    買入價格: null,
    賣出價格: null,
    交易股數: 1000,
  };

  const isInRange = (value: number | null, min: number, max: number) => {
    return !value || (value >= min && value <= max);
  };
</script>

<div class="row">
  <div class="col-md-3">
    <div class="form-group mb-4">
      <label for="交易類別" class="mb-1">交易類別</label>
      <select class="form-control form-control-md" id="交易類別">
        <option value="現股">現股</option>
        <option value="現股當沖">現股當沖</option>
        <option value="ETF">ETF</option>
      </select>
    </div>
  </div>
  <div class="col-md-3">
    <div class="form-group mb-4">
      <label for="買入價格" class="mb-1">買入價格</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        autocomplete="off"
        autofocus
        bind:value={state.買入價格}
        class="form-control form-control-md {!isInRange(state.買入價格, MIN_買入價格, MAX_買入價格) && 'is-invalid'}"
        id="買入價格"
        inputmode="decimal"
        max={MAX_買入價格}
        min={MIN_買入價格}
        step="0.1"
        type="number"
      />
      <div class="invalid-feedback">
        請輸入 {MIN_買入價格.toLocaleString()} 到 {MAX_買入價格.toLocaleString()} 之間的數字
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="form-group mb-4">
      <label for="賣出價格" class="mb-1">賣出價格</label>
      <input
        autocomplete="off"
        bind:value={state.賣出價格}
        class="form-control form-control-md {!isInRange(state.賣出價格, MIN_賣出價格, MAX_賣出價格) && 'is-invalid'}"
        id="賣出價格"
        inputmode="decimal"
        max={MAX_賣出價格}
        min={MIN_賣出價格}
        step="0.1"
        type="number"
      />
      <div class="invalid-feedback">
        請輸入 {MIN_賣出價格.toLocaleString()} 到 {MAX_賣出價格.toLocaleString()} 之間的數字
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="form-group mb-4">
      <label for="交易股數" class="mb-1">交易股數</label>
      <input
        autocomplete="off"
        bind:value={state.交易股數}
        class="form-control form-control-md {!isInRange(state.交易股數, MIN_交易股數, MAX_交易股數) && 'is-invalid'}"
        id="交易股數"
        inputmode="numeric"
        max="MAX_交易股數"
        min="MIN_交易股數"
        step="1000"
        type="number"
      />
      <div class="invalid-feedback">
        請輸入 {MIN_交易股數.toLocaleString()} 到 {MAX_交易股數.toLocaleString()} 之間的數字
      </div>
    </div>
  </div>
</div>
