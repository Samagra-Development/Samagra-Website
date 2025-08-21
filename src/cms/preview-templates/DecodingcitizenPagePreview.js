import React from 'react'
import PropTypes from 'prop-types'
import { DecodingCitizenPage } from '../../templates/decoding-citizen-page';


const DecodingcitizenPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
      <DecodingCitizenPage
        data={data}
      />
    )
  } else {
    return <div>Loading...</div>
  }
};

DecodingcitizenPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default DecodingcitizenPagePreview
