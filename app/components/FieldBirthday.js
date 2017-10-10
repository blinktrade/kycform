/* @flow */
import React from 'react';

import R from 'ramda';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';
import type { Required } from '../utils/types';

const months = [
  { value: '01', option: 'January' },
  { value: '02', option: 'February' },
  { value: '03', option: 'March' },
  { value: '04', option: 'April' },
  { value: '05', option: 'May' },
  { value: '06', option: 'June' },
  { value: '07', option: 'July' },
  { value: '08', option: 'August' },
  { value: '09', option: 'September' },
  { value: '10', option: 'October' },
  { value: '11', option: 'November' },
  { value: '12', option: 'December' },
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

const FieldBirthday = ({ required }: Required) => {
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
