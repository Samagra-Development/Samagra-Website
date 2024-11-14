import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import backgroundImage from "../img/media-header-1.jpg";
import MediaRoll from "../components/MediaRoll";

export const MediaPagePreviewTemplate = ({ mediaPageContent }) => {
  return (
    <React.Fragment>
      <div className={"base-banner-image media-page-banner"}>
        <img
          alt="banner-image"
          src={backgroundImage}
          width={"100%"}
          className="banner-image"
        />
        <div className={"slider-content"}>
          <div className="title">{mediaPageContent.title}</div>
        </div>
      </div>
      <div className="media-section container">
        <MediaRoll />
      </div>
    </React.Fragment>
  );
};

const MediaPage = ({ data }) => {
  const { markdownRemark: mediaPageContent } = data;
  return (
    <Layout>
      <MediaPagePreviewTemplate
        mediaPageContent={mediaPageContent.frontmatter}
      />
    </Layout>
  );
};

export default MediaPage;
export const mediaPageQuery = graphql`
  query MediaPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "media-page" } }) {
      html
      frontmatter {
        title
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 640, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
