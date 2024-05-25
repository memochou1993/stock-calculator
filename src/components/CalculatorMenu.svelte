<script lang="ts">
  import { CalculatorConstant, GTM } from '$lib';
  import AppIcon from './AppIcon.svelte';

  export let sort: string;
  export let onSortChange = (_v: string) => {};

  export let outputCount: number;
  export let onOutputCountChange = (_v: number) => {};

  export let displayLevel: number;
  export let onDisplayLevelChange = (_v: number) => {};

  export let fractionDigitCount: number;
  export let onFractionDigitCountChange = (_v: number) => {};

  export let fontSize: number;
  export let onFontSizeChange = (_v: number) => {};
</script>

<div class="dropdown">
  <button
    type="button"
    aria-expanded="false"
    class="btn btn-variant px-2"
    data-bs-auto-close="outside"
    data-bs-offset="4,4"
    data-bs-toggle="dropdown"
    on:click={() => {
      GTM.pushEvent('toggleCalculatorMenu');
    }}
  >
    <AppIcon icon="more_vert" />
  </button>
  <ul class="dropdown-menu">
    <button
      class="btn dropdown-item"
      disabled={sort === CalculatorConstant.排序.由小到大}
      on:click={() => onSortChange(CalculatorConstant.排序.由小到大)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="arrow_downward_alt" />
        <span class="px-2">價格由低至高</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={sort === CalculatorConstant.排序.由大到小}
      on:click={() => onSortChange(CalculatorConstant.排序.由大到小)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="arrow_upward_alt" />
        <span class="px-2">價格由高至低</span>
      </div>
    </button>
    <hr class="dropdown-divider" />
    <button
      class="btn dropdown-item"
      disabled={outputCount <= CalculatorConstant.試算結果.最小}
      on:click={() => onOutputCountChange(outputCount - 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="unfold_less" />
        <span class="px-2">減少試算結果</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={outputCount >= CalculatorConstant.試算結果.最大}
      on:click={() => onOutputCountChange(outputCount + 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="unfold_more" />
        <span class="px-2">增加試算結果</span>
      </div>
    </button>
    <hr class="dropdown-divider" />
    <button
      class="btn dropdown-item"
      disabled={displayLevel <= CalculatorConstant.顯示等級.最小}
      on:click={() => onDisplayLevelChange(displayLevel - 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="zoom_out" />
        <span class="px-2">減少顯示欄位</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={displayLevel >= CalculatorConstant.顯示等級.最大}
      on:click={() => onDisplayLevelChange(displayLevel + 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="zoom_in" />
        <span class="px-2">增加顯示欄位</span>
      </div>
    </button>
    <hr class="dropdown-divider" />
    <button
      class="btn dropdown-item"
      disabled={fractionDigitCount <= CalculatorConstant.小數位數.最小}
      on:click={() => onFractionDigitCountChange(fractionDigitCount - 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="decimal_decrease" />
        <span class="px-2">減少小數位數</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={fractionDigitCount >= CalculatorConstant.小數位數.最大}
      on:click={() => onFractionDigitCountChange(fractionDigitCount + 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <AppIcon icon="decimal_increase" />
        <span class="px-2">增加小數位數</span>
      </div>
    </button>
    <hr class="dropdown-divider" />
    <button class="btn dropdown-item" disabled={fontSize <= CalculatorConstant.字體大小.最小} on:click={() => onFontSizeChange(fontSize - 0.125)} type="button">
      <div class="d-flex align-items-center">
        <AppIcon icon="text_decrease" />
        <span class="px-2">減少字體大小</span>
      </div>
    </button>
    <button class="btn dropdown-item" disabled={fontSize >= CalculatorConstant.字體大小.最大} on:click={() => onFontSizeChange(fontSize + 0.125)} type="button">
      <div class="d-flex align-items-center">
        <AppIcon icon="text_increase" />
        <span class="px-2">增加字體大小</span>
      </div>
    </button>
  </ul>
</div>
