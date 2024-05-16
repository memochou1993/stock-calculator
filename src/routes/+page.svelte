<script lang="ts">
  import { CalculatorForm, CalculatorTable, CalculatorUsage } from '$components';
  import { CalculatorConstant, CalculatorInput } from '$lib';

  let calculatorInput = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別常數.股票,
    買入價格: null,
    賣出價格: null,
    交易股數: 1000,
    手續費折扣: 1,
    最低手續費: 20,
  });

  const handleUpdate = (data: CalculatorInput) => {
    calculatorInput = data;
  };
</script>

<div class="container">
  <div class="row g-4">
    <div class="col-12 col-lg-3">
      <CalculatorForm data={calculatorInput} onUpdate={handleUpdate} />
    </div>
    <div class="col-12 col-lg-9">
      <div class="row g-4">
        <div class="col-12">
          <CalculatorTable data={calculatorInput} />
        </div>
        <div class="col-12">
          <CalculatorUsage />
        </div>
      </div>
    </div>
  </div>
</div>
