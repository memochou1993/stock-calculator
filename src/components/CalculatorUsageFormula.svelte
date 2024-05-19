<script>
  import AppCard from './AppCard.svelte';
</script>

<AppCard title="欄位說明">
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-light align-middle text-center mb-0">
      <thead class="table-dark">
        <tr>
          <th style="width:25%;">欄位</th>
          <th>計算公式</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>股票成本</td>
          <td>買入價格 × 交易股數 </td>
        </tr>
        <tr>
          <td>股票市值</td>
          <td>賣出價格 × 交易股數</td>
        </tr>
        <tr>
          <td>買入手續費</td>
          <td>max(股票成本 × 公定手續費費率 (1.425‰) × 手續費折扣, 最低手續費)</td>
        </tr>
        <tr>
          <td>賣出手續費</td>
          <td>max(股票市值 × 公定手續費費率 (1.425‰) × 手續費折扣, 最低手續費)</td>
        </tr>
        <tr>
          <td>證券交易稅</td>
          <td>股票市值 × 證券交易稅稅率</td>
        </tr>
        <tr>
          <td>投資成本</td>
          <td>股票成本 + 買入手續費 + 賣出手續費 + 證券交易稅</td>
        </tr>
        <tr>
          <td>損益金額</td>
          <td>股票市值 - 投資成本</td>
        </tr>
        <tr>
          <td>報酬率</td>
          <td>損益金額 ÷ 投資成本</td>
        </tr>
      </tbody>
    </table>
  </div>
</AppCard>
