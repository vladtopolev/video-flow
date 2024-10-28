/* eslint-disable @typescript-eslint/no-explicit-any */

function get<T extends Record<string, any>, K = any>(
  obj: T,
  path: string,
  defaultValue?: K,
): K | undefined {
  const keys = path.split('.');

  if (obj === undefined) {
    return defaultValue;
  }

  if (keys.length === 1) {
    return (obj[keys[0]] || defaultValue) as K;
  }

  return get(obj[keys[0]], keys.slice(1).join('.'), defaultValue);
}

export default { get };
