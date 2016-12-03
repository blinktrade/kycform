import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

const FieldPhotoBill = ({ required }) => (
  <FieldGroup name="photoBillGroup" required={required}>
    <Field
      size={6}
      type="file"
      name="photoBill"
    />
  </FieldGroup>
);

export default FieldPhotoBill;
