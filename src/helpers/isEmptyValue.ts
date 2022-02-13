export const isEmptyValue = (object: any): boolean => {
  if (typeof object === 'string') return object.trim() === '';
  if (typeof object === 'object')
    return Object.values(object).some(
      (item) => item === null || ('' + item).trim() === '' || item === undefined
    );
  return object === undefined || object === null;
};
