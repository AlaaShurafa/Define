import {I18nManager} from 'react-native';
// import I18n from 'react-native-i18n';
import * as RNLocalize from 'react-native-localize';

import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import deviceStorage from '../services/deviceStorage';
import RNRestart from 'react-native-restart';

const translationGetters = {
  en: () => require('./en.json'),
  ar: () => require('./ar.json'),
  sv: () => require('./sw.json'),
  tr: () => require('./tr.json'),
  nb: () => require('./nb.json'),
  da: () => require('./da.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
export const setI18nConfig = () => {
  deviceStorage.getItem('lang').then(language => {
    if (language) {
      translate.cache.clear();
      if (language === 'ar') {
        I18nManager.forceRTL(true);

        if (!I18nManager.isRTL) {
          RNRestart.Restart();
        }
      } else {
        I18nManager.forceRTL(false);
        if (I18nManager.isRTL) {
          RNRestart.Restart();
        }
      }
      i18n.locale = language;
      i18n.translations = {[language]: translationGetters[language]()};
    } else {
      deviceStorage.saveItem('lang','ar')
      // clear translation cache
      translate.cache.clear();
      i18n.locale = 'ar';
      i18n.translations = {['ar']: translationGetters['ar']()};

      // update layout direction
      I18nManager.forceRTL(true);
      // RNRestart.Restart();
    }
  });
};
// 
// deviceStorage.removeItem('device_token')