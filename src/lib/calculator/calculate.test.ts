import { expect, test } from 'vitest';
import CalculatorConstant from './CalculatorConstant';
import CalculatorInput from './CalculatorInput';
import { calculate } from './calculate';

test('試算：股票', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票,
    交易股數: 1000,
    買入價格: 123,
    賣出價格: 456,
    手續費折扣: 6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.買入價格.toFixed(1)).toBe('123.0');
  expect(output.賣出價格.toFixed(1)).toBe('456.0');
  expect(output.股票成本.toFixed(1)).toBe('123000.0');
  expect(output.股票市值.toFixed(1)).toBe('456000.0');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('1368.0');
  expect(output.投資成本.toFixed(1)).toBe('124863.0');
  expect(output.損益金額.toFixed(1)).toBe('331137.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6520');
});

test('試算：股票（最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票,
    交易股數: 1000,
    買入價格: 1.2,
    賣出價格: 3.4,
    手續費折扣: 6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.買入價格.toFixed(1)).toBe('1.2');
  expect(output.賣出價格.toFixed(1)).toBe('3.4');
  expect(output.股票成本.toFixed(1)).toBe('1200.0');
  expect(output.股票市值.toFixed(1)).toBe('3400.0');
  expect(output.原始買入手續費.toFixed(1)).toBe('1.0');
  expect(output.原始賣出手續費.toFixed(1)).toBe('2.9');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('10.2');
  expect(output.投資成本.toFixed(1)).toBe('1250.2');
  expect(output.損益金額.toFixed(1)).toBe('2149.8');
  expect(output.報酬率.toFixed(4)).toBe('1.7196');
});

test('試算：股票當沖', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票當沖,
    交易股數: 1000,
    買入價格: 123,
    賣出價格: 456,
    手續費折扣: 6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.買入價格.toFixed(1)).toBe('123.0');
  expect(output.賣出價格.toFixed(1)).toBe('456.0');
  expect(output.股票成本.toFixed(1)).toBe('123000.0');
  expect(output.股票市值.toFixed(1)).toBe('456000.0');
  expect(output.原始買入手續費.toFixed(1)).toBe('105.2');
  expect(output.原始賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('684.0');
  expect(output.投資成本.toFixed(1)).toBe('124179.0');
  expect(output.損益金額.toFixed(1)).toBe('331821.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6721');
});

test('試算：股票當沖（最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.股票當沖,
    交易股數: 1000,
    買入價格: 1.2,
    賣出價格: 3.4,
    手續費折扣: 6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.買入價格.toFixed(1)).toBe('1.2');
  expect(output.賣出價格.toFixed(1)).toBe('3.4');
  expect(output.股票成本.toFixed(1)).toBe('1200.0');
  expect(output.股票市值.toFixed(1)).toBe('3400.0');
  expect(output.原始買入手續費.toFixed(1)).toBe('1.0');
  expect(output.原始賣出手續費.toFixed(1)).toBe('2.9');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('5.1');
  expect(output.投資成本.toFixed(1)).toBe('1245.1');
  expect(output.損益金額.toFixed(1)).toBe('2154.9');
  expect(output.報酬率.toFixed(4)).toBe('1.7307');
});

test('試算：ETF', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.ETF,
    交易股數: 1000,
    買入價格: 123,
    賣出價格: 456,
    手續費折扣: 6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.買入價格.toFixed(1)).toBe('123.0');
  expect(output.賣出價格.toFixed(1)).toBe('456.0');
  expect(output.股票成本.toFixed(1)).toBe('123000.0');
  expect(output.股票市值.toFixed(1)).toBe('456000.0');
  expect(output.原始買入手續費.toFixed(1)).toBe('105.2');
  expect(output.原始賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.買入手續費.toFixed(1)).toBe('105.2');
  expect(output.賣出手續費.toFixed(1)).toBe('389.9');
  expect(output.證券交易稅.toFixed(1)).toBe('456.0');
  expect(output.投資成本.toFixed(1)).toBe('123951.0');
  expect(output.損益金額.toFixed(1)).toBe('332049.0');
  expect(output.報酬率.toFixed(4)).toBe('2.6789');
});

test('試算：ETF（最低手續費）', () => {
  const input = new CalculatorInput({
    交易類別: CalculatorConstant.交易類別.ETF,
    交易股數: 1000,
    買入價格: 1.2,
    賣出價格: 3.4,
    手續費折扣: 6,
    最低手續費: 20,
  });

  const output = calculate(input);

  expect(output.買入價格.toFixed(1)).toBe('1.2');
  expect(output.賣出價格.toFixed(1)).toBe('3.4');
  expect(output.股票成本.toFixed(1)).toBe('1200.0');
  expect(output.股票市值.toFixed(1)).toBe('3400.0');
  expect(output.原始買入手續費.toFixed(1)).toBe('1.0');
  expect(output.原始賣出手續費.toFixed(1)).toBe('2.9');
  expect(output.買入手續費.toFixed(1)).toBe('20.0');
  expect(output.賣出手續費.toFixed(1)).toBe('20.0');
  expect(output.證券交易稅.toFixed(1)).toBe('3.4');
  expect(output.投資成本.toFixed(1)).toBe('1243.4');
  expect(output.損益金額.toFixed(1)).toBe('2156.6');
  expect(output.報酬率.toFixed(4)).toBe('1.7344');
});
