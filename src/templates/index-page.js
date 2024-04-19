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
import LinkedIn from "../img/linkedIn-icon.png"

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
          <OurMissionSection data={data}/>
          <SectionDivider />
          <OurModelSection homeContent={data} />
        </React.Fragment>
      ) : (
        <span />
      )}
      <OurWorkSection workContent={data}/>
      <div style={{marginBottom:"85px",display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column",gap:"16px"}}><div style={{textAlign:"center", fontSize:"28px"}}>For the latest updates related to our work</div>
      <button style={{background: "#0076B2",color:"#ffffff", borderRadius:"8px",padding:"8px 16px", border:"none", fontSize:"28px",display:"flex",justifyContent:"center",alignItems:"center",gap:"8px"}}
      onClick={()=>{
        window.location.href="https://www.linkedin.com/company/samagra-transforming-governance/"
      }}><img src={LinkedIn} alt="linkedIn" width={"36px"} height={"36px"}/><span>Follow us on LinkedIn</span></button></div>
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
        baseBannerVideo {
          publicURL
        }
        ourMission {
          title
          description
        }
        ourModel {
          title
          description {
            subTitle
            text
          }
          ourModelVideoLink
        }
        ourApproach {
          title
          description
          approachVideo {
            publicURL
          }
        }
        ourWorkDescription
        ourWork {
          titleLines {
            text
          }
          projectName {
            project
          }
          description1
          image {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          workLogo {
            logo {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          backgroundMap {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description2
        }
      }
    }
  }
`;
