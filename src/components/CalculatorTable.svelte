<script lang="ts">
import { page } from '$app/stores';
import { calculator, CalculatorConstant, CalculatorInput } from '$lib/calculator';
import { getNextPrices, getPrevPrices } from '$lib/calculator/utils';
import { GTM } from '$lib/gtm';
import { onMount } from 'svelte';
import AppCard from './AppCard.svelte';
import AppCardTitle from './AppCardTitle.svelte';
import CalculatorDownloadButton from './CalculatorDownloadButton.svelte';
import CalculatorMenu from './CalculatorMenu.svelte';
import CalculatorShareModal from './CalculatorShareModal.svelte';
import CalculatorTableRow from './CalculatorTableRow.svelte';

export let calculatorInput: CalculatorInput;

let outputCount = CalculatorConstant.試算結果.預設;
let sort = CalculatorConstant.排序.由小到大;
let displayLevel = CalculatorConstant.顯示等級.預設;
let fractionDigitCount = CalculatorConstant.小數位數.預設;
let fontSize = CalculatorConstant.字體大小.預設;

$: prices = [
  ...getPrevPrices(calculatorInput.交易類別, Number(calculatorInput.賣出價格), outputCount).reverse(),
  Number(calculatorInput.賣出價格),
  ...getNextPrices(calculatorInput.交易類別, Number(calculatorInput.賣出價格), outputCount),
].filter((price) => price >= 0);

$: sortedPrices = sort === CalculatorConstant.排序.由小到大 ? prices : [...prices].reverse();

$: calculatorOutputs = sortedPrices.map((price) => calculator.create(new CalculatorInput({ ...calculatorInput, 賣出價格: price })).output);

$: params = (() => {
  const params = new URLSearchParams(
    Object.entries(calculatorInput)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => [key, String(value)]),
  );
  return decodeURIComponent(params.toString());
})();

onMount(() => {
  recover();
});

const recover = () => {
  const 試算結果數量 = localStorage.getItem(CalculatorConstant.儲存鍵.試算結果數量);
  if (試算結果數量) {
    outputCount = Number(試算結果數量);
  }
  const 排序 = localStorage.getItem(CalculatorConstant.儲存鍵.排序);
  if (排序) {
    sort = 排序;
  }
  const 顯示等級 = localStorage.getItem(CalculatorConstant.儲存鍵.顯示等級);
  if (顯示等級) {
    displayLevel = Number(顯示等級);
  }
  const 小數位數 = localStorage.getItem(CalculatorConstant.儲存鍵.小數位數);
  if (小數位數) {
    fractionDigitCount = Number(小數位數);
  }
  const 字體大小 = localStorage.getItem(CalculatorConstant.儲存鍵.字體大小);
  if (字體大小) {
    fontSize = Number(字體大小);
  }
};
</script>

<AppCard>
  <div slot="title" class="d-flex align-items-center justify-content-between">
    <AppCardTitle title="試算結果" />
    <div class="d-flex gap-1">
      <CalculatorDownloadButton {calculatorOutputs} />
      <CalculatorShareModal url={`${$page.url.origin}?${params}`} />
      <CalculatorMenu
        {sort}
        onSortChange={(v) => {
          sort = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.排序, String(v));
          GTM.pushEvent('change_sort', { value: v });
        }}
        {outputCount}
        onOutputCountChange={(v) => {
          outputCount = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.試算結果數量, String(v));
          GTM.pushEvent('change_output_count', { value: v });
        }}
        {displayLevel}
        onDisplayLevelChange={(v) => {
          displayLevel = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.顯示等級, String(v));
          GTM.pushEvent('change_display_level', { value: v });
        }}
        {fractionDigitCount}
        onFractionDigitCountChange={(v) => {
          fractionDigitCount = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.小數位數, String(v));
          GTM.pushEvent('change_fraction_digit_count', { value: v });
        }}
        {fontSize}
        onFontSizeChange={(v) => {
          fontSize = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.字體大小, String(v));
          GTM.pushEvent('change_font_size', { value: v });
        }}
      />
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-light align-middle text-center mb-0">
      <thead class="table-dark">
        <tr style="font-size: {fontSize}rem !important">
          <th>賣出價格</th>
          <th>損益金額</th>
          <th>報酬率</th>
          <th hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>買入手續費</th>
          <th hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>賣出手續費</th>
          <th hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>證券交易稅</th>
          <th hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>投資成本</th>
          <th hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 2}>股票成本</th>
          <th hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 2}>股票市值</th>
        </tr>
      </thead>
      <tbody>
        {#each calculatorOutputs as calculatorOutput}
          <CalculatorTableRow
            {calculatorOutput}
            highlighted={Number(calculatorInput.賣出價格).toFixed(2) === calculatorOutput.賣出價格.toFixed(2)}
            {displayLevel}
            {fractionDigitCount}
            {fontSize}
          />
        {/each}
      </tbody>
    </table>
  </div>
</AppCard>

<style lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

@include media-breakpoint-down(lg) {
  th {
    padding: 4px 2px !important;
  }
}
</style>
