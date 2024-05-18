<script lang="ts">
  import { CalculatorConstant, CalculatorOutput } from '$lib';

  export let calculatorOutput: CalculatorOutput;
  export let highlighted: boolean;
  export let displayLevel: number;
</script>

<tr class={highlighted ? 'highlighted' : ''}>
  <td>
    {CalculatorOutput.toLocaleString(calculatorOutput.賣出價格, 2)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.中}>
    {CalculatorOutput.toLocaleString(calculatorOutput.股票成本, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.中}>
    {CalculatorOutput.toLocaleString(calculatorOutput.股票市值, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.買入手續費, 1)}
    {#if calculatorOutput.原始買入手續費 && calculatorOutput.原始買入手續費 < calculatorOutput.買入手續費}
      <span class="text-secondary">
        ({CalculatorOutput.toLocaleString(calculatorOutput.原始買入手續費, 2)})
      </span>
    {/if}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.賣出手續費, 1)}
    {#if calculatorOutput.原始賣出手續費 && calculatorOutput.原始賣出手續費 < calculatorOutput.賣出手續費}
      <span class="text-secondary">
        ({CalculatorOutput.toLocaleString(calculatorOutput.原始賣出手續費, 2)})
      </span>
    {/if}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.證券交易稅, 1)}
  </td>
  <td hidden={displayLevel <= CalculatorConstant.顯示等級.少}>
    {CalculatorOutput.toLocaleString(calculatorOutput.投資成本, 1)}
  </td>
  <td class={calculatorOutput.損益金額 >= 0 ? 'positive' : 'negative'}>
    {CalculatorOutput.toLocaleString(calculatorOutput.損益金額, 1)}
  </td>
  <td class={calculatorOutput.報酬率 >= 0 ? 'positive' : 'negative'}>
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
