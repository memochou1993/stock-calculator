import { 交易類別常數 } from '../constants';

class CalculatorInput {
  交易類別: string;
  買入價格: number | null;
  賣出價格: number | null;
  交易股數: number | null;

  constructor(args: { 交易類別: string; 買入價格: number | null; 賣出價格: number | null; 交易股數: number | null }) {
    this.交易類別 = args.交易類別;
    this.買入價格 = args.買入價格;
    this.賣出價格 = args.賣出價格;
    this.交易股數 = args.交易股數;
  }

  public calcInputStep(price: number | null): number {
    if (!price) return 0.01;
    if (this.交易類別 === 交易類別常數.ETF) {
      if (price < 50) return 0.01;
      return 0.05;
    }
    if (price < 10) return 0.01;
    if (price < 50) return 0.05;
    if (price < 100) return 0.1;
    if (price < 500) return 0.5;
    if (price < 1000) return 1;
    return 5;
  }

  public static isInRange(value: number | null, min: number, max: number) {
    return !value || (value >= min && value <= max);
  }
}

export default CalculatorInput;
