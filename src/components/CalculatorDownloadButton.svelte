<script lang="ts">
import { CalculatorOutput } from '$lib/calculator';
import { GTM } from '$lib/gtm';
import { download } from '$lib/utils';
import AppIcon from './AppIcon.svelte';

export let calculatorOutputs: Array<CalculatorOutput>;

const downloadFile = () => {
  const table = document.querySelector('table') as HTMLTableElement;
  const keys = ['買入價格', ...[...table.querySelectorAll('th')].map((th) => String(th.textContent))];
  const rows = calculatorOutputs.map((output) =>
    keys.map((key) => {
      if (key === '報酬率') {
        return `${Number(output[key] * 100).toFixed(2)}%`;
      }
      return Number(output[key]).toFixed(2);
    }),
  );
  const content = [keys, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([content], { type: 'text/csv' });
  download('股票交易計算器試算結果.csv', blob);
};
</script>

<button
  class="btn btn-variant"
  on:click={() => {
    downloadFile();
    GTM.pushEvent('download_file');
  }}
  type="button"
>
  <AppIcon icon="download" />
</button>
