export const formatNumberToDisplay = (num?: number) =>
  num
    ? num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 0;

export const formatNumberToDisplayWithCommas = (num?: number) =>
  num ? (Math.round(num * 100) / 100).toFixed(2) : 0;
