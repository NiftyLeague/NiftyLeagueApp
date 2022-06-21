export const formatNumberToDisplay = (num?: number) =>
  num
    ? num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 0;

export const formatNumberToDisplayWithCommas = (num?: number) => {
  if (num) {
    const fixed = (Math.round(num * 100) / 100).toFixed(2);
    const parts = fixed.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return 0;
};
