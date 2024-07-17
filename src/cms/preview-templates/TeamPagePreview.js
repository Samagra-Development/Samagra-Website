import React from "react";
import PropTypes from "prop-types";
import { TeamPage } from "../../templates/team-page";

const TeamPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <TeamPage
      data={{
        markdownRemark: {
          frontmatter: data,
        },
      }}
    />
  );
};
TeamPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default TeamPagePreview;
