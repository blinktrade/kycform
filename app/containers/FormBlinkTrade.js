/* @flow */
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

import FormBase from './FormBase';

const FormBlinkTrade = () => (
  <FormBase>
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldNationalID name="nationalId" />
    <FieldPhotoID />
    <FieldPhotoSelf />
    <FieldSignature />
  </FormBase>
);

export default FormBlinkTrade;
