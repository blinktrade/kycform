import React from 'react';

import R from 'ramda';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const year = new Date().getFullYear();

const days = R.range(1, 32);
const years = R.compose(
  R.reverse,
  R.range(1920),
  R.inc,
)(year);

const fields = [
  { name: 'day', size: 2, data: days },
  { name: 'month', size: 3, data: months },
  { name: 'year', size: 2, data: years },
];

const fieldNames = fields.map(x => x.name);

const FieldBirthday = ({ required }) => {
  const renderSelectField = ({ name, size, data }) => (
    <Field
      key={name}
      name={name}
      size={size}
      data={data}
      component="select"
    />
  );

  return (
    <FieldGroup name="birthdateGroup" required={required} fields={fieldNames}>
      {fields.map(renderSelectField)}
    </FieldGroup>
  );
};

FieldBirthday.validate = values => validateAll(values)(fieldNames);

export default FieldBirthday;
