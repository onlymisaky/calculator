export function getDecimalPart(num: number): number {
  return Number(`${num}`.split('.')[1]) || 0;
}

export function getDecimalLen(num: number): number {
  const decimalPart = getDecimalPart(num);
  if (decimalPart) {
    return `${decimalPart}`.length;
  }
  return 0;
}

function movePoint2Left(num: number, digit: number): number {
  const arr = `${num}`.split('');
  let index = arr.indexOf('.');
  if (index === -1) {
    arr.push('.');
    arr.push('0');
    index = arr.indexOf('.');
  }
  for (let i = 0; i < digit; i += 1) {
    if (i >= index) {
      arr[0] = '0';
      arr.unshift('.');
    } else {
      const j = index - i;
      const m = arr[j];
      const n = arr[j - 1];
      arr[j] = n;
      arr[j - 1] = m;
    }
  }
  return Number(arr.join(''));
}

function movePoint2Right(num: number, digit: number,): number {
  const arr = `${num}`.split('');
  const index = arr.indexOf('.');
  if (index === -1) {
    for (let i = 0; i < digit; i += 1) {
      arr.push('0');
    }
  } else {
    for (let i = 0; i < digit; i += 1) {
      const j = index + i;
      const m = arr[j];
      if (j === arr.length - 1 && m === '.') {
        arr.pop();
        arr.push('0');
      } else if (m !== '.') {
        arr.push('0');
      } else {
        const n = arr[j + 1];
        arr[j] = n;
        arr[j + 1] = m;
      }
    }
  }
  return Number(arr.join(''));
}

export function movePoint(
  num: number,
  direction: 'left' | 'right',
  digit: number
): number {
  let m = num < 0 ? num * -1 : num
  let prefix = num > 0 ? '' : '-';
  const n = direction === 'left'
    ? movePoint2Left(m, digit)
    : movePoint2Right(m, digit);
  return Number(`${prefix}${n}`);
}

export function toNumber(num: number, defaultVal: number): number {
  if (['', undefined, null].includes(num as unknown as string | null | undefined)) {
    return defaultVal;
  }
  if (typeof num === 'boolean') {
    return defaultVal;
  }
  if (Number.isNaN(Number(num))) {
    return defaultVal;
  }
  return Number(num);
}
