import React from 'react';
import {
  FieldName,
  FieldBirthday,
  FieldPhoneNumber,
  FieldAddress,
  FieldNationalID,
  FieldPhotoID,
  FieldPhotoSelf,
  FieldSignature,
} from '../components';

const FormBlinkTrade = ({ fields }) => fields(
  <div>
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldNationalID />
    <FieldPhotoID />
    <FieldPhotoSelf />
    <FieldSignature />
  </div>
);

export default FormBlinkTrade;
