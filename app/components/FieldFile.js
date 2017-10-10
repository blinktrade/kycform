/* @flow */
import React from 'react';

type Props = {
  input: any,
};

const FieldFile = ({ input }: Props) => {
  const handeOnChange = (e) => {
    const { onChange } = input;
    onChange(e.target.files[0]);
  };

  return (
    <input
      type="file"
      value={input.value}
      onChange={handeOnChange}
      multiple
    />
  );
};

export default FieldFile;
