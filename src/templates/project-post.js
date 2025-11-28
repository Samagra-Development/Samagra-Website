import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HeroSection, WhyImportantSection, ProgramHighlightsSection, ImpactSection, PartnersSection } from "../components/ProductPageComponents/newComp/newComp";
import OurPublicationsSection from "../components/ProductPageComponents/OurPublicationsSection/OurPublicationsSection";

export const ProjectPostTemplate = ({ project }) => {
  return (
    <section>
     {project.heroSection && project.heroSection.isVisible && <HeroSection {...project.heroSection} />}
     {project.whyImportantSection && project.whyImportantSection.isVisible && <WhyImportantSection {...project.whyImportantSection} />}
     {project.programHighlightsSection && project.programHighlightsSection.isVisible && <ProgramHighlightsSection {...project.programHighlightsSection} />}
     {project.impactSection && project.impactSection.isVisible && <ImpactSection {...project.impactSection} />}
     {project.partnersSection && project.partnersSection.isVisible && <PartnersSection {...project.partnersSection} />}
     {/* {project?.readMore && project?.readMore?.length > 0 && (
       <OurPublicationsSection
         readMore={project.readMore}
         projectId={project.id}
       />
     )} */}
    </section>
  );
};

const ProjectPost = ({ data }) => {
  const { markdownRemark: item } = data;
  const project = item.frontmatter;
  return project && project.title ? (
    <Layout>
      <ProjectPostTemplate project={project} />
    </Layout>
  ) : (
    <React.Fragment />
  );
};

export default ProjectPost;

export const pageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        domainNew
        title
        id
        readMore {
          text
        }
        heroSection {
          title
          subtitle
          description
          categories
          backgroundImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          isVisible
        }
        whyImportantSection {
          title
          backgroundImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          isVisible
          infoCard {
            title
            description
          }
          items {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 640, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
        }
        programHighlightsSection {
          title
          backgroundImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          isVisible
          highlights {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 640, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
        }
        impactSection {
          title
          backgroundImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          isVisible
          stats {
            value
            label
            image {
              childImageSharp {
                fluid(maxWidth: 200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
          testimonials {
            quote
            name
            title
            image {
              childImageSharp {
                fluid(maxWidth: 200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
        }
        partnersSection {
          title
          isVisible
          partners {
            name
            logo {
              childImageSharp {
                fluid(maxWidth: 240, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;