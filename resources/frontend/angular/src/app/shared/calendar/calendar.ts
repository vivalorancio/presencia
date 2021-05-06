export function dayOfYear(d: Date): number {
  return dayNo(d.getFullYear(), d.getMonth() + 1, d.getDate()) as number;
}

export function dayNo(y: number, m: number, d: number) {
  return (
    --m >= 0 &&
    m < 12 &&
    d > 0 &&
    d <
      29 +
        (((4 * (y = y & 3 || (!(y % 25) && y & 15) ? 0 : 1) + 15662003) >>
          (m * 2)) &
          3) &&
    m * 31 - (m > 1 ? ((1054267675 >> (m * 3 - 6)) & 7) - y : 0) + d - 1
  );
}

export function dateAAAAMMDD(d: Date) {
  return (
    d.getFullYear() +
    '-' +
    `00${d.getMonth() + 1}`.slice(-2) +
    '-' +
    `00${d.getDate()}`.slice(-2)
  );
}

export function timeHHMMSS(d: Date) {
  return (
    `00${d.getHours()}`.slice(-2) +
    ':' +
    `00${d.getMinutes()}`.slice(-2) +
    ':' +
    `00${d.getSeconds()}`.slice(-2)
  );
}
