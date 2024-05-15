<script lang="ts">
  import CalculatorForm from '$components/CalculatorForm.svelte';
  import CalculatorTable from '$components/CalculatorTable.svelte';
  import CalculatorUsage from '$components/CalculatorUsage.svelte';
</script>

<div class="container">
  <div class="row g-4 my-2 my-md-4">
    <div class="col-12 col-md-3">
      <CalculatorForm />
    </div>
    <div class="col-12 col-md-9">
      <div class="row g-4">
        <div class="col-12">
          <CalculatorTable />
        </div>
        <div class="col-12">
          <CalculatorUsage />
        </div>
      </div>
    </div>
  </div>
</div>
