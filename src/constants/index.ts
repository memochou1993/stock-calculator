export const 手續費費率常數 = Object.freeze({
  證券經紀商: 1.425 / 1000,
});

export const 證券交易稅稅率常數 = Object.freeze({
  股票: 3 / 1000,
  股票當日沖銷: 1.5 / 1000,
  指數股票型基金: 1 / 1000,
});

export const 交易類別常數 = Object.freeze({
  股票: '股票',
  股票當日沖銷: '股票當日沖銷',
  ETF: 'ETF',
});

export const 交易常數 = Object.freeze({
  最小買入價格: 0,
  最小賣出價格: 0,
  最小交易股數: 0,
  最大買入價格: 10000,
  最大賣出價格: 10000,
  最大交易股數: 100000000,
});
