<script lang="ts">
import { CalculatorConstant } from '$lib/calculator';
import AppCard from './AppCard.svelte';
</script>

<AppCard title="證券交易稅">
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-light align-middle text-center mb-0">
      <thead class="table-dark">
        <tr>
          <th style="width:50%;">交易類別</th>
          <th>稅率</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>股票</td>
          <td class="text-math">{CalculatorConstant.證券交易稅稅率.股票 * 1000}‰</td>
        </tr>
        <tr>
          <td>股票當沖</td>
          <td class="text-math">{CalculatorConstant.證券交易稅稅率.股票當沖 * 1000}‰</td>
        </tr>
        <tr>
          <td>指數股票型基金（ETF）</td>
          <td class="text-math">{CalculatorConstant.證券交易稅稅率.指數股票型基金 * 1000}‰</td>
        </tr>
      </tbody>
    </table>
  </div>
</AppCard>
