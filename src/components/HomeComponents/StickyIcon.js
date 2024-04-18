import React from 'react';
import stickyIcon from '../../img/sticky-icon.png';
import '../../styles/HomeTopSlider.scss';

const StickyIcon = ({scrollToBottom}) => {
  return (
    <div className="sticky-icon-container">
      <div className="sticky-icon">
        <img src={stickyIcon} alt="Sticky Icon" onClick={scrollToBottom}/>
      </div>
    </div>
  );
};

export default StickyIcon;