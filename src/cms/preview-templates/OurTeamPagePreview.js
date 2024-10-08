import React from "react";
import PropTypes from "prop-types";
import { OurTeamPage } from "../../templates/our-team";

const OurTeamPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <OurTeamPage
      data={{
        markdownRemark: {
          frontmatter: data,
        },
      }}
    />
  );
};
OurTeamPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default OurTeamPagePreview;
