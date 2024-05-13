<script>
  import CalculatorUsage from '$components/CalculatorUsage.svelte';
</script>

<div class="container">
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
          class="form-control form-control-md"
          id="買入價格"
          inputmode="decimal"
          max="10000"
          min="0"
          step="0.1"
          type="number"
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group mb-4">
        <label for="賣出價格" class="mb-1">賣出價格</label>
        <input
          autocomplete="off"
          class="form-control form-control-md"
          id="賣出價格"
          inputmode="decimal"
          max="10000"
          min="0"
          step="0.1"
          type="number"
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group mb-4">
        <label for="交易股數" class="mb-1">交易股數</label>
        <input
          autocomplete="off"
          class="form-control form-control-md"
          id="交易股數"
          inputmode="numeric"
          max="100000000"
          min="0"
          step="1000"
          type="number"
          value="1000"
        />
      </div>
    </div>
  </div>
  <CalculatorUsage />
</div>
