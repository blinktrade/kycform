/* @flow */
import React from 'react';

import Field from './FieldBase';
import FieldGroup from './FieldGroup';

import { validateAll } from '../utils/validationUtils';
import type { Required } from '../utils/types';

let fieldName;

type Props = {
  name: string,
} & Required;

const FieldNationalID = ({ required, name }: Props) => {
  fieldName = name;
  return (
    <FieldGroup name={`${name}Group`} required={required} fields={[name]}>
      <Field
        size={6}
        name={name}
      />
    </FieldGroup>
  );
};

FieldNationalID.validate = values => validateAll(values)([fieldName]);

export default FieldNationalID;
