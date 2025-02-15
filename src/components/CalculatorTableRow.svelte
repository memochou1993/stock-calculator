<script lang="ts">
import { CalculatorConstant, CalculatorOutput } from '$lib/calculator';

export let calculatorOutput: CalculatorOutput;
export let highlighted: boolean;
export let displayLevel: number;
export let fractionDigitCount: number;
export let fontSize: number;
</script>

<tr class={highlighted ? 'highlighted' : ''} style="font-size: {fontSize}rem">
  <td>
    {CalculatorOutput.toLocaleString(calculatorOutput.賣出價格, Math.max(fractionDigitCount, 2))}
  </td>
  <td hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 2}>
    {CalculatorOutput.toLocaleString(calculatorOutput.股票成本, fractionDigitCount)}
  </td>
  <td hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 2}>
    {CalculatorOutput.toLocaleString(calculatorOutput.股票市值, fractionDigitCount)}
  </td>
  <td hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>
    <span class={calculatorOutput.原始買入手續費 < calculatorOutput.買入手續費 ? 'text-negative' : ''}>
      {CalculatorOutput.toLocaleString(calculatorOutput.買入手續費, fractionDigitCount)}
    </span>
    {#if calculatorOutput.原始買入手續費 < calculatorOutput.買入手續費}
      <span class="text-secondary" data-bs-custom-class="tooltip-variant" data-bs-placement="bottom" data-bs-toggle="tooltip" title="原始買入手續費">
        ({CalculatorOutput.toLocaleString(calculatorOutput.原始買入手續費, fractionDigitCount)})
      </span>
    {/if}
  </td>
  <td hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>
    <span class={calculatorOutput.原始賣出手續費 < calculatorOutput.賣出手續費 ? 'text-negative' : ''}>
      {CalculatorOutput.toLocaleString(calculatorOutput.賣出手續費, fractionDigitCount)}
    </span>
    {#if calculatorOutput.原始賣出手續費 < calculatorOutput.賣出手續費}
      <span class="text-secondary" data-bs-custom-class="tooltip-variant" data-bs-placement="bottom" data-bs-toggle="tooltip" title="原始賣出手續費">
        ({CalculatorOutput.toLocaleString(calculatorOutput.原始賣出手續費, fractionDigitCount)})
      </span>
    {/if}
  </td>
  <td hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>
    {CalculatorOutput.toLocaleString(calculatorOutput.證券交易稅, fractionDigitCount)}
  </td>
  <td hidden={displayLevel < CalculatorConstant.顯示等級.最小 + 1}>
    {CalculatorOutput.toLocaleString(calculatorOutput.投資成本, fractionDigitCount)}
  </td>
  <td class={calculatorOutput.損益金額 >= 0 ? 'text-positive' : 'text-negative'}>
    {CalculatorOutput.toLocaleString(calculatorOutput.損益金額, fractionDigitCount)}
  </td>
  <td class={calculatorOutput.報酬率 >= 0 ? 'text-positive' : 'text-negative'}>
    {CalculatorOutput.toLocaleString(calculatorOutput.報酬率 * 100, Math.max(fractionDigitCount, 1))}%
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
.text-positive {
  color: blue;
}
.text-negative {
  color: red;
}
</style>
