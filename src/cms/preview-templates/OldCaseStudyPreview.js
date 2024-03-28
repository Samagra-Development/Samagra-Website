
import PropTypes from 'prop-types';
import React from 'react';
import { OldCaseStudyTemplate } from '../../templates/old-case-study';

const OldCaseStudyPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <OldCaseStudyTemplate
        content={data}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

OldCaseStudyPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default OldCaseStudyPreview;
