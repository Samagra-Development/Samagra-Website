import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import CareerBannerImage from "../components/CareerPageComponents/CareerBannerImage/CareerBanner";
import CareerSectionSecond from "../components/CareerPageComponents/CareerSectionSecond/CareerSectionSecond";
import CareerSectionThird from "../components/CareerPageComponents/CareerSectionThird/CareerSectionThird";
import TestimonialSlider from "../components/CareerPageComponents/TestimonialSlider/TestimonialSlider";
import PaginationSlider from "../components/CareerPageComponents/PaginationSlider/PaginationSlider";
import CareerSectionFifth from "../components/CareerPageComponents/CareerSectionFifth/CareerSectionFifth";
import JourneySoFar from '../components/journeySofar';
import SolutionsBuilt from '../components/solutionsBuilt';
import AppList from '../components/appList';


export const Career2PagePreviewTemplate = ({careerPageContent}) => {
    
    return (
        <React.Fragment>
            <CareerBannerImage bannerContent={careerPageContent}/>
            {/* Uncomment these if needed
            <CareerSectionSecond content={careerPageContent}/>
            <CareerSectionThird content={careerPageContent}/>
            <TestimonialSlider content={careerPageContent}/>
            <PaginationSlider content={careerPageContent}/>
            <CareerSectionFifth content={careerPageContent}/> */}

            <div style={{
                fontWeight: "400", 
                fontSize: "28px", 
                lineHeight: "39px", 
                maxWidth:"1200px",
                marginInline: "auto",
                letterSpacing: "0.48px", 
                textAlign: 'center', 
                padding: "40px 20px",
                color: "#676767"
            }}>
                At Samagra, a key element of our approach is the appropriate use of technology and data to drive the large-scale implementation of our solutions. SamagraX serves as the thought partner, enabling and empowering our program teams by guiding and supporting initiatives in product design and technology management.
            </div>
            
            {/* Using new SolutionsBuilt component */}
            <SolutionsBuilt solutions={careerPageContent?.solutions_built} />
            
            {/* Using new AppList component */}
            <AppList section3={careerPageContent?.section3} />
            
           
            
            <JourneySoFar journeyData={careerPageContent.journeySoFar}/>
        </React.Fragment>
    )
};

const MediaPage = ({data}) => {
    const {markdownRemark: careerPageContent} = data;
    return (
        <Layout>
            <Career2PagePreviewTemplate careerPageContent={careerPageContent.frontmatter}/>
        </Layout>
    )
};

export default MediaPage
export const mediaPageQuery = graphql`
  query Careers2PageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "careers2-page" } }) {
      html
      frontmatter {
        title
        bannerImage {
           childImageSharp {
            fluid(maxWidth: 1440, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        centerBanner {
           image {
            childImageSharp {
                fluid(maxWidth: 1440, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
           }
        }
        mainContent {
            text
        }
        solutions_built {
            image {
                childImageSharp {
                    fluid(maxWidth: 1440, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
            text
            subText
            knowMoreLink
        }
        section3 {
            description
            appList {
            image {
                childImageSharp {
                    fluid(maxWidth: 1440, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
            text
            subText
            applink
          }
        }
        journeySoFar {
            text
            subText
            image {
                childImageSharp {
                    fluid(maxWidth: 1440, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }
      }
    }
  }
`;