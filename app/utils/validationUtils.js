import R from 'ramda';

export const validateForm = R.curry((values, fields) => R.compose(
  R.mergeAll,
  R.values,
  R.map(x => x(values))
)(fields));

export const validateAll = values => R.compose(
  R.mergeAll,
  R.map(field => (!values[field] ? ({ [field]: 'error.required' }) : {}))
);
