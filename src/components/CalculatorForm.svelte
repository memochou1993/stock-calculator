<script lang="ts">
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { CalculatorConstant, CalculatorInput } from '$lib/calculator';
import { getPriceStep, getShareStep } from '$lib/calculator/utils';
import { GTM } from '$lib/gtm';
import { float } from '$lib/utils';
import { validator } from '$lib/validator';
import { afterUpdate, onMount } from 'svelte';
import AppCard from './AppCard.svelte';
import AppCardTitle from './AppCardTitle.svelte';
import AppConfigModal from './AppConfigModal.svelte';
import AppIcon from './AppIcon.svelte';

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
  const 買入價格 = $page.url.searchParams.get('買入價格');
  if (買入價格) {
    calculatorInput.買入價格 = Number(買入價格);
  }
  const 賣出價格 = $page.url.searchParams.get('賣出價格');
  if (賣出價格) {
    calculatorInput.賣出價格 = Number(賣出價格);
  }
  const 交易股數 = $page.url.searchParams.get('交易股數');
  if (交易股數) {
    calculatorInput.交易股數 = Number(交易股數);
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
    <div class="col-12">
      <div class="form-group mb-2 mb-lg-4">
        <div class="d-flex align-items-center mb-1">
          <label for="交易類別">交易類別</label>
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
          <option value={CalculatorConstant.交易類別.股票當沖}>{CalculatorConstant.交易類別.股票當沖}</option>
          <option value={CalculatorConstant.交易類別.ETF}>{CalculatorConstant.交易類別.ETF}</option>
        </select>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-2 mb-lg-4">
        <div class="d-flex align-items-center mb-1">
          <label for="買入價格">買入價格</label>
        </div>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="input-group">
          <button
            class="input-group-text btn-variant btn-outline"
            type="button"
            on:click={() => {
              if (Number(calculatorInput.買入價格) <= CalculatorConstant.買入價格.最小) {
                return;
              }
              calculatorInput.買入價格 = float
                .create(calculatorInput.買入價格)
                .subtract(getPriceStep(calculatorInput.交易類別, calculatorInput.買入價格))
                .getValue();
            }}
          >
            <AppIcon fontSize={20} icon="remove" />
          </button>
          <input
            autocomplete="off"
            autofocus
            aria-describedby="買入價格單位"
            aria-label="買入價格"
            bind:value={calculatorInput.買入價格}
            class="form-control form-control-md {!validator
              .create(calculatorInput.買入價格)
              .isBetween(CalculatorConstant.買入價格.最小, CalculatorConstant.買入價格.最大) && 'is-invalid'}"
            id="買入價格"
            inputmode="decimal"
            max={CalculatorConstant.買入價格.最大}
            min={CalculatorConstant.買入價格.最小}
            on:blur={() => {
              GTM.pushEvent('change_purchase_price', { value: calculatorInput.買入價格 });
            }}
            step={getPriceStep(calculatorInput.交易類別, calculatorInput.買入價格)}
            type="number"
          />
          <button
            class="input-group-text btn-variant btn-outline"
            type="button"
            on:click={() => {
              if (Number(calculatorInput.買入價格) >= CalculatorConstant.買入價格.最大) {
                return;
              }
              calculatorInput.買入價格 = float
                .create(calculatorInput.買入價格)
                .add(getPriceStep(calculatorInput.交易類別, calculatorInput.買入價格))
                .getValue();
            }}
          >
            <AppIcon fontSize={20} icon="add" />
          </button>
          <span class="input-group-text rounded-end px-2" id="買入價格單位">元</span>
          <div class="invalid-feedback">
            {`請輸入 ${CalculatorConstant.買入價格.最小.toLocaleString()} 至 ${CalculatorConstant.買入價格.最大.toLocaleString()} 之間的數字`}
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-2 mb-lg-4">
        <div class="d-flex align-items-center mb-1">
          <label for="賣出價格">賣出價格</label>
        </div>
        <div class="input-group">
          <button
            class="input-group-text btn-variant btn-outline"
            type="button"
            on:click={() => {
              if (Number(calculatorInput.賣出價格) <= CalculatorConstant.賣出價格.最小) {
                return;
              }
              calculatorInput.賣出價格 = float
                .create(calculatorInput.賣出價格)
                .subtract(getPriceStep(calculatorInput.交易類別, calculatorInput.賣出價格))
                .getValue();
            }}
          >
            <AppIcon fontSize={20} icon="remove" />
          </button>
          <input
            autocomplete="off"
            aria-describedby="賣出價格單位"
            aria-label="賣出價格"
            bind:value={calculatorInput.賣出價格}
            class="form-control form-control-md {!validator
              .create(calculatorInput.賣出價格)
              .isBetween(CalculatorConstant.賣出價格.最小, CalculatorConstant.賣出價格.最大) && 'is-invalid'}"
            id="賣出價格"
            inputmode="decimal"
            max={CalculatorConstant.賣出價格.最大}
            min={CalculatorConstant.賣出價格.最小}
            on:blur={() => {
              GTM.pushEvent('change_selling_price', { value: calculatorInput.賣出價格 });
            }}
            step={getPriceStep(calculatorInput.交易類別, calculatorInput.賣出價格)}
            type="number"
          />
          <button
            class="input-group-text btn-variant btn-outline"
            type="button"
            on:click={() => {
              if (Number(calculatorInput.賣出價格) >= CalculatorConstant.賣出價格.最大) {
                return;
              }
              calculatorInput.賣出價格 = float
                .create(calculatorInput.賣出價格)
                .add(getPriceStep(calculatorInput.交易類別, calculatorInput.賣出價格))
                .getValue();
            }}
          >
            <AppIcon fontSize={20} icon="add" />
          </button>
          <span class="input-group-text rounded-end px-2" id="賣出價格單位">元</span>
          <div class="invalid-feedback">
            {`請輸入 ${CalculatorConstant.賣出價格.最小.toLocaleString()} 至 ${CalculatorConstant.賣出價格.最大.toLocaleString()} 之間的數字`}
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-2 mb-lg-4">
        <div class="d-flex align-items-center mb-1">
          <label for="交易股數">交易股數</label>
        </div>
        <div class="input-group">
          <button
            class="input-group-text btn-variant btn-outline"
            type="button"
            on:click={() => {
              if (Number(calculatorInput.交易股數) <= CalculatorConstant.交易股數.最小) {
                return;
              }
              calculatorInput.交易股數 = float.create(calculatorInput.交易股數).subtract(getShareStep(calculatorInput.交易股數)).getValue();
            }}
          >
            <AppIcon fontSize={20} icon="remove" />
          </button>
          <input
            aria-describedby="交易股數單位"
            aria-label="交易股數"
            autocomplete="off"
            bind:value={calculatorInput.交易股數}
            class="form-control form-control-md {!validator
              .create(calculatorInput.交易股數)
              .isBetween(CalculatorConstant.交易股數.最小, CalculatorConstant.交易股數.最大) && 'is-invalid'}"
            id="交易股數"
            inputmode="numeric"
            max={CalculatorConstant.交易股數.最大}
            min={CalculatorConstant.交易股數.最小}
            on:blur={() => {
              GTM.pushEvent('change_shares', { value: calculatorInput.交易股數 });
            }}
            step={getShareStep(calculatorInput.交易股數)}
            type="number"
          />
          <button
            class="input-group-text btn-variant btn-outline"
            type="button"
            on:click={() => {
              if (Number(calculatorInput.交易股數) >= CalculatorConstant.交易股數.最大) {
                return;
              }
              calculatorInput.交易股數 = float.create(calculatorInput.交易股數).add(getShareStep(calculatorInput.交易股數)).getValue();
            }}
          >
            <AppIcon fontSize={20} icon="add" />
          </button>
          <span class="input-group-text rounded-end px-2" id="交易股數單位">股</span>
          <span class="invalid-feedback">
            {`請輸入 ${CalculatorConstant.交易股數.最小.toLocaleString()} 至 ${CalculatorConstant.交易股數.最大.toLocaleString()} 之間的數字`}
          </span>
        </div>
      </div>
    </div>
  </div>
</AppCard>
