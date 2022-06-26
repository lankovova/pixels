export const isObject = (x) => Object.prototype.toString.call(x) === '[object Object]';

export const clone = (value) => {
  if (Array.isArray(value)) {
    return value.map(clone);
  }

  if (isObject(value)) {
    return Object.entries(value).reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: clone(v),
      }),
      {},
    );
  }

  return value;
};

const tryCallPredicate = (predicate) => {
  if (typeof predicate === 'function') {
    return predicate();
  }

  if (!Array.isArray(predicate)) {
    throw new Error(`Predicate should be either function or array, but instead recieved type: ${typeof predicate}`);
  }

  const randomizedGroup = [...predicate].sort(() => 0.5 - Math.random());

  for (let j = 0; j < randomizedGroup.length; j += 1) {
    const tryPredicate = randomizedGroup[j];

    const res = tryPredicate();
    if (res) {
      return true;
    }
  }

  return false;
};

export const randomizedRailTillOneTruthy = (...predicates) => {
  for (let i = 0; i < predicates.length; i += 1) {
    const predicate = predicates[i];
    const res = tryCallPredicate(predicate);
    if (res) {
      return true;
    }
  }

  return false;
};
