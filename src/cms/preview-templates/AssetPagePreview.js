import React from 'react'
import PropTypes from 'prop-types'
import { AssetPageTemplate } from '../../templates/our-assets-page';

const AssetPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <AssetPageTemplate
        data={data}
      />
    )
  } else {
    return <div>Loading...</div>
  }
};

AssetPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default AssetPagePreview
