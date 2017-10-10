/* @flow */
import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

const name = 'select';

type Props = {
  required: boolean,
  groupName: string,
  data: Array<any>,
};

const FieldSelect = ({ required, groupName, data }: Props) => (
  <FieldGroup name={groupName} fields={[name]} required={required}>
    <Field
      name={name}
      component="select"
      data={data}
      size={5}
      renderSubLabel={false}
    />
  </FieldGroup>
);

FieldSelect.validate = (values) => {
  const errors = {};
  if (!values.select) {
    errors.select = 'required';
  }
  return errors;
};

export default FieldSelect;
