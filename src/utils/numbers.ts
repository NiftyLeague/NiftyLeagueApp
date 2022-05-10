export const formatNumberToDisplay = (num: number) =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatNumberToDisplayWithCommas = (num: number) =>
  (Math.round(num * 100) / 100).toFixed(2);
