/* @flow */
import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';
import type { Required } from '../utils/types';

const name = 'photoId';

type Props = {
  description?: string,
} & Required;

const FieldPhotoID = ({ required, description }: Props) => (
  <FieldGroup name="photoIdGroup" required={required} fields={[name]}>
    <Field
      size={6}
      type="file"
      name={name}
      description={description}
    />
  </FieldGroup>
);

FieldPhotoID.validate = values => validateAll(values)([name]);

export default FieldPhotoID;
