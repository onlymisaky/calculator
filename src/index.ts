import { getDecimalLen, movePoint, toNumber } from './utils';

function addition(...args: number[]): number {
  const [a, b, ...params] = args;
  const m = toNumber(a, 0);
  const n = toNumber(b, 0);
  const len1 = getDecimalLen(m);
  const len2 = getDecimalLen(n);
  const len = Math.max(len1, len2);
  const intM = movePoint(m, 'right', len);
  const intN = movePoint(n, 'right', len);
  const intSum = intM + intN;
  const sum = movePoint(intSum, 'left', len);
  if (params.length) {
    return addition(sum, ...params);
  }
  return sum;
}

function subtraction(n: number, ...args: number[]): number {
  const arr = args.map((n) => -Number(n));
  return addition(n, ...arr);
}

function multiplication(...args: number[]): number {
  const [a, b, ...params] = args;
  const m = toNumber(a, 1);
  const n = toNumber(b, 1);
  const len1 = getDecimalLen(m);
  const len2 = getDecimalLen(n);
  const len = len1 + len2;
  const intM = movePoint(m, 'right', len1);
  const intN = movePoint(n, 'right', len2);
  const intProduct = intM * intN;
  const product = movePoint(intProduct, 'left', len);
  if (params.length) {
    return multiplication(product, ...params);
  }
  return product;
}

function division(a: number, ...args: number[]): number {
  const [b, ...params] = args;
  const m = toNumber(a, 1);
  const n = toNumber(b, 1);
  const len1 = getDecimalLen(m);
  const len2 = getDecimalLen(n);
  const len = Math.max(len1, len2);
  const intM = movePoint(m, 'right', len);
  const intN = movePoint(n, 'right', len);
  const intQuotient = intM / intN;
  const quotient = intQuotient;
  if (params.length) {
    return division(quotient, ...params);
  }
  return quotient;
}

export {
  addition, subtraction, multiplication, division
}

export default {
  addition, subtraction, multiplication, division
}
