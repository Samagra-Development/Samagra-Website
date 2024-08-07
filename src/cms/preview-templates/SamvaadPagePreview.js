import PropTypes from "prop-types";
import React from "react";
import { SamvaadPage } from "../../templates/samvaad-page";
const SamvaadPagePreview = ({entry, getAsset}) => {
    const data = entry.getIn(['data']).toJS();
    if (data) {
        return (
            <SamvaadPage content={data}/>
        )
    } else {
        return <div>Loading...</div>
    }
};

SamvaadPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func
    }),
    widgetFor: PropTypes.func
};

export default SamvaadPagePreview;
