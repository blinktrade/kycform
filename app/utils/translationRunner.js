import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: '.i18n',
  translationsDirectory: './app/utils/locales',
  languages: ['en', 'es', 'pt', 'vi', 'zh'],
});
