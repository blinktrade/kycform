/* @flow */
import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';
import type { Required } from '../utils/types';

const fields = [
  { name: 'countryCode', size: 1 },
  { name: 'areaCode', size: 1 },
  { name: 'number', size: 4 },
];

const fieldNames = fields.map(x => x.name);

const FieldPhoneNumber = ({ required }: Required) => {
  const renderField = ({ name, size }, index) => {
    const separator = index !== 2;
    return (
      <Field
        key={name}
        name={name}
        size={size}
        renderSeparator={separator}
      />
    );
  };

  return (
    <FieldGroup name="phoneNumberGroup" required={required} fields={fieldNames}>
      {fields.map(renderField)}
    </FieldGroup>
  );
};

FieldPhoneNumber.validate = values => validateAll(values)(fieldNames);

export default FieldPhoneNumber;
