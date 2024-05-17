import CalculatorConstant from './CalculatorConstant';

const calculateStep = (type: string, price: number | null): number => {
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

export default calculateStep;
