import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';

const name = 'photoSelf';

const FieldPhotoSelf = ({ required }) => (
  <FieldGroup name="photoSelfGroup" required={required} fields={[name]}>
    <Field
      size={6}
      type="file"
      name={name}
    />
  </FieldGroup>
);

FieldPhotoSelf.validate = values => validateAll(values)([name]);

export default FieldPhotoSelf;
