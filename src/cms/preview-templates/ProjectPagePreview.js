import {BlogPostTemplate} from "../../templates/blog-post";
import PropTypes from "prop-types";
import React from "react";
import {ProjectPostTemplate} from "../../templates/project-post";
const ProjectPagePreview = ({entry, getAsset}) => {
    const data = entry.getIn(['data']).toJS()
    if (data) {
        return (
            <ProjectPostTemplate
                project={data}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

ProjectPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func
    }),
    widgetFor: PropTypes.func
};

export default ProjectPagePreview;