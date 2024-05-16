<script lang="ts">
  import { CalculatorOutput } from '$lib';

  export let data: CalculatorOutput;
</script>

<tr>
  <td>{CalculatorOutput.toLocaleString(data.成交價格, 2)}</td>
  <td>{CalculatorOutput.toLocaleString(data.支付總金額, 1)}</td>
  <td>{CalculatorOutput.toLocaleString(data.實收總金額, 1)}</td>
  <td>{CalculatorOutput.toLocaleString(data.買入手續費, 1)}</td>
  <td>{CalculatorOutput.toLocaleString(data.賣出手續費, 1)}</td>
  <td>{CalculatorOutput.toLocaleString(data.證券交易稅, 1)}</td>
  <td>{CalculatorOutput.toLocaleString(data.損益金額, 1)}</td>
  <td>{CalculatorOutput.toLocaleString(data.報酬率 * 100, 2)}%</td>
</tr>
