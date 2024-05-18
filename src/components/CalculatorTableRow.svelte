<script lang="ts">
  import { CalculatorConstant, CalculatorOutput } from '$lib';

  export let calculatorOutput: CalculatorOutput;
  export let highlighted: boolean;
  export let displayLevel: number;
</script>

<tr class={highlighted ? 'highlighted' : ''}>
  <td>
    {CalculatorOutput.toLocaleString(calculatorOutput.成交價格, 2)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.中}>
    {CalculatorOutput.toLocaleString(calculatorOutput.成本, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.中}>
    {CalculatorOutput.toLocaleString(calculatorOutput.市值, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.支付總金額, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.實收總金額, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.買入手續費, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.賣出手續費, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.證券交易稅, 1)}
  </td>
  <td class={calculatorOutput.損益金額 > 0 ? 'positive' : 'negative'}>
    {CalculatorOutput.toLocaleString(calculatorOutput.損益金額, 1)}
  </td>
  <td class={calculatorOutput.報酬率 > 0 ? 'positive' : 'negative'}>
    {CalculatorOutput.toLocaleString(calculatorOutput.報酬率 * 100, 2)}%
  </td>
</tr>

<style lang="scss">
  .highlighted {
    td {
      --bs-bg-opacity: 1;
      --bs-table-bg-type: none;
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
