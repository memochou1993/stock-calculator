<script lang="ts">
  import { CalculatorOutput } from '$lib/calculator';
  import { GTM } from '$lib/gtm';
  import { download } from '$lib/utils';
  import AppIcon from './AppIcon.svelte';

  export let calculatorOutputs: Array<CalculatorOutput>;

  const downloadFile = () => {
    const [output] = calculatorOutputs;
    const keys = Object.keys(output);
    const rows = calculatorOutputs.map((output) => keys.map((key) => Number(output[key]).toFixed(2)));
    const content = [keys, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([content], { type: 'text/csv' });
    download('prices.csv', blob);
  };
</script>

<button
  class="btn btn-variant px-2"
  on:click={() => {
    downloadFile();
    GTM.pushEvent('download_file');
  }}
  type="button"
>
  <AppIcon icon="download" />
</button>
