import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import HomeNewsSection from "../components/HomeComponents/HomeNewsSection/HomeNewsSection";
import StickyIcon from "../components/HomeComponents/StickyIcon";
import SectionDivider from "../components/HomeComponents/SectionDivider";
import { animateScroll as scroll } from "react-scroll";
import { OurModelSection } from "../components/HomeComponents/HomeSecondSection/OurModel";
import OurWorkSection from "../components/HomeComponents/HomeThirdSection/OurWork";
import OurMissionSection from "../components/HomeComponents/HomeTopSlider/OurMission";

export const IndexPageTemplate = ({ parentDomains, data }) => {
  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 3000, // Optional: animation duration in milliseconds
    });
  };

  return (
    <div id="home-page-font" style={{ fontFamily: "rubik" }}>
      {data ? (
        <React.Fragment>
          <OurMissionSection />
          <SectionDivider />
          <OurModelSection homeContent={data} />
        </React.Fragment>
      ) : (
        <span />
      )}
      <OurWorkSection />
      <SectionDivider />
      <HomeNewsSection />
      <StickyIcon scrollToBottom={scrollToBottom} />
    </div>
  );
};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domains: [],
    };
  }

  componentDidMount() {
    const self = this;
    if (window.localStorage.getItem("domains")) {
      const domains = [];
      JSON.parse(window.localStorage.getItem("domains")).forEach((d) => {
        domains.push({ ...d.node.frontmatter });
      });
      self.setState({ domains: JSON.parse(JSON.stringify(domains)) });
    }
  }

  render() {
    const { frontmatter } = this.props.data.markdownRemark;

    return (
      <Layout>
        <IndexPageTemplate
          parentDomains={this.state.domains}
          data={frontmatter}
        />
      </Layout>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        baseBanner {
          titleLines {
            text
          }
        }
        subBanners {
          projectName
          projectName2
          color
          titleLines {
            text
          }
          slides {
            image {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            logo {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
          }
        }
        secondSection {
          title
          ourApproach {
            title
            description {
              text
              subTitle
            }
            image {
              childImageSharp {
                fluid(maxWidth: 640, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          ourModel {
            image {
              childImageSharp {
                fluid(maxWidth: 640, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            description {
              text
              subTitle
            }
          }
        }
      }
    }
  }
`;
