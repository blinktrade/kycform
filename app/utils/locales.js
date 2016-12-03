import 'intl';
import { addLocaleData } from 'react-intl';

import _en from 'react-intl/locale-data/en';
import _pt from 'react-intl/locale-data/pt';
import _es from 'react-intl/locale-data/es';
import _vi from 'react-intl/locale-data/vi';
import _zh from 'react-intl/locale-data/zh';

import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';
import vi from './locales/vi.json';

addLocaleData([..._en, ..._es, ..._pt, ..._vi, ..._zh]);

export default {
  en,
  pt,
  es,
  vi,
};
