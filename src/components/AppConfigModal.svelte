<script lang="ts">
import { CalculatorConstant, CalculatorInput } from '$lib/calculator';
import { GTM } from '$lib/gtm';
import { float } from '$lib/utils';
import { validator } from '$lib/validator';
import { afterUpdate, onMount } from 'svelte';
import AppIcon from './AppIcon.svelte';

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

<div class="d-flex gap-1">
  <button
    class="btn btn-variant"
    data-bs-target="#modal-config"
    data-bs-toggle="modal"
    on:click={() => {
      GTM.pushEvent('open_config_modal');
    }}
    type="button"
  >
    <AppIcon icon="tune" />
  </button>
</div>

<div class="modal fade" id="modal-config" tabindex="-1" aria-labelledby="modal-config-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-body-secondary">
      <div class="modal-header">
        <h1 class="modal-title text-variant fs-5" id="modal-config-label">設定</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close Config Modal"></button>
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
                  class="input-group-text btn-variant btn-outline"
                  on:click={() => {
                    if (Number(calculatorInput.手續費折扣) <= CalculatorConstant.手續費折扣.最小) {
                      return;
                    }
                    calculatorInput.手續費折扣 = float.create(calculatorInput.手續費折扣).subtract(CalculatorConstant.手續費折扣.間距).getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="remove" />
                </button>
                <input
                  aria-describedby="手續費折扣單位"
                  aria-label="手續費折扣"
                  autocomplete="off"
                  bind:value={calculatorInput.手續費折扣}
                  class="form-control form-control-md {!validator
                    .create(calculatorInput.手續費折扣)
                    .isBetween(CalculatorConstant.手續費折扣.最小, CalculatorConstant.手續費折扣.最大) && 'is-invalid'}"
                  id="手續費折扣"
                  inputmode="decimal"
                  max={CalculatorConstant.手續費折扣.最大}
                  min={CalculatorConstant.手續費折扣.最小}
                  on:blur={() => {
                    const 手續費折扣 = calculatorInput.手續費折扣;
                    if (!手續費折扣 || 手續費折扣 < CalculatorConstant.手續費折扣.最小 || 手續費折扣 > CalculatorConstant.手續費折扣.最大) {
                      calculatorInput.手續費折扣 = CalculatorConstant.手續費折扣.最大;
                    }
                    localStorage.setItem(CalculatorConstant.儲存鍵.手續費折扣, String(calculatorInput.手續費折扣));
                    GTM.pushEvent('change_commission_rate', { value: Number(calculatorInput.手續費折扣) / 10 });
                  }}
                  step={CalculatorConstant.手續費折扣.間距}
                  type="number"
                />
                <button
                  type="button"
                  class="input-group-text btn-variant btn-outline"
                  on:click={() => {
                    if (Number(calculatorInput.手續費折扣) >= CalculatorConstant.手續費折扣.最大) {
                      return;
                    }
                    calculatorInput.手續費折扣 = float.create(calculatorInput.手續費折扣).add(CalculatorConstant.手續費折扣.間距).getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="add" />
                </button>
                <span class="input-group-text rounded-end px-2" id="手續費折扣單位">折</span>
                <span class="invalid-feedback">
                  {`請輸入 ${CalculatorConstant.手續費折扣.最小.toLocaleString()} 至 ${CalculatorConstant.手續費折扣.最大.toLocaleString()} 之間的數字`}
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
                  class="input-group-text btn-variant btn-outline"
                  on:click={() => {
                    if (Number(calculatorInput.最低手續費) <= CalculatorConstant.最低手續費.最小) {
                      return;
                    }
                    calculatorInput.最低手續費 = float.create(calculatorInput.最低手續費).subtract(CalculatorConstant.最低手續費.間距).getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="remove" />
                </button>
                <input
                  aria-describedby="最低手續費單位"
                  aria-label="最低手續費"
                  autocomplete="off"
                  bind:value={calculatorInput.最低手續費}
                  class="form-control form-control-md {!validator
                    .create(calculatorInput.最低手續費)
                    .isBetween(CalculatorConstant.最低手續費.最小, CalculatorConstant.最低手續費.最大) && 'is-invalid'}"
                  id="最低手續費"
                  inputmode="numeric"
                  max={CalculatorConstant.最低手續費.最大}
                  min={CalculatorConstant.最低手續費.最小}
                  on:blur={() => {
                    const 最低手續費 = calculatorInput.最低手續費;
                    if (!最低手續費 || 最低手續費 < CalculatorConstant.最低手續費.最小 || 最低手續費 > CalculatorConstant.最低手續費.最大) {
                      calculatorInput.最低手續費 = CalculatorConstant.最低手續費.最大;
                    }
                    localStorage.setItem(CalculatorConstant.儲存鍵.最低手續費, String(calculatorInput.最低手續費));
                    GTM.pushEvent('change_minimum_commission', { value: calculatorInput.最低手續費 });
                  }}
                  step={CalculatorConstant.最低手續費.間距}
                  type="number"
                />
                <button
                  type="button"
                  class="input-group-text btn-variant btn-outline"
                  on:click={() => {
                    if (Number(calculatorInput.最低手續費) >= CalculatorConstant.最低手續費.最大) {
                      return;
                    }
                    calculatorInput.最低手續費 = float.create(calculatorInput.最低手續費).add(CalculatorConstant.最低手續費.間距).getValue();
                  }}
                >
                  <AppIcon fontSize={20} icon="add" />
                </button>
                <span class="input-group-text rounded-end px-2" id="最低手續費單位">元</span>
                <span class="invalid-feedback">
                  {`請輸入 ${CalculatorConstant.最低手續費.最小.toLocaleString()} 至 ${CalculatorConstant.最低手續費.最大.toLocaleString()} 之間的數字`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
