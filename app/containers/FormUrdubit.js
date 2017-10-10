/* @flow */
import React from 'react';
import {
  FieldName,
  FieldBirthday,
  FieldPhoneNumber,
  FieldAddress,
  FieldNationalID,
  FieldPhotoID,
  FieldPhotoBill,
  FieldSignature,
} from '../components';

import FormBase from './FormBase';

const FormUrdubit = () => (
  <FormBase>
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldNationalID name="cnic" />
    <FieldPhotoID description="photoCnic" />
    <FieldPhotoBill />
    <FieldSignature />
  </FormBase>
);

export default FormUrdubit;
