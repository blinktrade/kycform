import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';

const name = 'photoId';

const FieldPhotoID = ({ required }) => (
  <FieldGroup name="photoIdGroup" required={required} fields={[name]}>
    <Field
      size={6}
      type="file"
      name={name}
    />
  </FieldGroup>
);

FieldPhotoID.validate = values => validateAll(values)([name]);

export default FieldPhotoID;
