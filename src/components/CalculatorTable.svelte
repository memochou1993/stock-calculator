<script lang="ts">
  import { CalculatorInput, calculate } from '$lib';
  import AppCard from './AppCard.svelte';
  import CalculatorTableRow from './CalculatorTableRow.svelte';

  export let data: CalculatorInput;
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
        <!-- FIXME: calculate step -->
        {#each Array.from({ length: 11 }, (_, i) => i - 5) as offset}
          <CalculatorTableRow
            data={calculate(
              new CalculatorInput({
                ...data,
                賣出價格: Number(data.賣出價格) + offset,
              }),
            )}
            highlighted={offset === 0}
          />
        {/each}
      </tbody>
    </table>
  </div>
</AppCard>
