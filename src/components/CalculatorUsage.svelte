<script>
  import { 證券交易稅稅率 } from '../constants';
  import AppCard from './AppCard.svelte';
</script>

<AppCard title="證券交易稅">
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th style="width:30%;">交易類別</th>
          <th>稅率</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>股票</td>
          <td>{證券交易稅稅率.股票 * 1000}‰</td>
        </tr>
        <tr>
          <td>股票當日沖銷</td>
          <td>{證券交易稅稅率.股票當日沖銷 * 1000}‰</td>
        </tr>
        <tr>
          <td>指數股票型基金（ETF）</td>
          <td>{證券交易稅稅率.指數股票型基金 * 1000}‰</td>
        </tr>
      </tbody>
    </table>
  </div>
</AppCard>
