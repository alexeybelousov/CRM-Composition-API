import _ from 'lodash';
import store from '../store';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const locales = {
  'ru-RU': ru,
  'en-US': en,
};

export default function localizeFilter(key) {
  const locale = _.get(store, 'store.getters.info.locale', null) || 'en-US';

  return locales[locale][key] || `[Localize error] key ${key} not found`;
}
