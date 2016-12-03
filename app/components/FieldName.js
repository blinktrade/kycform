import React from 'react';

import { validateAll } from '../utils/validationUtils';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

const fields = [
  { name: 'firstName', size: 3 },
  { name: 'middleName', size: 3 },
  { name: 'lastName', size: 3 },
];

const fieldNames = fields.map(x => x.name);

const FieldName = ({ required }) => (
  <FieldGroup name="nameGroup" required={required} fields={fieldNames}>
    {fields.map(({ name, size }) => <Field key={name} name={name} size={size} />)}
  </FieldGroup>
);

FieldName.validate = values => validateAll(values)(fieldNames);

export default FieldName;
