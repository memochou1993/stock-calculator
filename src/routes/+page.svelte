<script lang="ts">
  import CalculatorForm from '$components/CalculatorForm.svelte';
  import CalculatorTable from '$components/CalculatorTable.svelte';
  import CalculatorUsage from '$components/CalculatorUsage.svelte';

  // FIXME:
  let 交易類別 = '股票';
  let 買入價格 = 100;
  let 賣出價格 = 101;
  let 交易股數 = 1000;
  let 手續費折扣 = 0.6;
  let 最低手續費 = 20;
</script>

<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-3">
      <CalculatorForm />
    </div>
    <div class="col-12 col-md-9">
      <div class="row g-4">
        <div class="col-12">
          <CalculatorTable {交易類別} {買入價格} {賣出價格} {交易股數} {手續費折扣} {最低手續費} />
        </div>
        <div class="col-12">
          <CalculatorUsage />
        </div>
      </div>
    </div>
  </div>
</div>
