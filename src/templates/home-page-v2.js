import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import StickyIcon from "../components/HomeComponents/StickyIcon";
import SectionDivider from "../components/HomeComponents/SectionDivider";
import { animateScroll as scroll } from "react-scroll";
import LinkedIn from "../img/linkedIn-icon.png"
import OurMissionSection from "../components/HomeComponents/OurMission";
import OurModelSection  from "../components/HomeComponents/OurModel";
import OurWorkSection from "../components/HomeComponents/OurWork";
import OurJourneySection from "../components/HomeComponents/OurJourney";
import  NewsSection  from "../components/HomeComponents/NewsSection";
import OurApproach from "../components/HomeComponents/OurApproach";

export const HomePageTemplate = ({ parentDomains, data }) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(()=>true);
      } else {
        setMobile(()=>false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 3000, // Optional: animation duration in milliseconds
    });
  };

  return (
    <div id="home-page-font">
      {data ? (
        <React.Fragment>
          <OurMissionSection data={data}/>
          <OurModelSection homeContent={data} isMobile={mobile}/>
          <OurApproach homeContent={data} isMobile={mobile}/>
        </React.Fragment>
      ) : (
        <span />
      )}
      {data?.ourWork ? (
        <OurWorkSection workContent={data} isMobile={mobile}/>
      ) : (
        <span />
      )
      }
      <div style={{margin:"6.5vh",display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column",gap:"24px",textAlign:"center"}}><div className="our-model-description">For the latest updates related to our work</div>
      <button style={{background: "#0076B2", borderRadius:"10px",padding:"8px 16px", border:"none",display:"flex",justifyContent:"center",alignItems:"center",gap:"8px"}}
      onClick={()=>{
        window.location.href="https://www.linkedin.com/company/samagra-transforming-governance/"
      }}><img src={LinkedIn} alt="linkedIn" width={mobile?"24px":"36px"} height={mobile?"24px":"36px"}/><span className="our-model-sub-heading" style={{paddingBottom:"0",color:"#ffffff",fontSize:mobile&&"18px"}}>Follow us on LinkedIn</span></button></div>
      <SectionDivider />
      <OurJourneySection content={data}/>
      <NewsSection />
      {!mobile && <StickyIcon scrollToBottom={scrollToBottom} />}
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
        <HomePageTemplate
          parentDomains={this.state.domains}
          data={frontmatter}
        />
      </Layout>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query HomePageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "home-page-v2" } }) {
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
        ourJourney {
          subHeading
          description
          image {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
