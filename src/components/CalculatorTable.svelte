<script lang="ts">
  import { CalculatorInput, calculate, calculateStep } from '$lib';
  import AppCard from './AppCard.svelte';
  import CalculatorTableRow from './CalculatorTableRow.svelte';

  export let data: CalculatorInput;

  const generatePrices = (type: string, price: number, length: number): number[] => {
    const prices = [];
    for (let i = 0; i < Math.abs(length); i++) {
      const step = calculateStep(type, price);
      price += step * (length > 0 ? 1 : -1);
      prices.push(price);
    }
    return prices;
  };

  $: prices = [
    ...generatePrices(data.交易類別, Number(data.賣出價格), -5).reverse(),
    Number(data.賣出價格),
    ...generatePrices(data.交易類別, Number(data.賣出價格), 5),
  ];
</script>

<AppCard title="試算結果">
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
            data={calculate(
              new CalculatorInput({
                ...data,
                賣出價格: price,
              }),
            )}
            highlighted={Number(data.賣出價格) === price}
          />
        {/each}
      </tbody>
    </table>
  </div>
</AppCard>
