interface CalculatorOutputArgs {
  買入價格: number;
  賣出價格: number;
  股票成本: number;
  股票市值: number;
  原始買入手續費: number;
  原始賣出手續費: number;
  買入手續費: number;
  賣出手續費: number;
  證券交易稅: number;
  投資成本: number;
  損益金額: number;
  報酬率: number;
}

class CalculatorOutput {
  買入價格: number;
  賣出價格: number;
  股票成本: number;
  股票市值: number;
  原始買入手續費: number;
  原始賣出手續費: number;
  買入手續費: number;
  賣出手續費: number;
  證券交易稅: number;
  投資成本: number;
  損益金額: number;
  報酬率: number;

  constructor(args: CalculatorOutputArgs) {
    this.買入價格 = args.買入價格;
    this.賣出價格 = args.賣出價格;
    this.股票成本 = args.股票成本;
    this.股票市值 = args.股票市值;
    this.原始買入手續費 = args.原始買入手續費;
    this.原始賣出手續費 = args.原始賣出手續費;
    this.買入手續費 = args.買入手續費;
    this.賣出手續費 = args.賣出手續費;
    this.證券交易稅 = args.證券交易稅;
    this.投資成本 = args.投資成本;
    this.損益金額 = args.損益金額;
    this.報酬率 = args.報酬率;
  }

  public static toLocaleString(value: number, fractionDigits: number): string {
    return value.toLocaleString('zh-TW', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
  }
}

export default CalculatorOutput;
