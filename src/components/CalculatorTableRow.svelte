<script lang="ts">
  import { CalculatorOutput } from '$lib';

  export let data: CalculatorOutput;

  export let highlighted;
</script>

<tr class={highlighted && 'highlighted fw-medium'}>
  <td>
    {CalculatorOutput.toLocaleString(data.成交價格, 2)}
  </td>
  <td>
    {CalculatorOutput.toLocaleString(data.支付總金額, 1)}
  </td>
  <td>
    {CalculatorOutput.toLocaleString(data.實收總金額, 1)}
  </td>
  <td>
    {CalculatorOutput.toLocaleString(data.買入手續費, 1)}
  </td>
  <td>
    {CalculatorOutput.toLocaleString(data.賣出手續費, 1)}
  </td>
  <td>
    {CalculatorOutput.toLocaleString(data.證券交易稅, 1)}
  </td>
  <td class={data.損益金額 > 0 ? 'positive' : 'negative'}>
    {CalculatorOutput.toLocaleString(data.損益金額, 1)}
  </td>
  <td class={data.報酬率 > 0 ? 'positive' : 'negative'}>
    {CalculatorOutput.toLocaleString(data.報酬率 * 100, 2)}%
  </td>
</tr>

<style lang="scss">
  .highlighted {
    td {
      --bs-bg-opacity: 1;
      background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;
      background-image: var(--bs-gradient) !important;
    }
  }
  .positive {
    color: blue;
  }
  .negative {
    color: red;
  }
</style>
