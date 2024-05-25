<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { CalculatorConstant, CalculatorInput, GTM, calculateStep, validate } from '$lib';
  import { afterUpdate, onMount } from 'svelte';
  import AppCard from './AppCard.svelte';
  import AppCardTitle from './AppCardTitle.svelte';
  import AppConfigModal from './AppConfigModal.svelte';

  export let calculatorInput: CalculatorInput;
  export let onUpdate: (calculatorInput: CalculatorInput) => void;

  onMount(() => {
    recover();
    goto('/', { replaceState: true });
  });

  const recover = () => {
    const 交易類別 = $page.url.searchParams.get('交易類別');
    if (交易類別) {
      calculatorInput.交易類別 = 交易類別;
    }
    const 交易股數 = $page.url.searchParams.get('交易股數');
    if (交易股數) {
      calculatorInput.交易股數 = Number(交易股數);
    }
    const 買入價格 = $page.url.searchParams.get('買入價格');
    if (買入價格) {
      calculatorInput.買入價格 = Number(買入價格);
    }
    const 賣出價格 = $page.url.searchParams.get('賣出價格');
    if (賣出價格) {
      calculatorInput.賣出價格 = Number(賣出價格);
    }
    const 手續費折扣 = $page.url.searchParams.get('手續費折扣') ?? localStorage.getItem(CalculatorConstant.儲存鍵.手續費折扣);
    if (手續費折扣) {
      calculatorInput.手續費折扣 = Number(手續費折扣);
    }
    const 最低手續費 = $page.url.searchParams.get('最低手續費') ?? localStorage.getItem(CalculatorConstant.儲存鍵.最低手續費);
    if (最低手續費) {
      calculatorInput.最低手續費 = Number(最低手續費);
    }
  };

  afterUpdate(() => {
    if (document.getElementsByClassName('is-invalid').length > 0) {
      return;
    }
    onUpdate(calculatorInput);
  });
</script>

<AppCard>
  <div slot="title" class="d-flex align-items-center justify-content-between">
    <AppCardTitle title="交易參數" />
    <div class="d-flex">
      <AppConfigModal {calculatorInput} onUpdate={(v) => (calculatorInput = v)} />
    </div>
  </div>
  <div class="row">
    <div class="col-6 col-md-12">
      <div class="form-group mb-4">
        <div class="d-flex align-items-center mb-1">
          <label for="交易類別" class="me-1">交易類別</label>
        </div>
        <select
          bind:value={calculatorInput.交易類別}
          class="form-control form-control-md"
          id="交易類別"
          on:blur={() => {
            GTM.pushEvent('change_transaction_type', { value: calculatorInput.交易類別 });
          }}
        >
          <option value={CalculatorConstant.交易類別.股票}>{CalculatorConstant.交易類別.股票}</option>
          <option value={CalculatorConstant.交易類別.股票當日沖銷}>{CalculatorConstant.交易類別.股票當日沖銷}</option>
          <option value={CalculatorConstant.交易類別.ETF}>{CalculatorConstant.交易類別.ETF}</option>
        </select>
      </div>
    </div>
    <div class="col-6 col-md-12">
      <div class="form-group mb-4">
        <div class="d-flex align-items-center mb-1">
          <label for="交易股數" class="me-1">交易股數</label>
        </div>
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
          on:blur={() => {
            GTM.pushEvent('change_shares', { value: calculatorInput.交易股數 });
          }}
          step="1000"
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小交易股數.toLocaleString()} 到 {CalculatorConstant.交易參數.最大交易股數.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-6 col-md-12">
      <div class="form-group mb-4">
        <div class="d-flex align-items-center mb-1">
          <label for="買入價格" class="me-1">買入價格</label>
        </div>
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
          on:blur={() => {
            GTM.pushEvent('change_purchase_price', { value: calculatorInput.買入價格 });
          }}
          step={calculateStep(calculatorInput.交易類別, calculatorInput.買入價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小買入價格.toLocaleString()} 到 {CalculatorConstant.交易參數.最大買入價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
    <div class="col-6 col-md-12">
      <div class="form-group mb-4">
        <div class="d-flex align-items-center mb-1">
          <label for="賣出價格" class="me-1">賣出價格</label>
        </div>
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
          on:blur={() => {
            GTM.pushEvent('change_selling_price', { value: calculatorInput.賣出價格 });
          }}
          step={calculateStep(calculatorInput.交易類別, calculatorInput.賣出價格)}
          type="number"
        />
        <div class="invalid-feedback">
          請輸入 {CalculatorConstant.交易參數.最小賣出價格.toLocaleString()} 到 {CalculatorConstant.交易參數.最大賣出價格.toLocaleString()} 之間的數字
        </div>
      </div>
    </div>
  </div>
</AppCard>
