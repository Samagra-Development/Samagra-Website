import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import AssetCard from "../components/OurAssetComponents/AssetCard";
import { Helmet } from "react-helmet";

export const AssetPageTemplate = ({ data }) => {
  return (
    <div>
      <Helmet>
        <link
          rel="prefetch"
          href={data?.bannerImage?.childImageSharp?.fluid?.src}
        />
      </Helmet>
      <div id="our-assets">
        <div className={"base-banner-image"}>
          <img
            src={
              data?.bannerImage?.childImageSharp
                ? data?.bannerImage?.childImageSharp?.fluid?.src
                : data?.bannerImage
            }
            width={"100%"}
            alt="assetImage"
            className="banner-image"
          />
          <div className={"slider-content"}>
            <div className={`title`}>{data?.title}</div>
          </div>
        </div>
        <div className="description text-center blact-text-2">
          {data?.description}
        </div>
        <div className="card-section">
          <div className="card-container">
            <AssetCard
              data={data?.assetCard1}
              style={{ borderTopLeftRadius: "6px" }}
            />
            <AssetCard
              data={data?.assetCard2}
              style={{ borderTopRightRadius: "6px" }}
            />
            <AssetCard
              data={data?.assetCard3}
              style={{ borderBottomLeftRadius: "6px" }}
            />
            <AssetCard
              data={data?.assetCard4}
              style={{ borderBottomRightRadius: "6px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AssetsPage = ({ data }) => {
  const { markdownRemark } = data;

  return (
    <Layout>
      <AssetPageTemplate data={markdownRemark.frontmatter} />
    </Layout>
  );
};

AssetsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AssetsPage;

export const assetsPageQuery = graphql`
  query AssetsPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "our-assets-page" } }) {
      frontmatter {
        title
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        assetCard1 {
          description
          buttonLink
          buttonText
          readMoreButtonActive
          icon {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        assetCard2 {
          buttonLink
          buttonText
          icon {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
          readMoreButtonActive
        }
        assetCard3 {
          buttonLink
          buttonText
          icon {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
          readMoreButtonActive
        }
        assetCard4 {
          buttonLink
          buttonText
          icon {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
          readMoreButtonActive
        }
      }
    }
  }
`;
