import React from 'react';

const SectionDivider = () => {
  return (
    <div
        style={{
          height: '1px',
          width: '75px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderImage: 'linear-gradient(to left, #418F37, #FFE81D) 1',
          margin: '75px auto',
        }}></div>
  );
};

export default SectionDivider