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
}

export default CalculatorInput;
