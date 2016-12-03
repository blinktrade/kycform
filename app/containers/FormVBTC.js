import React from 'react';
import {
  Title,
  FieldName,
  FieldBirthday,
  FieldPhoneNumber,
  FieldAddress,
  FieldNationalID,
  FieldPhotoID,
  FieldPhotoSelf,
  FieldLanguage,
} from '../components';

const title = '20.000₫ for every new verified user';

const languages = [
  { key: 'en', value: 'English' },
  { key: 'vi', value: 'Vietnamese' },
];

const FormVBTC = ({ fields }) => fields(
  <div>
    <FieldLanguage languages={languages} />
    <Title title={title} />
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldNationalID />
    <FieldPhotoID />
    <FieldPhotoSelf />
  </div>
);

export default FormVBTC;
