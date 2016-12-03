import R from 'ramda';

export const validateAll = values => R.compose(
  R.mergeAll,
  R.map(field => (!values[field] ? ({ [field]: 'error.required' }) : {}))
);
