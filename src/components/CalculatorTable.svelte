<script lang="ts">
  import { CalculatorConstant, CalculatorInput, calculate, calculateStep } from '$lib';
  import { onMount } from 'svelte';
  import AppCard from './AppCard.svelte';
  import CalculatorMenu from './CalculatorMenu.svelte';
  import CalculatorTableRow from './CalculatorTableRow.svelte';

  export let calculatorInput: CalculatorInput;

  let outputCount = CalculatorConstant.試算結果.預設數量;
  let sort = CalculatorConstant.排序.由小到大;

  onMount(() => {
    const 試算結果數量 = localStorage.getItem(CalculatorConstant.儲存鍵.試算結果數量);
    if (試算結果數量) {
      outputCount = Number(試算結果數量);
    }
    const 排序 = localStorage.getItem(CalculatorConstant.儲存鍵.排序);
    if (排序) {
      sort = 排序;
    }
  });

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
  ];
  $: sortedPrices = sort === CalculatorConstant.排序.由小到大 ? prices : [...prices].reverse();
</script>

<AppCard>
  <div slot="title">
    <div class="d-flex align-items-center justify-content-between">
      <p class="fs-4 fw-medium mb-0">試算結果</p>
      <CalculatorMenu
        {outputCount}
        onOutputCountChange={(v) => {
          outputCount = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.試算結果數量, String(outputCount));
        }}
        {sort}
        onSortChange={(v) => {
          sort = v;
          localStorage.setItem(CalculatorConstant.儲存鍵.排序, String(sort));
        }}
      />
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-light align-middle text-center mb-0">
      <thead class="table-dark">
        <tr>
          <th>成交價格</th>
          <th>支付總金額</th>
          <th>實收總金額</th>
          <th>買入手續費</th>
          <th>賣出手續費</th>
          <th>證券交易稅</th>
          <th>損益金額</th>
          <th>報酬率</th>
        </tr>
      </thead>
      <tbody>
        {#each sortedPrices as price}
          <CalculatorTableRow
            calculatorOutput={calculate(
              new CalculatorInput({
                ...calculatorInput,
                賣出價格: price,
              }),
            )}
            highlighted={Number(calculatorInput.賣出價格).toFixed(2) === price.toFixed(2)}
          />
        {/each}
      </tbody>
    </table>
  </div>
</AppCard>
