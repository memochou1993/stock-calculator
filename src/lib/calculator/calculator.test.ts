import { expect, test } from 'vitest';
import CalculatorInput from './CalculatorInput';
import calculate from './calculate';

test('試算股票', () => {
  const input = new CalculatorInput({
    交易類別: '股票',
    買入價格: 123,
    賣出價格: 456,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('456.0');
  expect(output.支付總金額.toFixed(1)).toBe('123105.2');
  expect(output.實收總金額.toFixed(1)).toBe('454242.1');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('1368.0');
  expect(output.損益金額.toFixed(1)).toBe('331137.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6922');
});

test('試算股票（未滿最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: '股票',
    買入價格: 1.2,
    賣出價格: 3.4,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('3.4');
  expect(output.支付總金額.toFixed(1)).toBe('1220.0');
  expect(output.實收總金額.toFixed(1)).toBe('3369.8');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('10.2');
  expect(output.損益金額.toFixed(1)).toBe('2149.8');
  expect(output.報酬率.toFixed(4)).toBe('1.7915');
});
