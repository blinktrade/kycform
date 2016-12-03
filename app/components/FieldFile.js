import React from 'react';

const FieldFile = ({ input }) => {
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
