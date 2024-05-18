import { expect, test } from 'vitest';
import calculate from './calculate';
import CalculatorConstant from './CalculatorConstant';
import CalculatorInput from './CalculatorInput';

test('試算：股票', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票,
    買入價格: 123,
    賣出價格: 456,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('456.0');
  expect(output.成本.toFixed(1)).toBe('123000.0');
  expect(output.市值.toFixed(1)).toBe('456000.0');
  expect(output.支付總金額.toFixed(1)).toBe('123105.2');
  expect(output.實收總金額.toFixed(1)).toBe('454242.1');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('1368.0');
  expect(output.損益金額.toFixed(1)).toBe('331137.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6922');
});

test('試算：股票（最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票,
    買入價格: 1.2,
    賣出價格: 3.4,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('3.4');
  expect(output.成本.toFixed(1)).toBe('1200.0');
  expect(output.市值.toFixed(1)).toBe('3400.0');
  expect(output.支付總金額.toFixed(1)).toBe('1220.0');
  expect(output.實收總金額.toFixed(1)).toBe('3369.8');
  expect(output.原始買入手續費.toFixed(1)).toBe('1.0');
  expect(output.原始賣出手續費.toFixed(1)).toBe('2.9');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('10.2');
  expect(output.損益金額.toFixed(1)).toBe('2149.8');
  expect(output.報酬率.toFixed(4)).toBe('1.7915');
});

test('試算：股票當日沖銷', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票當日沖銷,
    買入價格: 123,
    賣出價格: 456,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('456.0');
  expect(output.成本.toFixed(1)).toBe('123000.0');
  expect(output.市值.toFixed(1)).toBe('456000.0');
  expect(output.支付總金額.toFixed(1)).toBe('123105.2');
  expect(output.實收總金額.toFixed(1)).toBe('454926.1');
  expect(output.原始買入手續費.toFixed(1)).toBe('105.2');
  expect(output.原始賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('684.0');
  expect(output.損益金額.toFixed(1)).toBe('331821.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6977');
});

test('試算：股票當日沖銷（最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票當日沖銷,
    買入價格: 1.2,
    賣出價格: 3.4,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('3.4');
  expect(output.成本.toFixed(1)).toBe('1200.0');
  expect(output.市值.toFixed(1)).toBe('3400.0');
  expect(output.支付總金額.toFixed(1)).toBe('1220.0');
  expect(output.實收總金額.toFixed(1)).toBe('3374.9');
  expect(output.原始買入手續費.toFixed(1)).toBe('1.0');
  expect(output.原始賣出手續費.toFixed(1)).toBe('2.9');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('5.1');
  expect(output.損益金額.toFixed(1)).toBe('2154.9');
  expect(output.報酬率.toFixed(4)).toBe('1.7958');
});

test('試算：ETF', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.ETF,
    買入價格: 123,
    賣出價格: 456,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 10,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('456.0');
  expect(output.成本.toFixed(1)).toBe('123000.0');
  expect(output.市值.toFixed(1)).toBe('456000.0');
  expect(output.支付總金額.toFixed(1)).toBe('123105.2');
  expect(output.實收總金額.toFixed(1)).toBe('455154.1');
  expect(output.原始買入手續費.toFixed(1)).toBe('105.2');
  expect(output.原始賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('456.0');
  expect(output.損益金額.toFixed(1)).toBe('332049.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6996');
});

test('試算：ETF（最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.ETF,
    買入價格: 1.2,
    賣出價格: 3.4,
    交易股數: 1000,
    手續費折扣: 0.6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.成交價格.toFixed(1)).toBe('3.4');
  expect(output.成本.toFixed(1)).toBe('1200.0');
  expect(output.市值.toFixed(1)).toBe('3400.0');
  expect(output.支付總金額.toFixed(1)).toBe('1220.0');
  expect(output.實收總金額.toFixed(1)).toBe('3376.6');
  expect(output.原始買入手續費.toFixed(1)).toBe('1.0');
  expect(output.原始賣出手續費.toFixed(1)).toBe('2.9');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('3.4');
  expect(output.損益金額.toFixed(1)).toBe('2156.6');
  expect(output.報酬率.toFixed(4)).toBe('1.7972');
});
