import React from 'react';
import {
  Title,
  FieldName,
  FieldBirthday,
  FieldPhoneNumber,
  FieldAddress,
  FieldPhotoID,
  FieldPhotoSelf,
  FieldLanguage,
} from '../components';

import FormBase from './FormBase';

const title = '20.000₫ for every new verified user';

const languages = [
  { key: 'en', value: 'English' },
  { key: 'vi', value: 'Vietnamese' },
];

const FormVBTC = () => (
  <FormBase>
    <FieldLanguage languages={languages} />
    <Title title={title} />
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldPhotoID />
    <FieldPhotoSelf />
  </FormBase>
);

export default FormVBTC;
