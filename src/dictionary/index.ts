/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '../utils/index';
import type { TextDictionaryFunction } from '../VideoRecordFlow.types';
import defaultDictionary from './dictionary';

const TEMPLATE = /{{(.*?)}}/g;

const defaultTextDictionary: TextDictionaryFunction = (key, opts) => {
  const value = get(defaultDictionary, key, '') as any;
  if (typeof value === 'string') {
    return value.replace(TEMPLATE, (match, key) =>
      key.trim() in opts ? opts[key.trim()] : match,
    ) as string;
  }
  return value;
};

export default defaultTextDictionary;
