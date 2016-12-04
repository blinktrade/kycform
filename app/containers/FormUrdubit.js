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

const FormUrdubit = ({ fields }) => fields(
  <div>
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldNationalID name="cnic" />
    <FieldPhotoID description="photoCnic" />
    <FieldPhotoBill />
    <FieldSignature />
  </div>
);

export default FormUrdubit;
