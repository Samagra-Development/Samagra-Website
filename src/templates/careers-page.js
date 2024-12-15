import React, { useEffect } from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import {MediaRoll} from "../components/MediaRoll";
import CareerBannerImage from "../components/CareerPageComponents/CareerBannerImage/CareerBanner";
import CareerSectionSecond from "../components/CareerPageComponents/CareerSectionSecond/CareerSectionSecond";
import CareerSectionThird from "../components/CareerPageComponents/CareerSectionThird/CareerSectionThird";
import TestimonialSlider from "../components/CareerPageComponents/TestimonialSlider/TestimonialSlider";
import PaginationSlider from "../components/CareerPageComponents/PaginationSlider/PaginationSlider";
import CareerSectionFifth from "../components/CareerPageComponents/CareerSectionFifth/CareerSectionFifth";

export const CareerPagePreviewTemplate = ({careerPageContent}) => {
    
    return (
        <React.Fragment>
            <CareerBannerImage bannerContent={careerPageContent}/>
            <CareerSectionSecond content={careerPageContent}/>
            <CareerSectionThird content={careerPageContent}/>
            <TestimonialSlider content={careerPageContent}/>
            <PaginationSlider content={careerPageContent}/>
            <CareerSectionFifth content={careerPageContent}/>
        </React.Fragment>
    )
};

const MediaPage = ({data}) => {
    const {markdownRemark: careerPageContent} = data;
    return (
        <Layout>
            <CareerPagePreviewTemplate careerPageContent={careerPageContent.frontmatter}/>
        </Layout>
    )
};

export default MediaPage
export const mediaPageQuery = graphql`
  query CareersPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "careers-page" } }) {
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
        mainContent2 {
            title
            text
        }
        apply {
            applyLink
            show
        }
        philosophy {
            title
            sectionOne {
                image {
                    childImageSharp {
                        fluid(maxWidth: 640, quality: 64) {
                          ...GatsbyImageSharpFluid
                        }
                    }
                }
                title
                description
            }
            sectionTwo {
                image {
                    childImageSharp {
                        fluid(maxWidth: 640, quality: 64) {
                          ...GatsbyImageSharpFluid
                        }
                    }
                }
                title
                description
            }
            sectionThree {
                image {
                    childImageSharp {
                        fluid(maxWidth: 640, quality: 64) {
                          ...GatsbyImageSharpFluid
                        }
                    }
                }
                title
                description
            }
            sectionFour {
                image {
                    childImageSharp {
                        fluid(maxWidth: 1440, quality: 100) {
                          ...GatsbyImageSharpFluid
                        }
                    }
                }
                title
                description
            }
        }
        faq {
            question
            answer
        }
        roles {
            title
            youtube1 {
            link
            show
            }
            youtube2 {
            link
            show
            }
            joinus {
               joinUsLink
               show
            }
            items {
                title
                description
            }
        }
        slides {
            image {
                childImageSharp {
                    fluid(maxWidth: 1440, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
            text
        }

      }
    }
  }
`;
