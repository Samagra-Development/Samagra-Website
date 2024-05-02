import React from 'react'
import PropTypes from 'prop-types'
import { HomeLegacyPageTemplate } from '../../templates/home-legacy.js'

const HomeLegacyPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <HomeLegacyPageTemplate
        data={data}
      />
    )
  } else {
    return <div>Loading...</div>
  }
};

HomeLegacyPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default HomeLegacyPreview
