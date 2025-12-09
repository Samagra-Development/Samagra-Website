import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

// New schema components
import { HeroSection, WhyImportantSection, ProgramHighlightsSection, ImpactSection, PartnersSection } from "../components/ProductPageComponents/newComp/newComp";

// Old schema components
import ProductBannerImage from "../components/ProductPageComponents/ProductBannerImage/ProductBannerImage";
import { ProductPageSecondSection } from "../components/ProductPageComponents/ProductPageSecondSection/ProductPageSecondSection";
import { ProductPageKeyInitiatives } from "../components/ProductPageComponents/ProductPageKeyInitiatives/ProductPageKeyInitiatives";
import { OurImpactSection } from "../components/ProductPageComponents/OurImpactSection/OurImpactSection";

// Shared component
import OurPublicationsSection from "../components/ProductPageComponents/OurPublicationsSection/OurPublicationsSection";

// Old schema partners component
const OurPartnersSection = ({ partners }) => {
  if (!partners || partners?.length === 0) {
    return null;
  }

  return (
    <div className="partners-section">
      <h2 className="partners-heading">Our Partners</h2>
      <div className="partners-container">
        {partners?.map((partner, index) => (
          <div key={index} className="partner-item">
            <img
              src={partner?.logo?.childImageSharp?.fluid?.src}
              alt={"partner-logo"}
              className="partner-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectPostTemplate = ({ project }) => {
  // Check if this is a new schema project (has heroSection)
  const isNewSchema = project.heroSection.isVisible;

  return (
    <section>
      {isNewSchema ? (
        // New schema rendering
        <>
          {project.heroSection && project.heroSection.isVisible && <HeroSection {...project.heroSection} />}
          {project.whyImportantSection && project.whyImportantSection.isVisible && <WhyImportantSection {...project.whyImportantSection} />}
          {project.programHighlightsSection && project.programHighlightsSection.isVisible && <ProgramHighlightsSection {...project.programHighlightsSection} />}
          {project.impactSection && project.impactSection.isVisible && (
            <ImpactSection 
              title={project.impactSection.title}
              backgroundImage={project.impactSection.backgroundImage}
              stats={project.impactSection.stats?.isVisible ? project.impactSection.stats.items : []}
              testimonials={project.impactSection.testimonials?.isVisible ? project.impactSection.testimonials.items : []}
            />
          )}
          {project.partnersSection && project.partnersSection.isVisible && <PartnersSection {...project.partnersSection} />}
        </>
      ) : (
        // Old schema rendering (Past Programs)
        <>
          <ProductBannerImage project={project} />
          <ProductPageSecondSection project={project} />
          {project.keyInitiatives && project.keyInitiatives.length > 0 && (
            <ProductPageKeyInitiatives project={project} />
          )}
          {project.ourImpact && project.ourImpact.length > 0 && (
            <OurImpactSection data={project.ourImpact} />
          )}
          {project?.partners && project?.partners?.length > 0 && (
            <OurPartnersSection partners={project?.partners} />
          )}
        </>
      )}
      
      {/* Shared section for both schemas */}
      {project?.readMore && project?.readMore?.length > 0 && (
        <OurPublicationsSection
          readMore={project.readMore}
          projectId={project.id}
        />
      )}
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
        title
        domainNew
        id
        domain
        subTitle
        state
        tagLine
        readMore {
          text
        }
        keyInitiativesTitle
        backgroundCover {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        ourImpact {
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description 
          subTitle
          link
        }
        partners {
          logo {
            childImageSharp {
              fluid(maxWidth: 240, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        projectLogoWithState {
          childImageSharp {
            fluid(maxWidth: 240, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        approach {
          text
        }
        overview {
          text
        }
        scale {
          count
          label
        }
        impact {
          count
          label
        }
        projectMiddleBannerImage {
          childImageSharp {
            fluid(maxWidth: 1440, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        keyInitiatives {
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
          }
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
            isVisible
            items {
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
          }
          testimonials {
            isVisible
            items {
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