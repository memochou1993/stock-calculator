import { expect, test } from 'vitest';
import Calculator from './Calculator';

test('試算股票', () => {
  const calculator = new Calculator({
    交易類別: '買進',
    買入價格: 240,
    賣出價格: 480,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  expect(calculator.成交價格.toFixed(1)).toBe('480.0');
  expect(calculator.支付總金額.toFixed(1)).toBe('240205.2');
  expect(calculator.實收總金額.toFixed(1)).toBe('478149.6');
  expect(calculator.買入手續費.toFixed(1)).toBe('205.2');
  expect(calculator.賣出手續費.toFixed(1)).toBe('410.4');
  expect(calculator.證券交易稅.toFixed(1)).toBe('1440.0');
  expect(calculator.損益金額.toFixed(1)).toBe('237944.4');
  expect(calculator.報酬率.toFixed(4)).toBe('0.9914');
});

test('試算股票小額交易', () => {
  const calculator = new Calculator({
    交易類別: '股票',
    買入價格: 10,
    賣出價格: 15,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  expect(calculator.成交價格.toFixed(1)).toBe('15.0');
  expect(calculator.支付總金額.toFixed(1)).toBe('10020.0');
  expect(calculator.實收總金額.toFixed(1)).toBe('14935.0');
  expect(calculator.買入手續費.toFixed(1)).toBe('20.0');
  expect(calculator.賣出手續費.toFixed(1)).toBe('20.0');
  expect(calculator.證券交易稅.toFixed(1)).toBe('45.0');
  expect(calculator.損益金額.toFixed(1)).toBe('4915.0');
  expect(calculator.報酬率.toFixed(4)).toBe('0.4915');
});
