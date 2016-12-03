import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

const name = 'select';

const FieldSelect = ({ required, groupName, data }) => (
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

FieldSelect.propTypes = {
  data: React.PropTypes.array,
};

FieldSelect.validate = (values) => {
  const errors = {};
  if (!values.select) {
    errors.select = 'required';
  }
  return errors;
};

export default FieldSelect;
