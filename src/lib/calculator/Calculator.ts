import CalculatorConstant from './CalculatorConstant';
import CalculatorInput from './CalculatorInput';
import CalculatorOutput from './CalculatorOutput';

class Calculator {
  交易類別: string;
  交易股數: number;
  買入價格: number;
  賣出價格: number;
  手續費折扣: number;
  最低手續費: number;

  constructor(args: CalculatorInput) {
    this.交易類別 = args.交易類別;
    this.交易股數 = Number(args.交易股數);
    this.買入價格 = Number(args.買入價格);
    this.賣出價格 = Number(args.賣出價格);
    this.手續費折扣 = Number(args.手續費折扣);
    this.最低手續費 = Number(args.最低手續費);
  }

  get output(): CalculatorOutput {
    return new CalculatorOutput({
      買入價格: this.買入價格,
      賣出價格: this.賣出價格,
      股票成本: this.股票成本,
      股票市值: this.股票市值,
      原始買入手續費: this.原始買入手續費,
      原始賣出手續費: this.原始賣出手續費,
      買入手續費: this.買入手續費,
      賣出手續費: this.賣出手續費,
      證券交易稅: this.證券交易稅,
      投資成本: this.投資成本,
      損益金額: this.損益金額,
      報酬率: this.報酬率,
    });
  }

  private get 股票成本(): number {
    return this.買入價格 * this.交易股數;
  }

  private get 股票市值(): number {
    return this.賣出價格 * this.交易股數;
  }

  private get 原始買入手續費(): number {
    return this.股票成本 * CalculatorConstant.手續費費率.證券經紀商 * this.手續費折扣;
  }

  private get 原始賣出手續費(): number {
    return this.股票市值 * CalculatorConstant.手續費費率.證券經紀商 * this.手續費折扣;
  }

  private get 買入手續費(): number {
    return Math.max(this.最低手續費, this.原始買入手續費);
  }

  private get 賣出手續費(): number {
    return Math.max(this.最低手續費, this.原始賣出手續費);
  }

  private get 證券交易稅(): number {
    return this.股票市值 * this.計算證券交易稅稅率(this.交易類別);
  }

  private get 投資成本(): number {
    return this.股票成本 + this.買入手續費 + this.賣出手續費 + this.證券交易稅;
  }

  private get 損益金額(): number {
    return this.股票市值 - this.投資成本;
  }

  private get 報酬率(): number {
    return this.投資成本 > 0 ? this.損益金額 / this.投資成本 : 0;
  }

  private 計算證券交易稅稅率(交易類別: string): number {
    if (交易類別 === CalculatorConstant.交易類別.股票當日沖銷) {
      return CalculatorConstant.證券交易稅稅率.股票當日沖銷;
    }
    if (交易類別 === CalculatorConstant.交易類別.ETF) {
      return CalculatorConstant.證券交易稅稅率.指數股票型基金;
    }
    return CalculatorConstant.證券交易稅稅率.股票;
  }
}

export default Calculator;
