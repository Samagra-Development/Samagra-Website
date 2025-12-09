import React, {useState} from 'react';
import {graphql, StaticQuery} from "gatsby";
import hoveredArrowIcon from '../img/hovered-arrow-icon.svg'
import arrowIcon from '../img/arrow-icon.svg'

export const HeaderDropDownComponent = ({data, parentDomains,menuIcon}) => {
    let loosingFocusTimeout;

    const [focused, changeFocus] = useState(
        false
    );
    const [focusedHeadItemIndex, changeFocusOnHeadItem] = useState(
        null
    );
    const [focusedCategoryIndex, changeFocusOnCategory] = useState(
        null
    );
    const looseFocus = () => {
        loosingFocusTimeout = setTimeout(() => {
            changeFocus(false);
            loosingFocusTimeout = null;
            changeFocusOnHeadItem(null);
            changeFocusOnCategory(null);
        }, 200);
    };
    const setFocus = () => {
        if (loosingFocusTimeout) {
            clearTimeout(loosingFocusTimeout);
        }
        changeFocus(true)
    };
    const {edges: projects} = data.allMarkdownRemark;
    let domains = [];
    projects.forEach((project) => {
        let found = false;
        project.projectUrl = project.node.fields.slug;
        const projectCategory = project.node.frontmatter.heroSection?.categories?.[0] || 'Uncategorized';
        
        domains.forEach((domain) => {
            if (domain.name === project.node.frontmatter['domainNew']) {
                found = true;
                
                // Find or create category within domain
                let categoryFound = false;
                domain.categories.forEach((category) => {
                    if (category.name === projectCategory) {
                        categoryFound = true;
                        category.projects.push(project);
                        category.projects = category.projects.sort(function (a, b) {
                            return b.node.frontmatter.title > a.node.frontmatter.title ? -1 : 1;
                        });
                    }
                });
                
                if (!categoryFound) {
                    domain.categories.push({
                        name: projectCategory,
                        projects: [project]
                    });
                    domain.categories = domain.categories.sort(function (a, b) {
                        return a.name > b.name ? 1 : -1;
                    });
                }
            }
        });
        
        if (!found) {
            parentDomains.forEach((pD) => {
                if (pD.title === project.node.frontmatter['domainNew'] && (pD.displayOnHeader === true || pD.displayOnHeader === 'true')) {
                    domains.push({
                        name: project.node.frontmatter['domainNew'],
                        activeProjectIndex: 0,
                        displayOrder: pD.displayOrder,
                        categories: [{
                            name: projectCategory,
                            projects: [project]
                        }]
                    });
                    domains = domains.sort(function (a, b) {
                        return b.displayOrder > a.displayOrder ? -1 : 1;
                    });
                }
            });
        }
    });


    return (
        <li onMouseEnter={() => setFocus()} onMouseLeave={() => looseFocus()} style={{position: 'relative'}}
            className={`${focused ? 'focused' : ''}`}>
            <a className="nav-link" href="#" style={{display:"flex",alignItems:"center",gap:"4px"}}><span>Our Programs</span><img src={menuIcon}/></a>
            <div className={'sub-menu'}>
                <div className={"head-items-wrapper"}>
                    {
                        domains.map((item, index) => {
                            return <div key={index}
                                        className={`head-item ${focusedHeadItemIndex === index ? 'head-focused' : ''}`}
                                        onMouseEnter={() => { changeFocusOnHeadItem(index); changeFocusOnCategory(null); }}>
                                <span>{
                                    item.name
                                }</span><img src={focusedHeadItemIndex === index ? hoveredArrowIcon : arrowIcon}/>
                            </div>;
                        })
                    }
                </div>
                {
                    domains && domains[focusedHeadItemIndex] ? <div className={"sub-head-items-wrapper"}>
                        {
                            domains[focusedHeadItemIndex].categories.map((category, catIndex) => {
                                return <div key={catIndex}
                                           className={`head-item ${focusedCategoryIndex === catIndex ? 'head-focused' : ''}`}
                                           onMouseEnter={() => changeFocusOnCategory(catIndex)}>
                                    <span>{category.name}</span><img src={focusedCategoryIndex === catIndex ? hoveredArrowIcon : arrowIcon}/>
                                </div>;
                            })
                        }
                    </div> : <div/>
                }
                {
                    domains && domains[focusedHeadItemIndex] && domains[focusedHeadItemIndex].categories[focusedCategoryIndex] ? <div className={"sub-head-items-wrapper"} style={{left: '400px'}}>
                        {
                            domains[focusedHeadItemIndex].categories[focusedCategoryIndex].projects.map((item, index) => {
                                return <a key={index} href={item.projectUrl}>
                                    <div className={`head-item`}>
                                        {
                                            item.node.frontmatter.title
                                        }
                                    </div>
                                </a>;
                            })
                        }
                    </div> : <div/>
                }

            </div>
        </li>
    )
};

export default ({domains,menuIcon}) => (
    <StaticQuery
        query={graphql`
      query ProjectHeaderListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "project-post" } } }
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
                templateKey
                domainNew
                heroSection {
                  categories
                }
              }
            }
          }
        }
      }
    `}
        render={(data, count) => <HeaderDropDownComponent parentDomains={domains} data={data} menuIcon={menuIcon}/>}
    />
)
