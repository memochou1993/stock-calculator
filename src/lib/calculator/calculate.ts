import Calculator from './Calculator';
import CalculatorConstant from './CalculatorConstant';
import CalculatorInput from './CalculatorInput';
import CalculatorOutput from './CalculatorOutput';

const calculate = (input: CalculatorInput): CalculatorOutput => {
  return new Calculator(input).output;
};

const getPriceStep = (type: string, price: number | null): number => {
  if (!price) return 0.01;
  if (type === CalculatorConstant.交易類別.ETF) {
    if (price < 50) return 0.01;
    return 0.05;
  }
  if (price < 10) return 0.01;
  if (price < 50) return 0.05;
  if (price < 100) return 0.1;
  if (price < 500) return 0.5;
  if (price < 1000) return 1;
  return 5;
};

const getShareStep = (share: number | null): number => {
  if (!share) return 1000;
  if (share % 1000 === 0) return 1000;
  return 1;
};

const getPrevPrice = (type: string, price: number): number => {
  const step = getPriceStep(type, price - 0.01);
  return Math.round((price - step) * 100) / 100;
};

const getNextPrice = (type: string, price: number): number => {
  const step = getPriceStep(type, price);
  return Math.round((price + step) * 100) / 100;
};

const getPrevPrices = (type: string, price: number, length: number): number[] => {
  return Array.from({ length }, () => {
    price = getPrevPrice(type, price);
    return price;
  });
};

const getNextPrices = (type: string, price: number, length: number): number[] => {
  return Array.from({ length }, () => {
    price = getNextPrice(type, price);
    return price;
  });
};

export { calculate, getNextPrices, getPrevPrices, getPriceStep, getShareStep };
