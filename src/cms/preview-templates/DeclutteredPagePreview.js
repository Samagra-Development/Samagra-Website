import React from 'react'
import PropTypes from 'prop-types'
import { DeclutteredPageTemplate } from '../../templates/decluttered-page';

const DeclutteredPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <DeclutteredPageTemplate
        data={data}
      />
    )
  } else {
    return <div>Loading...</div>
  }
};

DeclutteredPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default DeclutteredPagePreview
