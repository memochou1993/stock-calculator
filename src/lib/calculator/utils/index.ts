import { float } from '$lib/utils';
import CalculatorConstant from '../CalculatorConstant';

const getNextPrices = (type: string, price: number, length: number): number[] => {
  let next = price;
  return Array.from({ length }, () => {
    const step = getPriceStep(type, next);
    next = float.create(next).add(step).getValue();
    return next;
  });
};

const getPrevPrices = (type: string, price: number, length: number): number[] => {
  let next = price;
  return Array.from({ length }, () => {
    const step = getPriceStep(type, next - 0.01);
    next = float.create(next).subtract(step).getValue();
    return next;
  });
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

export { getNextPrices, getPrevPrices, getPriceStep, getShareStep };
