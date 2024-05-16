import Calculator from './Calculator';
import CalculatorInput from './CalculatorInput';
import CalculatorOutput from './CalculatorOutput';

const calculate = (input: CalculatorInput): CalculatorOutput => {
  return new Calculator(input).output;
};

export default calculate;
