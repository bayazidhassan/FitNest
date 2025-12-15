export const getChangedFields = <T extends Record<string, any>>(
  original: T,
  updated: T
): Partial<T> => {
  const diff: Partial<T> = {};

  (Object.keys(updated) as (keyof T)[]).forEach((key) => {
    if (updated[key] !== original[key]) {
      diff[key] = updated[key];
    }
  });

  return diff;
};
