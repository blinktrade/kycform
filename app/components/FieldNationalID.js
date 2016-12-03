import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';

const name = 'nationalId';

const FieldNationalID = ({ required }) => (
  <FieldGroup name="nationalIdGroup" required={required} fields={[name]}>
    <Field
      size={6}
      name={name}
    />
  </FieldGroup>
);

FieldNationalID.validate = values => validateAll(values)([name]);

export default FieldNationalID;
