<script lang="ts">
  import { page } from '$app/stores';
  import { CalculatorConstant, CalculatorInput, calculate, calculateStep } from '$lib';
  import { onMount } from 'svelte';
  import AppCard from './AppCard.svelte';
  import AppCardTitle from './AppCardTitle.svelte';
  import AppShareButton from './AppShareButton.svelte';
  import CalculatorDownloadButton from './CalculatorDownloadButton.svelte';
  import CalculatorMenu from './CalculatorMenu.svelte';
  import CalculatorTableRow from './CalculatorTableRow.svelte';

  export let calculatorInput: CalculatorInput;

  let outputCount = CalculatorConstant.試算結果.預設;
  let sort = CalculatorConstant.排序.由小到大;
  let displayLevel = CalculatorConstant.顯示等級.預設;
  let fractionDigitCount = CalculatorConstant.小數位數.預設;
  let fontSize = CalculatorConstant.字體大小.預設;

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

  const generatePrices = (type: string, price: number, outputCount: number): number[] => {
    const prices = [];
    for (let i = 0; i < Math.abs(outputCount); i++) {
      const step = calculateStep(type, price);
      price += step * (outputCount > 0 ? 1 : -1);
      prices.push(price);
    }
    return prices;
  };

  $: prices = [
    ...generatePrices(calculatorInput.交易類別, Number(calculatorInput.賣出價格), -outputCount).reverse(),
    Number(calculatorInput.賣出價格),
    ...generatePrices(calculatorInput.交易類別, Number(calculatorInput.賣出價格), outputCount),
  ].filter((price) => price >= 0);

  $: sortedPrices = sort === CalculatorConstant.排序.由小到大 ? prices : [...prices].reverse();

  $: calculatorOutputs = sortedPrices.map((price) => calculate(new CalculatorInput({ ...calculatorInput, 賣出價格: price })));

  $: params = (() => {
    const params = new URLSearchParams(
      Object.entries(calculatorInput)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => [key, String(value)]),
    );
    return decodeURIComponent(params.toString());
  })();
</script>

<AppCard>
  <div slot="title" class="d-flex align-items-center justify-content-between">
    <AppCardTitle title="試算結果" />
    <div class="d-flex">
      <CalculatorDownloadButton {calculatorOutputs} />
      <AppShareButton url={`${$page.url.origin}?${params}`} />
      <CalculatorMenu
        {sort}
        onSortChange={(v) => {
          sort = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.排序, String(v));
        }}
        {outputCount}
        onOutputCountChange={(v) => {
          outputCount = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.試算結果數量, String(v));
        }}
        {displayLevel}
        onDisplayLevelChange={(v) => {
          displayLevel = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.顯示等級, String(v));
        }}
        {fractionDigitCount}
        onFractionDigitCountChange={(v) => {
          fractionDigitCount = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.小數位數, String(v));
        }}
        {fontSize}
        onFontSizeChange={(v) => {
          fontSize = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.字體大小, String(v));
        }}
      />
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-light align-middle text-center mb-0">
      <thead class="table-dark">
        <tr>
          <th>賣出價格</th>
          <th hidden={displayLevel <= CalculatorConstant.顯示等級.預設}>股票成本</th>
          <th hidden={displayLevel <= CalculatorConstant.顯示等級.預設}>股票市值</th>
          <th hidden={displayLevel <= CalculatorConstant.顯示等級.最小}>買入手續費</th>
          <th hidden={displayLevel <= CalculatorConstant.顯示等級.最小}>賣出手續費</th>
          <th hidden={displayLevel <= CalculatorConstant.顯示等級.最小}>證券交易稅</th>
          <th hidden={displayLevel <= CalculatorConstant.顯示等級.最小}>投資成本</th>
          <th>損益金額</th>
          <th>報酬率</th>
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
