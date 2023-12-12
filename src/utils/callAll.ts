const callAll =
  (...fns: Function[]) =>
  (...args: any[]) =>
    fns.forEach((fn) => fn && fn(...args));

export default callAll;
