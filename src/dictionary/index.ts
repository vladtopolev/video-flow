/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TextDictionaryFunction } from '../VideoRecordFlow.types';
import defaultDictionary from './dictionary';
import utils from '../utils/index';

const TEMPLATE = /{{(.*?)}}/g;

const defaultTextDictionary: TextDictionaryFunction = (key, opts) => {
  const value = utils.get(defaultDictionary, key, '') as any;
  if (typeof value === 'string') {
    return value.replace(TEMPLATE, (match, key) =>
      key.trim() in opts ? opts[key.trim()] : match,
    ) as string;
  }
  return value;
};

export default defaultTextDictionary;
