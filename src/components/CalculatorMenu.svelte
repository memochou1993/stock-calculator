<script lang="ts">
  import { CalculatorConstant } from '$lib';

  export let outputCount: number;
  export let onOutputCountChange = (v: number) => {};

  export let sort: string;
  export let onSortChange = (v: string) => {};

  export let displayLevel: number;
  export let onDisplayLevelChange = (v: number) => {};
</script>

<div class="dropdown">
  <button type="button" class="btn btn-variant" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
    <div class="d-flex align-items-center">
      <span class="material-symbols-outlined">tune</span>
    </div>
  </button>
  <ul class="dropdown-menu">
    <button
      class="btn dropdown-item"
      disabled={outputCount >= CalculatorConstant.試算結果.最大數量}
      on:click={() => onOutputCountChange(outputCount + 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">unfold_more</span>
        <span class="px-2">增加試算結果</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={outputCount <= CalculatorConstant.試算結果.最小數量}
      on:click={() => onOutputCountChange(outputCount - 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">unfold_less</span>
        <span class="px-2">減少試算結果</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={sort === CalculatorConstant.排序.由小到大}
      on:click={() => onSortChange(CalculatorConstant.排序.由小到大)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">arrow_downward_alt</span>
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
        <span class="material-symbols-outlined">arrow_upward_alt</span>
        <span class="px-2">價格由高至低</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={displayLevel <= CalculatorConstant.顯示等級.少}
      on:click={() => onDisplayLevelChange(displayLevel - 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">zoom_out</span>
        <span class="px-2">顯示較少說明</span>
      </div>
    </button>
    <button
      class="btn dropdown-item"
      disabled={displayLevel >= CalculatorConstant.顯示等級.多}
      on:click={() => onDisplayLevelChange(displayLevel + 1)}
      type="button"
    >
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">zoom_in</span>
        <span class="px-2">顯示較多說明</span>
      </div>
    </button>
  </ul>
</div>
