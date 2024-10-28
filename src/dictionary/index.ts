import type { TextDictionaryFunction } from '../VideoRecordFlow.types';
import defaultDictionary from './dictionary';
import utils from '../utils/index';

const defaultTextDictionary: TextDictionaryFunction = (key) =>
  utils.get(defaultDictionary, key, '') as string;

export default defaultTextDictionary;
