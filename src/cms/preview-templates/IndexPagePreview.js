import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <HomePageTemplate
        data={data}
      />
    )
  } else {
    return <div>Loading...</div>
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default IndexPagePreview
