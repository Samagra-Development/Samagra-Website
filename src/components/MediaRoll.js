import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { PrimaryButton } from "./PrimaryButton/PrimaryButton";

class MediaRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { allMarkdownRemark: mediaPageContent } = data;
    const media = mediaPageContent.edges;
    return (
      <div className={"row"}>
        {media.map((m) => {
          return <MediaRollItem data={m.node.frontmatter} />;
        })}
      </div>
    );
  }
}

export const MediaRollItem = ({ data }) => {
  return (
    <a href={data.link} target="_blank" className="col-sm-6 col-xs-12">
      <div className="blog-wrapper">
        <div
          className="image-wrapper"
          style={{
            backgroundImage: `url(${
              !!(data.image && data.image.childImageSharp)
                ? data.image.childImageSharp.fluid.src
                : data.image
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="content-wrapper">
          <div className="heading" style={{ minHeight: "48px" }}>
            {data.title}
          </div>
          <div className="posted-on">
            {data.mediaHouse} on {data.date}
          </div>

          <div className="read-more">Read More</div>
        </div>
      </div>
    </a>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query MediaRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "media-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                projectId
                author
                id
                link
                displayOnHomePage
                mediaHouse
                image {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                date(formatString: "MMMM DD, YYYY")
                linkButtonText
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MediaRoll data={data} count={count} />}
  />
);
