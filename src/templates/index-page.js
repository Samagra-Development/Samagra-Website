import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SectionDivider from "../components/HomeComponents/SectionDivider";
import { animateScroll as scroll } from "react-scroll";
import OurMissionSection from "../components/HomeComponents/OurMission";
import OurModelSection from "../components/HomeComponents/OurModel";
import OurWorkSection from "../components/HomeComponents/OurWork";
import OurJourneySection from "../components/HomeComponents/OurJourney";
import NewsSection from "../components/HomeComponents/NewsSection";
import OurApproach from "../components/HomeComponents/OurApproach";
import upIcon from "../img/up-icon.png";

export const HomePageTemplate = ({ data }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(() => true);
      } else {
        setMobile(() => false);
      }
    };
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleScroll = () => {
    if (window && window.scrollY > window.screen.height) {
      setShowUpIcon(true);
    } else setShowUpIcon(false);
  };

  return (
    <div>
      <Helmet>
        <link rel="prefetch" href={data?.baseBannerVideo?.publicURL} />
        <link
          rel="prefetch"
          href={
            data?.ourWork[0]?.workLogo[0]?.logo?.childImageSharp?.fluid?.src
          }
        />
        <link
          rel="prefetch"
          href={
            data?.ourWork[0]?.workLogo[1]?.logo?.childImageSharp?.fluid?.src
          }
        />
        <link
          rel="prefetch"
          href={data?.ourWork[0]?.backgroundMap?.childImageSharp?.fluid?.src}
        />
        <link
          rel="prefetch"
          href={
            data?.ourWork[1]?.workLogo[0]?.logo?.childImageSharp?.fluid?.src
          }
        />
        <link
          rel="prefetch"
          href={data?.ourWork[1]?.backgroundMap?.childImageSharp?.fluid?.src}
        />
        <link
          rel="prefetch"
          href={
            data?.ourWork[2]?.workLogo[0]?.logo?.childImageSharp?.fluid?.src
          }
        />
        <link
          rel="prefetch"
          href={data?.ourWork[2]?.backgroundMap?.childImageSharp?.fluid?.src}
        />
        <link
          rel="prefetch"
          href={
            data?.ourWork[3]?.workLogo[0]?.logo?.childImageSharp?.fluid?.src
          }
        />
        <link
          rel="prefetch"
          href={data?.ourWork[3]?.backgroundMap?.childImageSharp?.fluid?.src}
        />
      </Helmet>
      <div id="home-page-font">
        {data ? (
          <React.Fragment>
            <OurMissionSection data={data} />
            <OurModelSection homeContent={data} />
            <OurApproach homeContent={data} />
          </React.Fragment>
        ) : (
          <span />
        )}
        {data?.ourWork ? (
          <OurWorkSection workContent={data} isMobile={mobile} />
        ) : (
          <span />
        )}
        <SectionDivider />
        <OurJourneySection content={data} />
        <NewsSection />
        {!mobile && showUpIcon && (
          <div className={"up-icon"}>
            <img src={upIcon} onClick={scrollToTop} />
          </div>
        )}
        {/* {!mobile && <StickyIcon scrollToBottom={scrollToBottom} />} */}
      </div>
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
            icon {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
        ourWork {
          title
          description
        }
        ourWorkCard {
          titleLines {
            text
          }
          projectName {
            project
            learnButtonText
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
        linkedInButtonActive
        ourJourneyTitle
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
