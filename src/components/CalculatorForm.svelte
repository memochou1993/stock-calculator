<script lang="ts">
  import AppCard from './AppCard.svelte';

  const MIN_買入價格 = 0;
  const MIN_賣出價格 = 0;
  const MIN_交易股數 = 0;
  const MAX_買入價格 = 10000;
  const MAX_賣出價格 = 10000;
  const MAX_交易股數 = 100000000;

  const state = {
    交易類別: '股票',
    買入價格: null,
    賣出價格: null,
    交易股數: 1000,
  };

  const calcInputStep = (price: number | null): number => {
    if (!price) return 0.01;
    if (state.交易類別 === 'ETF') {
      if (price < 50) return 0.01;
      return 0.05;
    }
    if (price < 10) return 0.01;
    if (price < 50) return 0.05;
    if (price < 100) return 0.1;
    if (price < 500) return 0.5;
    if (price < 1000) return 1;
    return 5;
  };

  const isInRange = (value: number | null, min: number, max: number) => {
    return !value || (value >= min && value <= max);
  };
</script>

<AppCard title="交易參數">
  <div class="row">
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="交易類別" class="mb-1">交易類別</label>
        <select bind:value={state.交易類別} class="form-control form-control-md" id="交易類別">
          <option value="股票">股票</option>
          <option value="股票當日沖銷">股票當日沖銷</option>
          <option value="ETF">ETF</option>
        </select>
      </div>
    </div>
    <div class="col-12">
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
          step={calcInputStep(state.買入價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {MIN_買入價格.toLocaleString()} 到 {MAX_買入價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
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
          step={calcInputStep(state.賣出價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {MIN_賣出價格.toLocaleString()} 到 {MAX_賣出價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
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
</AppCard>
