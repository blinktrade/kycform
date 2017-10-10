/* @flow */
import React from 'react';

import R from 'ramda';
import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import countries from '../utils/countries';
import { validateAll } from '../utils/validationUtils';
import type { Required } from '../utils/types';

type FieldType = {
  name: string,
  size: number,
  component?: string,
  data?: Array<string>,
  selected?: string,
}

const fields: Array<Array<FieldType>> = [
  [{ name: 'address', size: 6 }],
  [{ name: 'address2', size: 6 }],
  [{ name: 'city', size: 4 },
   { name: 'state', size: 4 }],
  [{ name: 'zipcode', size: 4 },
    { name: 'country',
      size: 4,
      component: 'select',
      data: countries.map(x => x.name),
      selected: 'country',
    }],
];

const fieldNames = R.map(R.prop('name'), R.flatten(fields));

const FieldAddress = ({ required }: Required) => {
  const renderField = ({ name, size, component, data, selected }: FieldType, colspan: ?number) => (
    <td key={name} colSpan={colspan}>
      <Field
        name={name}
        size={size}
        data={data}
        selected={selected}
        component={component || 'input'}
      />
    </td>
  );

  const renderRow = (field, index) => {
    const colspan = field.length === 1 ? 2 : null;
    return (
      <tr key={index}>
        {field.map(item => renderField(item, colspan))}
      </tr>
    );
  };

  return (
    <FieldGroup name="addressGroup" required={required} fields={fieldNames}>
      <table>
        <tbody>
          {fields.map(renderRow)}
        </tbody>
      </table>
    </FieldGroup>
  );
};

FieldAddress.validate = values => validateAll(values)(fieldNames);

export default FieldAddress;
