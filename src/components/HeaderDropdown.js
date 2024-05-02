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
    const looseFocus = () => {
        loosingFocusTimeout = setTimeout(() => {
            changeFocus(false);
            loosingFocusTimeout = null;
            changeFocusOnHeadItem(null)
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
        domains.forEach((domain) => {
            if (domain.name === project.node.frontmatter['domainNew']) {
                found = true;
                domain.projects.push(project);
                domain.projects = domain.projects.sort(function (a, b) {
                    return b.node.frontmatter.title > a.node.frontmatter.title ? -1 : 1;
                });
            }
        });
        if (!found) {
            parentDomains.forEach((pD) => {
                if (pD.title === project.node.frontmatter['domainNew'] && (pD.displayOnHeader === true || pD.displayOnHeader === 'true')) {
                    domains.push({
                        name: project.node.frontmatter['domainNew'],
                        activeProjectIndex: 0,
                        displayOrder: pD.displayOrder,
                        projects: [project]
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
                                        onMouseEnter={() => changeFocusOnHeadItem(index)}>
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
                            domains[focusedHeadItemIndex].projects.map((item, index) => {
                                return <a href={item.projectUrl}>
                                    <div key={index} className={`head-item`}>
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
                domain
                domainNew
              }
            }
          }
        }
      }
    `}
        render={(data, count) => <HeaderDropDownComponent parentDomains={domains} data={data} menuIcon={menuIcon}/>}
    />
)
