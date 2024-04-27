import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/home-page-v2';

const HomePageV2Preview = ({ entry, getAsset }) => {
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

HomePageV2Preview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default HomePageV2Preview
