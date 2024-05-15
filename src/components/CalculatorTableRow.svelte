<script lang="ts">
  import { 手續費費率, 證券交易稅稅率 } from '../constants';

  export let 交易類別: string;
  export let 買入價格: number;
  export let 賣出價格: number;
  export let 交易股數: number;
  export let 手續費折扣: number;
  export let 最低手續費: number;

  const 計算證券交易稅稅率 = (交易類別: string) => {
    if (交易類別 === '股票當日沖銷') {
      return 證券交易稅稅率.股票當日沖銷;
    }
    if (交易類別 === 'ETF') {
      return 證券交易稅稅率.指數股票型基金;
    }
    return 證券交易稅稅率.股票;
  };

  $: 成本 = 買入價格 * 交易股數;
  $: 市值 = 賣出價格 * 交易股數;
  $: 支付總金額 = 成本 + 買入手續費;
  $: 實收總金額 = 市值 - 賣出手續費 - 證券交易稅;
  $: 買入手續費 = Math.max(最低手續費, 成本 * 手續費費率.證券經紀商 * 手續費折扣);
  $: 賣出手續費 = Math.max(最低手續費, 市值 * 手續費費率.證券經紀商 * 手續費折扣);
  $: 證券交易稅 = 市值 * 計算證券交易稅稅率(交易類別);
  $: 損益金額 = 實收總金額 - 支付總金額;
  $: 報酬率 = 損益金額 / 成本;
</script>

<tr>
  <td>{Number(賣出價格.toFixed(1)).toLocaleString()}</td>
  <td>{Number(支付總金額.toFixed(1)).toLocaleString()}</td>
  <td>{Number(實收總金額.toFixed(1)).toLocaleString()}</td>
  <td>{Number(買入手續費.toFixed(1)).toLocaleString()}</td>
  <td>{Number(賣出手續費.toFixed(1)).toLocaleString()}</td>
  <td>{Number(證券交易稅.toFixed(1)).toLocaleString()}</td>
  <td>{Number(損益金額.toFixed(1)).toLocaleString()}</td>
  <td>{Number((報酬率 * 100).toFixed(2)).toLocaleString()}%</td>
</tr>
