import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <div className="blogs-section">
        <div className="row">
          {posts.map(({ node: post }) => {
            return (
              <a
                className="col-lg-3 col-md-4 col-sm-6 col-xs-1"
                key={post.id}
                target={"_blank"}
                href={post.fields.slug}
              >
                <div className="blog-wrapper">
                  {post.frontmatter.featuredimage ? (
                    <div
                      className="image-wrapper"
                      style={{
                        backgroundImage: `url(${post.frontmatter.featuredimage
                          .childImageSharp.fluid.src ||
                          post.frontmatter.featuredimage})`,
                      }}
                    ></div>
                  ) : null}
                  <div className="content-wrapper">
                    <div className="heading">{post.frontmatter.title}</div>
                    <div className="posted-on">
                      by {post.frontmatter.author} on {post.frontmatter.date}
                    </div>

                    <div className="read-more">Read More</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
                author
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
