<script lang="ts">
  import { CalculatorInput, calculate, calculateStep } from '$lib';
  import AppCard from './AppCard.svelte';
  import CalculatorMenu from './CalculatorMenu.svelte';
  import CalculatorTableRow from './CalculatorTableRow.svelte';

  export let calculatorInput: CalculatorInput;

  let outputCount = 5;

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
</script>

<AppCard>
  <div slot="title">
    <div class="d-flex align-items-center justify-content-between">
      <p class="fs-4 fw-medium mb-0">試算結果</p>
      <CalculatorMenu {outputCount} onOutputCountIncrease={() => (outputCount += 1)} onOutputCountDecrease={() => (outputCount -= 1)} />
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
        {#each prices as price}
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
