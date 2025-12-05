import React, { useState } from 'react';

import { PrimaryButton } from '../../PrimaryButton/PrimaryButton';
import { graphql, StaticQuery } from 'gatsby';
import Swiper from 'react-id-swiper';

export const HomeThirdSectionContent = ({
  parentDomains,
  data,
  previewData,
}) => {
  const { edges: projectData } = previewData
    ? previewData.allMarkdownRemark
    : data.allMarkdownRemark;
  
  let items = [];
  
  projectData.forEach((project) => {
    const domainName = project.node.frontmatter['domainNew'];
    const firstCategory = project.node.frontmatter.heroSection?.categories?.[0] || 'Uncategorized';
    
    project.projectUrl = project.node.fields.slug;
    
    // Find if domain exists
    let domainFound = items.find(domain => domain.name === domainName);
    
    if (!domainFound) {
      // Check if this domain should be displayed
      const parentDomain = parentDomains.find(
        pD => pD.title === domainName && 
        (pD.displayOnHomeSlider === true || pD.displayOnHomeSlider === 'true')
      );
      
      if (parentDomain) {
        domainFound = {
          name: domainName,
          activeProjectIndex: 0,
          displayOrder: parentDomain.displayOrder,
          categories: []
        };
        items.push(domainFound);
      }
    }
    
    if (domainFound) {
      // Find or create category within domain
      let categoryFound = domainFound.categories.find(cat => cat.name === firstCategory);
      
      if (!categoryFound) {
        categoryFound = {
          name: firstCategory,
          projects: []
        };
        domainFound.categories.push(categoryFound);
      }
      
      // Add project to category
      categoryFound.projects.push(project);
      
      // Sort projects within category by title
      categoryFound.projects.sort((a, b) => 
        b.node.frontmatter.title > a.node.frontmatter.title ? -1 : 1
      );
    }
  });
  
  // Sort items by display order
  items.sort((a, b) => b.displayOrder > a.displayOrder ? -1 : 1);
  
  const [activeItem, setActiveItem] = useState(0);
  
  // Flatten all projects for swiper
  let projects = [];
  items.forEach((domain) => {
    domain.categories.forEach((category) => {
      projects = [...projects, ...category.projects];
    });
  });

  const [stateItems, setStateItems] = useState(
    JSON.parse(JSON.stringify(items))
  );

  let swiperInstance;
  let swiperTitleInstance;
  
  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: 'home-domain-page-indicator',
      bulletActiveClass: 'home-domain-page-indicator-active',
      clickableClass: 'home-domain-bullets',
    },
    on: {
      init: () => {},
      slideChange: (d) => {
        if (swiperInstance) {
          if (swiperTitleInstance) {
            let titleIndex = 0;
            items.forEach((item, index) => {
              if (
                item.name ===
                projects[swiperInstance.activeIndex].node.frontmatter.domain
              ) {
                titleIndex = index;
              }
            });
            setTimeout(() => {
              swiperTitleInstance.slideTo(titleIndex);
            }, 100);
          }
        }
      },
    },
  };

  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  const [paramsTitle, setParamsTitle] = useState({
    on: {},
    initialSlide: 0,
  });

  const ImageCard = ({
    imageUrl,
    heading,
    subHeading,
    classes,
    styles,
    href,
    href2,
    readMoreText = 'Read More',
    readMoreText2,
    bgColor,
  }) => {
    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { r, g, b };
    }
    
    return (
      <div style={{ margin: '5px' }}>
        <div
          className={`${classes ? classes : ''} text-white w-100 d-flex flex-wrap`}
          style={{
            position: 'relative',
            overflow: 'hidden',
            ...styles,
          }}>
          <img
            className="homepage-imagecard"
            src={
              !!imageUrl.childImageSharp
                ? imageUrl.childImageSharp.fluid.src
                : imageUrl
            }
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              transition: 'transform 0.2s ease',
            }}
          />
          <div
            className="align-self-end"
            style={{
              background: `rgba(${hexToRgb(bgColor).r}, ${hexToRgb(bgColor).g}, ${hexToRgb(bgColor).b}, 0.7)`,
              position: 'absolute',
              zIndex: 2,
              width: '100%',
              padding: '5px 10px',
            }}>
            <div className={'fw-600 homepage-imagecard-heading'}>{heading}</div>
            <div className={'homepage-imagecard-subheading'}>{subHeading}</div>
            <a
              className={'homepage-imagecard-readmore'}
              style={{ color: 'white', fontStyle: 'italic' }}
              href={href}>
              {readMoreText}
            </a>
            {href2 && readMoreText2 ? (
              <a
                className={'homepage-imagecard-readmore'}
                style={{ color: 'white', fontStyle: 'italic' }}
                href={href2}>
                {' | '}
                {readMoreText2}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  // Debug: Log the data structure
  console.log('Items structure:', JSON.stringify(items, null, 2));

  return (
    <div className={'container-fluid philosophy-section home-third-section-new'}>
      <div className={'title'}>We work with state governments across domains</div>
      
      {/* Display structure: Domain → Category → Projects */}
      {items.map((domain, domainIndex) => (
        <div key={domainIndex} style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>{domain.name}</h2>
          
          {domain.categories && domain.categories.length > 0 ? (
            domain.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} style={{ marginBottom: '30px', marginLeft: '20px' }}>
                <h3 style={{ marginBottom: '15px', fontSize: '20px', color: '#666', fontWeight: '600' }}>
                  {category.name}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  {category.projects && category.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="col-md-6 px-0">
                      <ImageCard
                        bgColor="#BA9807"
                        heading={project.node.frontmatter.title}
                        classes={'size-2-2'}
                        imageUrl={project.node.frontmatter.heroSection?.backgroundImage || '/img/default.jpg'}
                        subHeading={project.node.frontmatter.heroSection?.description || ''}
                        href={project.projectUrl}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#999' }}>No categories found for this domain</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ({ previewData, parentDomains }) => (
  <StaticQuery
    query={graphql`
      query ProjectListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "home-legacy" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                domainNew
                heroSection {
                  title
                  description
                  backgroundImage {
                    childImageSharp {
                      fluid(maxWidth: 1024, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  categories
                }
                thirdSection {
                  img1 {
                    childImageSharp {
                      fluid(maxWidth: 1024, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  img2 {
                    childImageSharp {
                      fluid(maxWidth: 1024, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  img3 {
                    childImageSharp {
                      fluid(maxWidth: 1024, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  img4 {
                    childImageSharp {
                      fluid(maxWidth: 1024, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) =>
      parentDomains.length ? (
        <HomeThirdSectionContent
          parentDomains={parentDomains}
          previewData={previewData}
          data={data}
        />
      ) : (
        <></>
      )
    }
  />
);

const SlideItem = ({ classes, item }) => {
  return (
    <div className="card-outer-wrapper">
      <div className="card-wrapper">
        <div className="title">{item.node.frontmatter.title}</div>
        <div className="image">
          <img
            src={
              item.node.frontmatter.projectLogoWithState.childImageSharp
                ? item.node.frontmatter.projectLogoWithState.childImageSharp.fluid.src
                : item.node.frontmatter.projectLogoWithState
            }
          />
        </div>
        <div className="description">
          <div className="sub-title">Overview</div>
          {item.node.frontmatter.overview[0].text}
        </div>
        <PrimaryButton
          text={'EXPLORE MORE'}
          click={() => {
            window.location.href = item.node.fields.slug;
          }}
        />
      </div>
    </div>
  );
};

const SlideItemTitle = ({
  classes,
  item,
  setActiveItem,
  activeItem,
  index,
}) => {
  return (
    <div className={'text-section-wrapper'}>
      {
        <div
          className={`list-item ${index === activeItem ? 'active' : ''}`}
          key={index}>
          {item.name}
        </div>
      }
    </div>
  );
};

const filterUrl = (str) => {
  let result = '';
  str = str.replace(/ /g, '-').toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if ('ascdfeghijklmnopqrstuvwxyz0123456789-'.indexOf(str[i]) > -1) {
      result += str[i];
    }
  }
  return result;
};