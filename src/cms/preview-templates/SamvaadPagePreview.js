import PropTypes from "prop-types";
import React from "react";
import { SamvaadPagePreviewTemplate } from "../../templates/samvaad-page";
const SamvaadPagePreview = ({entry, getAsset}) => {
    const data = entry.getIn(['data']).toJS();
    if (data) {
        return (
            <SamvaadPagePreviewTemplate post={data}/>
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
