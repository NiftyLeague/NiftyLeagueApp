export const formatNumberToDisplay = (num: number) =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
