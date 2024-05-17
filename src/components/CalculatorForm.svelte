<script lang="ts">
  import { CalculatorConstant, CalculatorInput, calculateStep, validate } from '$lib';
  import { afterUpdate, onMount } from 'svelte';
  import AppCard from './AppCard.svelte';

  export let calculatorInput: CalculatorInput;
  export let onUpdate: (calculatorInput: CalculatorInput) => void;

  onMount(() => {
    const 手續費折扣 = localStorage.getItem(CalculatorConstant.儲存鍵.手續費折扣);
    if (手續費折扣) {
      calculatorInput.手續費折扣 = Number(手續費折扣);
    }
    const 最低手續費 = localStorage.getItem(CalculatorConstant.儲存鍵.最低手續費);
    if (最低手續費) {
      calculatorInput.最低手續費 = Number(最低手續費);
    }
  });

  afterUpdate(() => {
    if (document.getElementsByClassName('is-invalid').length > 0) {
      return;
    }
    onUpdate(calculatorInput);
  });
</script>

<AppCard title="交易參數">
  <div class="row">
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="交易類別" class="mb-1">交易類別</label>
        <select bind:value={calculatorInput.交易類別} class="form-control form-control-md" id="交易類別">
          <option value={CalculatorConstant.交易類別.股票}>{CalculatorConstant.交易類別.股票}</option>
          <option value={CalculatorConstant.交易類別.股票當日沖銷}>{CalculatorConstant.交易類別.股票當日沖銷}</option>
          <option value={CalculatorConstant.交易類別.ETF}>{CalculatorConstant.交易類別.ETF}</option>
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
          bind:value={calculatorInput.買入價格}
          class="form-control form-control-md {!validate(calculatorInput.買入價格).isBetween(
            CalculatorConstant.交易參數.最小買入價格,
            CalculatorConstant.交易參數.最大買入價格,
          ) && 'is-invalid'}"
          id="買入價格"
          inputmode="decimal"
          max={CalculatorConstant.交易參數.最大買入價格}
          min={CalculatorConstant.交易參數.最小買入價格}
          step={calculateStep(calculatorInput.交易類別, calculatorInput.買入價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小買入價格.toLocaleString()} 到 {CalculatorConstant.交易參數.最大買入價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="賣出價格" class="mb-1">賣出價格</label>
        <input
          autocomplete="off"
          bind:value={calculatorInput.賣出價格}
          class="form-control form-control-md {!validate(calculatorInput.賣出價格).isBetween(
            CalculatorConstant.交易參數.最小賣出價格,
            CalculatorConstant.交易參數.最大賣出價格,
          ) && 'is-invalid'}"
          id="賣出價格"
          inputmode="decimal"
          max={CalculatorConstant.交易參數.最大賣出價格}
          min={CalculatorConstant.交易參數.最小賣出價格}
          step={calculateStep(calculatorInput.交易類別, calculatorInput.賣出價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小賣出價格.toLocaleString()} 到 {CalculatorConstant.交易參數.最大賣出價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="交易股數" class="mb-1">交易股數</label>
        <input
          autocomplete="off"
          bind:value={calculatorInput.交易股數}
          class="form-control form-control-md {!validate(calculatorInput.交易股數).isBetween(
            CalculatorConstant.交易參數.最小交易股數,
            CalculatorConstant.交易參數.最大交易股數,
          ) && 'is-invalid'}"
          id="交易股數"
          inputmode="numeric"
          max={CalculatorConstant.交易參數.最大交易股數}
          min={CalculatorConstant.交易參數.最小交易股數}
          step="1000"
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小交易股數.toLocaleString()} 到 {CalculatorConstant.交易參數.最大交易股數.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="手續費折扣" class="mb-1">手續費折扣</label>
        <input
          autocomplete="off"
          bind:value={calculatorInput.手續費折扣}
          class="form-control form-control-md {!validate(calculatorInput.手續費折扣).isBetween(
            CalculatorConstant.交易參數.最小手續費折扣,
            CalculatorConstant.交易參數.最大手續費折扣,
          ) && 'is-invalid'}"
          id="手續費折扣"
          inputmode="decimal"
          max={CalculatorConstant.交易參數.最大手續費折扣}
          min={CalculatorConstant.交易參數.最小手續費折扣}
          on:input={() => {
            localStorage.setItem(CalculatorConstant.儲存鍵.手續費折扣, String(calculatorInput.手續費折扣 ?? 0));
          }}
          step="0.05"
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小手續費折扣.toLocaleString()} 到 {CalculatorConstant.交易參數.最大手續費折扣.toLocaleString()} 之間的數字
        </div>
      </div>
      <div class="col-12">
        <div class="form-group mb-4">
          <label for="最低手續費" class="mb-1">最低手續費</label>
          <input
            autocomplete="off"
            bind:value={calculatorInput.最低手續費}
            class="form-control form-control-md {!validate(calculatorInput.最低手續費).isBetween(
              CalculatorConstant.交易參數.最小最低手續費,
              CalculatorConstant.交易參數.最大最低手續費,
            ) && 'is-invalid'}"
            id="最低手續費"
            inputmode="numeric"
            max={CalculatorConstant.交易參數.最大最低手續費}
            min={CalculatorConstant.交易參數.最小最低手續費}
            on:input={() => {
              localStorage.setItem(CalculatorConstant.儲存鍵.最低手續費, String(calculatorInput.最低手續費 ?? 0));
            }}
            step="1"
            type="number"
          />
          <div class="invalid-feedback">
            請輸入 {CalculatorConstant.交易參數.最小最低手續費.toLocaleString()} 到 {CalculatorConstant.交易參數.最大最低手續費.toLocaleString()} 之間的數字
          </div>
        </div>
      </div>
    </div>
  </div>
</AppCard>
