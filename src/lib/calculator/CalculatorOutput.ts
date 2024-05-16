interface CalculatorOutputArgs {
  成交價格: number;
  支付總金額: number;
  實收總金額: number;
  買入手續費: number;
  賣出手續費: number;
  證券交易稅: number;
  損益金額: number;
  報酬率: number;
}

class CalculatorOutput {
  成交價格: number;
  支付總金額: number;
  實收總金額: number;
  買入手續費: number;
  賣出手續費: number;
  證券交易稅: number;
  損益金額: number;
  報酬率: number;

  constructor(args: CalculatorOutputArgs) {
    this.成交價格 = args.成交價格;
    this.支付總金額 = args.支付總金額;
    this.實收總金額 = args.實收總金額;
    this.買入手續費 = args.買入手續費;
    this.賣出手續費 = args.賣出手續費;
    this.證券交易稅 = args.證券交易稅;
    this.損益金額 = args.損益金額;
    this.報酬率 = args.報酬率;
  }

  public static toLocaleString(value: number, fractionDigits: number): string {
    return value.toLocaleString('zh-TW', { minimumFractionDigits: 0, maximumFractionDigits: fractionDigits });
  }
}

export default CalculatorOutput;
