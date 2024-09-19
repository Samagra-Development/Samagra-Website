import React, { useState } from "react";
import { graphql, StaticQuery } from "gatsby";

export const OurImpactSection = ({ data, projectId, readMore }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const { allMarkdownRemark: impactPageContent } = data;
  const allImpactPosts = impactPageContent.edges;

  // Filter posts by matching projectId
  const filteredImpactPosts = allImpactPosts.filter(
    (item) => item.node.frontmatter.projectId === projectId
  );

  const readMoreTitles = [];

  if (readMore) {
    readMore.forEach((r) => {
      readMoreTitles.push(r.text);
    });
  }

  const filteredReadMorePosts = [];
  readMoreTitles.forEach((rMT) => {
    const filteredImpact = filteredImpactPosts.filter(function (item) {
      return rMT.indexOf(item.node.frontmatter.title) > -1;
    });
    if (filteredImpact && filteredImpact.length) {
      filteredReadMorePosts.push(filteredImpact[0]);
    }
  });

  const postsToDisplay = filteredReadMorePosts.length
    ? filteredReadMorePosts
    : filteredImpactPosts;

  return (
    <div
      className={"home-news-section-wrapper our-impact-section-wrapper container"}
      style={{ paddingTop: "50px" }}
    >
      {postsToDisplay.length ? (
        <div className={"title"}>Our Impact</div>
      ) : null}
      <div className={"cards-section row"}>
        {postsToDisplay.map((impactPost, index) => {
          if (!impactPost.node.frontmatter.featuredimage)
            return (
              <a
                href={impactPost.node.frontmatter.link}
                target="_blank"
                className={"col-md-4 col-sm-6 col-xs-12"}
              >
                <div
                  className={`card-wrapper ${hoveredIndex === index ? "hovered" : ""}`}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  style={{ width: "100%" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div
                    className={"image-section"}
                    style={{
                      backgroundImage: `url(${
                        !!impactPost.node.frontmatter?.image
                          ? impactPost.node.frontmatter?.image?.childImageSharp?.fluid?.src
                          : impactPost.node.frontmatter?.image
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className={"content-section"}>
                    <div className={"heading"}>
                      {impactPost.node.frontmatter.title}
                    </div>
                    <div className={"timestamp"}>
                      {impactPost.node.frontmatter.mediaHouse} &nbsp;|&nbsp;
                      {impactPost.node.frontmatter.date} &nbsp;|&nbsp; Impact
                    </div>
                  </div>
                </div>
              </a>
            );
          return (
            <a
              href={impactPost.node.fields ? impactPost.node.fields.slug : ""}
              className={"col-md-4 col-sm-6 col-xs-12"}
            >
              <div
                className={`card-wrapper ${hoveredIndex === index ? "hovered" : ""}`}
                style={{ width: "100%" }}
                onMouseLeave={() => setHoveredIndex(-1)}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <div
                  className={"image-section"}
                  style={{
                    backgroundImage: `url(${
                      !!(
                        impactPost.node.frontmatter.featuredimage &&
                        impactPost.node.frontmatter.featuredimage.childImageSharp
                      )
                        ? impactPost.node.frontmatter.featuredimage.childImageSharp.fluid.src
                        : impactPost.node.frontmatter.featuredimage
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className={"content-section"}>
                  <div className={"heading"}>
                    {impactPost.node.frontmatter.title}
                  </div>
                  <div className={"timestamp"}>
                    {impactPost.node.frontmatter.author} &nbsp;|&nbsp;
                    {impactPost.node.frontmatter.date} &nbsp;|&nbsp; Blog
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ({ projectId, readMore }) => (
  <StaticQuery
    query={graphql`
      query OurImpactRollQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "case-study" } } }
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
                projectId
                mediaHouse
                link
                author
                image {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                date(formatString: "MMMM DD, YYYY")
                linkButtonText
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <OurImpactSection data={data} projectId={projectId} readMore={readMore} />
    )}
  />
);
