import { 手續費費率, 證券交易稅稅率 } from '../constants';

class Calculator {
  交易類別: string;
  買入價格: number;
  賣出價格: number;
  交易股數: number;
  手續費折扣: number;
  最低手續費: number;

  constructor({
    交易類別,
    買入價格,
    賣出價格,
    交易股數,
    手續費折扣,
    最低手續費,
  }: {
    交易類別: string;
    買入價格: number;
    賣出價格: number;
    交易股數: number;
    手續費折扣: number;
    最低手續費: number;
  }) {
    this.交易類別 = 交易類別;
    this.買入價格 = 買入價格;
    this.賣出價格 = 賣出價格;
    this.交易股數 = 交易股數;
    this.手續費折扣 = 手續費折扣;
    this.最低手續費 = 最低手續費;
  }

  get 成本(): number {
    return this.買入價格 * this.交易股數;
  }

  get 市值(): number {
    return this.成交價格 * this.交易股數;
  }

  get 成交價格(): number {
    return this.賣出價格;
  }

  get 支付總金額(): number {
    return this.成本 + this.買入手續費;
  }

  get 實收總金額(): number {
    return this.市值 - this.賣出手續費 - this.證券交易稅;
  }

  get 買入手續費(): number {
    return Math.max(this.最低手續費, this.成本 * 手續費費率.證券經紀商 * this.手續費折扣);
  }

  get 賣出手續費(): number {
    return Math.max(this.最低手續費, this.市值 * 手續費費率.證券經紀商 * this.手續費折扣);
  }

  get 證券交易稅(): number {
    return this.市值 * this.計算證券交易稅稅率(this.交易類別);
  }

  get 損益金額(): number {
    return this.實收總金額 - this.支付總金額;
  }

  get 報酬率(): number {
    return this.損益金額 / this.成本;
  }

  計算證券交易稅稅率(交易類別: string): number {
    if (交易類別 === '股票當日沖銷') {
      return 證券交易稅稅率.股票當日沖銷;
    }
    if (交易類別 === 'ETF') {
      return 證券交易稅稅率.指數股票型基金;
    }
    return 證券交易稅稅率.股票;
  }
}

export default Calculator;
