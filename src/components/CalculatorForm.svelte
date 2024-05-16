<script lang="ts">
  import { CalculatorInput, Validator } from '$lib';
  import { afterUpdate } from 'svelte';
  import { 交易常數, 交易類別常數 } from '../constants';
  import AppCard from './AppCard.svelte';

  export let data: CalculatorInput;
  export let onUpdate: (data: CalculatorInput) => void;

  afterUpdate(() => {
    onUpdate(data);
  });
</script>

<AppCard title="交易參數">
  <div class="row">
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="交易類別" class="mb-1">交易類別</label>
        <select bind:value={data.交易類別} class="form-control form-control-md" id="交易類別">
          <option value={交易類別常數.股票}>{交易類別常數.股票}</option>
          <option value={交易類別常數.股票當日沖銷}>{交易類別常數.股票當日沖銷}</option>
          <option value={交易類別常數.ETF}>{交易類別常數.ETF}</option>
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
          bind:value={data.買入價格}
          class="form-control form-control-md {!Validator.isBetween(data.買入價格, 交易常數.最小買入價格, 交易常數.最大買入價格) && 'is-invalid'}"
          id="買入價格"
          inputmode="decimal"
          max={交易常數.最大買入價格}
          min={交易常數.最小買入價格}
          step={data.calculateStep(data.買入價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {交易常數.最小買入價格.toLocaleString()} 到 {交易常數.最大買入價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="賣出價格" class="mb-1">賣出價格</label>
        <input
          autocomplete="off"
          bind:value={data.賣出價格}
          class="form-control form-control-md {!Validator.isBetween(data.賣出價格, 交易常數.最小賣出價格, 交易常數.最大賣出價格) && 'is-invalid'}"
          id="賣出價格"
          inputmode="decimal"
          max={交易常數.最大賣出價格}
          min={交易常數.最小賣出價格}
          step={data.calculateStep(data.賣出價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {交易常數.最小賣出價格.toLocaleString()} 到 {交易常數.最大賣出價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="交易股數" class="mb-1">交易股數</label>
        <input
          autocomplete="off"
          bind:value={data.交易股數}
          class="form-control form-control-md {!Validator.isBetween(data.交易股數, 交易常數.最小交易股數, 交易常數.最大交易股數) && 'is-invalid'}"
          id="交易股數"
          inputmode="numeric"
          max={交易常數.最大交易股數}
          min={交易常數.最小交易股數}
          step="1000"
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {交易常數.最小交易股數.toLocaleString()} 到 {交易常數.最大交易股數.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-4">
        <label for="手續費折扣" class="mb-1">手續費折扣</label>
        <input
          autocomplete="off"
          bind:value={data.手續費折扣}
          class="form-control form-control-md {!Validator.isBetween(data.手續費折扣, 交易常數.最小手續費折扣, 交易常數.最大手續費折扣) && 'is-invalid'}"
          id="手續費折扣"
          inputmode="decimal"
          max={交易常數.最大手續費折扣}
          min={交易常數.最小手續費折扣}
          step="0.05"
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {交易常數.最小手續費折扣.toLocaleString()} 到 {交易常數.最大手續費折扣.toLocaleString()} 之間的數字
        </div>
      </div>
      <div class="col-12">
        <div class="form-group mb-4">
          <label for="最低手續費" class="mb-1">最低手續費</label>
          <input
            autocomplete="off"
            bind:value={data.最低手續費}
            class="form-control form-control-md {!Validator.isBetween(data.最低手續費, 交易常數.最小最低手續費, 交易常數.最大最低手續費) && 'is-invalid'}"
            id="最低手續費"
            inputmode="numeric"
            max={交易常數.最大最低手續費}
            min={交易常數.最小最低手續費}
            step="1"
            type="number"
          />
          <div class="invalid-feedback">
            請輸入 {交易常數.最小最低手續費.toLocaleString()} 到 {交易常數.最大最低手續費.toLocaleString()} 之間的數字
          </div>
        </div>
      </div>
    </div>
  </div>
</AppCard>
