import React from 'react';

const SectionDivider = ({color}) => {
  return (
    <div
        style={{
          height: '1px',
          width: '75px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderImage: `linear-gradient(to left, ${color} , #FFE81D) 1`,
          margin: '75px auto',
        }}></div>
  );
};

export default SectionDivider