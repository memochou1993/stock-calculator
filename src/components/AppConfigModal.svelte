<script lang="ts">
import { CalculatorConstant, CalculatorInput } from '$lib/calculator';
import { GTM } from '$lib/gtm';
import { Validator } from '$lib/validator';
import { afterUpdate, onMount } from 'svelte';
import AppIcon from './AppIcon.svelte';
import { Float } from '$lib/utils';

export let calculatorInput: CalculatorInput;
export let onUpdate: (calculatorInput: CalculatorInput) => void;

onMount(() => {
  const modal = document.getElementById('modal-config') as HTMLDivElement;
  modal.addEventListener('shown.bs.modal', () => {
    const [input] = document.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
    input.focus();
  });
});

afterUpdate(() => {
  if (document.getElementsByClassName('is-invalid').length > 0) {
    return;
  }
  onUpdate(calculatorInput);
});
</script>

<button
  class="btn btn-variant px-2"
  data-bs-target="#modal-config"
  data-bs-toggle="modal"
  on:click={() => {
    GTM.pushEvent('open_config_modal');
  }}
  type="button"
>
  <AppIcon icon="tune" />
</button>

<div class="modal fade" id="modal-config" tabindex="-1" aria-labelledby="modal-config-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-body-secondary">
      <div class="modal-header">
        <h1 class="modal-title text-variant fs-5" id="modal-config-label">設定</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12">
            <div class="form-group mb-2 mb-lg-4">
              <div class="d-flex align-items-center mb-1">
                <label for="手續費折扣">手續費折扣</label>
                <button
                  class="btn btn-variant btn-rounded p-0"
                  data-bs-custom-class="tooltip-variant"
                  data-bs-placement="right"
                  data-bs-toggle="tooltip"
                  title="股票交易時，券商所提供的手續費折扣，例如「2.8」折。"
                  type="button"
                >
                  <AppIcon fontSize={20} icon="info" />
                </button>
              </div>
              <div class="input-group">
                <button
                  type="button"
                  class="input-group-text btn-variant btn-outline px-1"
                  on:click={() => {
                    if (Number(calculatorInput.手續費折扣) <= CalculatorConstant.交易參數.最小手續費折扣) {
                      return;
                    }
                    calculatorInput.手續費折扣 = Float(calculatorInput.手續費折扣 || 0)
                      .subtract(0.5)
                      .getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="remove" />
                </button>
                <input
                  aria-describedby="手續費折扣單位"
                  aria-label="手續費折扣"
                  autocomplete="off"
                  bind:value={calculatorInput.手續費折扣}
                  class="form-control form-control-md {!new Validator(calculatorInput.手續費折扣).isBetween(
                    CalculatorConstant.交易參數.最小手續費折扣,
                    CalculatorConstant.交易參數.最大手續費折扣,
                  ) && 'is-invalid'}"
                  id="手續費折扣"
                  inputmode="decimal"
                  max={CalculatorConstant.交易參數.最大手續費折扣}
                  min={CalculatorConstant.交易參數.最小手續費折扣}
                  on:blur={() => {
                    const 手續費折扣 = calculatorInput.手續費折扣;
                    if (!手續費折扣 || 手續費折扣 < CalculatorConstant.交易參數.最小手續費折扣 || 手續費折扣 > CalculatorConstant.交易參數.最大手續費折扣) {
                      calculatorInput.手續費折扣 = CalculatorConstant.交易參數.最大手續費折扣;
                    }
                    localStorage.setItem(CalculatorConstant.儲存鍵.手續費折扣, String(calculatorInput.手續費折扣));
                    GTM.pushEvent('change_commission_rate', { value: Number(calculatorInput.手續費折扣) / 10 });
                  }}
                  step="0.5"
                  type="number"
                />
                <button
                  type="button"
                  class="input-group-text btn-variant btn-outline px-1"
                  on:click={() => {
                    if (Number(calculatorInput.手續費折扣) >= CalculatorConstant.交易參數.最大手續費折扣) {
                      return;
                    }
                    calculatorInput.手續費折扣 = Float(calculatorInput.手續費折扣 || 0)
                      .add(0.5)
                      .getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="add" />
                </button>
                <span class="input-group-text rounded-end px-2" id="手續費折扣單位">折</span>
                <span class="invalid-feedback">
                  {`請輸入 ${CalculatorConstant.交易參數.最小手續費折扣.toLocaleString()} 至 ${CalculatorConstant.交易參數.最大手續費折扣.toLocaleString()} 之間的數字`}
                </span>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group mb-2 mb-lg-4">
              <div class="d-flex align-items-center mb-1">
                <label for="最低手續費">最低手續費</label>
                <button
                  class="btn btn-variant btn-rounded p-0"
                  data-bs-custom-class="tooltip-variant"
                  data-bs-placement="right"
                  data-bs-toggle="tooltip"
                  title="股票交易時，券商所收取的最低手續費，例如「1」元。"
                  type="button"
                >
                  <AppIcon fontSize={20} icon="info" />
                </button>
              </div>
              <div class="input-group">
                <button
                  type="button"
                  class="input-group-text btn-variant btn-outline px-1"
                  on:click={() => {
                    if (Number(calculatorInput.最低手續費) <= CalculatorConstant.交易參數.最小最低手續費) {
                      return;
                    }
                    calculatorInput.最低手續費 = Float(calculatorInput.最低手續費 || 0)
                      .subtract(1)
                      .getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="remove" />
                </button>
                <input
                  aria-describedby="最低手續費單位"
                  aria-label="最低手續費"
                  autocomplete="off"
                  bind:value={calculatorInput.最低手續費}
                  class="form-control form-control-md {!new Validator(calculatorInput.最低手續費).isBetween(
                    CalculatorConstant.交易參數.最小最低手續費,
                    CalculatorConstant.交易參數.最大最低手續費,
                  ) && 'is-invalid'}"
                  id="最低手續費"
                  inputmode="numeric"
                  max={CalculatorConstant.交易參數.最大最低手續費}
                  min={CalculatorConstant.交易參數.最小最低手續費}
                  on:blur={() => {
                    const 最低手續費 = calculatorInput.最低手續費;
                    if (!最低手續費 || 最低手續費 < CalculatorConstant.交易參數.最小最低手續費 || 最低手續費 > CalculatorConstant.交易參數.最大最低手續費) {
                      calculatorInput.最低手續費 = CalculatorConstant.交易參數.最大最低手續費;
                    }
                    localStorage.setItem(CalculatorConstant.儲存鍵.最低手續費, String(calculatorInput.最低手續費));
                    GTM.pushEvent('change_minimum_commission', { value: calculatorInput.最低手續費 });
                  }}
                  step="1"
                  type="number"
                />
                <button
                  type="button"
                  class="input-group-text btn-variant btn-outline px-1"
                  on:click={() => {
                    if (Number(calculatorInput.最低手續費) >= CalculatorConstant.交易參數.最大最低手續費) {
                      return;
                    }
                    calculatorInput.最低手續費 = Float(calculatorInput.最低手續費 || 0)
                      .add(1)
                      .getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="add" />
                </button>
                <span class="input-group-text rounded-end px-2" id="最低手續費單位">元</span>
                <span class="invalid-feedback">
                  {`請輸入 ${CalculatorConstant.交易參數.最小最低手續費.toLocaleString()} 至 ${CalculatorConstant.交易參數.最大最低手續費.toLocaleString()} 之間的數字`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
