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

const hex2rgba = (hex = '', alpha = 1) => {
  let normalizedHex = hex;

  if (hex.length === 4) {
    normalizedHex = hex + hex.replace('#', '');
  }
  const hexMatch = normalizedHex.match(/\w\w/g);
  const [r, g, b] = hexMatch?.map((x) => parseInt(x, 16)) || [];
  return `rgba(${r},${g},${b},${alpha})`;
};

export default { get, hex2rgba };
