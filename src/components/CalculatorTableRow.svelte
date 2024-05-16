<script lang="ts">
  import { Calculator } from '$lib';

  export let calculator: Calculator;
</script>

<tr>
  <td>{Number(calculator.成交價格.toFixed(2)).toLocaleString()}</td>
  <td>{Number(calculator.支付總金額.toFixed(1)).toLocaleString()}</td>
  <td>{Number(calculator.實收總金額.toFixed(1)).toLocaleString()}</td>
  <td>{Number(calculator.買入手續費.toFixed(1)).toLocaleString()}</td>
  <td>{Number(calculator.賣出手續費.toFixed(1)).toLocaleString()}</td>
  <td>{Number(calculator.證券交易稅.toFixed(1)).toLocaleString()}</td>
  <td>{Number(calculator.損益金額.toFixed(1)).toLocaleString()}</td>
  <td>{Number((calculator.報酬率 * 100).toFixed(2)).toLocaleString()}%</td>
</tr>
