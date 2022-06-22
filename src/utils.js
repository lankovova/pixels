export const isObject = (x) => Object.prototype.toString.call(x) === '[object Object]';

export const clone = (value) => {
  if (Array.isArray(value)) {
    return value.map(clone);
  }

  if (isObject(value)) {
    return Object.entries(value).reduce((acc, [k, v]) => ({
      ...acc,
      [k]: clone(v),
    }), {});
  }

  return value;
};

export const railTillOneTruthy = (...funcs) => {
  for (let i = 0; i < funcs.length; i += 1) {
    const res = funcs[i]();

    if (res) {
      return res;
    }
  }

  return undefined;
};
