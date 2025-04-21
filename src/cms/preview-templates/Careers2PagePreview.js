import {BlogPostTemplate} from "../../templates/blog-post";
import PropTypes from "prop-types";
import React from "react";
import {ProjectPostTemplate} from "../../templates/project-post";

import { Career2PagePreviewTemplate } from "../../templates/careers2-page";
const Career2PagePreview = ({entry, getAsset}) => {
    const data = entry.getIn(['data']).toJS();
    if (data) {
        return (
            <Career2PagePreviewTemplate careerPageContent={data}/>
        )
    } else {
        return <div>Loading...</div>
    }
};

Career2PagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func
    }),
    widgetFor: PropTypes.func
};

export default Career2PagePreview;
