export const areEqualArrays = (a: any[], b: any[]) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const getUniqueListBy = (arr: any[], key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
