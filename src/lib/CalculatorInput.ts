import { 交易類別常數 } from '../constants';

interface CalculatorInputArgs {
  交易類別: string;
  買入價格: number | null;
  賣出價格: number | null;
  交易股數: number | null;
  手續費折扣: number | null;
  最低手續費: number | null;
}

class CalculatorInput {
  交易類別: string;
  買入價格: number | null;
  賣出價格: number | null;
  交易股數: number | null;
  手續費折扣: number | null;
  最低手續費: number | null;

  constructor(args: CalculatorInputArgs) {
    this.交易類別 = args.交易類別;
    this.買入價格 = args.買入價格;
    this.賣出價格 = args.賣出價格;
    this.交易股數 = args.交易股數;
    this.手續費折扣 = args.手續費折扣;
    this.最低手續費 = args.最低手續費;
  }

  public calculateStep(price: number | null): number {
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
}

export default CalculatorInput;
