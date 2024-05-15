<script lang="ts">
  import AppCard from './AppCard.svelte';
  import CalculatorTableRow from './CalculatorTableRow.svelte';

  export let 交易類別: string;
  export let 買入價格: number;
  export let 賣出價格: number;
  export let 交易股數: number;
  export let 手續費折扣: number;
  export let 最低手續費: number;
</script>

<AppCard title="試算結果">
  <div class="table-responsive">
    <table class="table table-bordered table-striped text-center mb-0">
      <thead>
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
        {#each Array.from({ length: 11 }, (_, i) => i - 5) as offset}
          <CalculatorTableRow {交易類別} {買入價格} 賣出價格={賣出價格 + offset} {交易股數} {手續費折扣} {最低手續費} />
        {/each}
      </tbody>
    </table>
  </div>
</AppCard>
