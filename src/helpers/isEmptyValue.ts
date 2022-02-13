export const isEmptyValue = (object: Object): boolean => {
  return Object.values(object).some(
    (item) => item === null || ('' + item).trim() === ''
  );
};
