<script lang="ts">
import { CalculatorForm, CalculatorTable, CalculatorUsageBasic, CalculatorUsageField, CalculatorUsageRate } from '$components';
import { CalculatorConstant, CalculatorInput } from '$lib/calculator';

let calculatorInput = new CalculatorInput({
  交易類別: CalculatorConstant.交易類別.股票,
  買入價格: null,
  賣出價格: null,
  交易股數: 1000,
  手續費折扣: 10,
  最低手續費: 20,
});
</script>

<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-4 col-lg-3">
      <CalculatorForm {calculatorInput} onUpdate={(v) => (calculatorInput = v)} />
    </div>
    <div class="col-12 col-md-8 col-lg-9">
      <div class="row g-4">
        <div class="col-12">
          <CalculatorTable {calculatorInput} />
        </div>
        <div class="col-12">
          <CalculatorUsageBasic />
        </div>
        <div class="col-12">
          <CalculatorUsageField />
        </div>
        <div class="col-12">
          <CalculatorUsageRate />
        </div>
      </div>
    </div>
  </div>
</div>
