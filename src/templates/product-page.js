import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ProductBannerImage from "../components/ProductPageComponents/ProductBannerImage/ProductBannerImage";
import { ProductPageSecondSection } from "../components/ProductPageComponents/ProductPageSecondSection/ProductPageSecondSection";
import { ProductPageKeyInitiatives } from "../components/ProductPageComponents/ProductPageKeyInitiatives/ProductPageKeyInitiatives";
import { OurPublicationsSection } from "../components/ProductPageComponents/OurPublicationsSection/OurPublicationsSection";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      media: [],
    };
  }

  render() {
    const { project, media } = this.state;
    return project && project.title ? (
      <Layout>
        <ProductBannerImage project={project} />
        <ProductPageSecondSection project={project} />
        <ProductPageKeyInitiatives project={project} />
        <OurPublicationsSection media={media} />
      </Layout>
    ) : (
      <React.Fragment />
    );
  }
}

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPageId($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
