import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

import linkedInSvg from "../img/social/LinkedIn.svg";
import linkedInSvgSelected from "../img/social/LinkedIn-selected.svg";

const TeamPagePreviewTemplate = ({ data }) => {
  if (
    data &&
    data.markdownRemark &&
    data.markdownRemark.frontmatter &&
    data.markdownRemark.frontmatter.team &&
    data.markdownRemark.frontmatter.team &&
    data.markdownRemark.frontmatter.team[2].name
  ) {
    data.markdownRemark.frontmatter.team.splice(2, 0, {});
  }
  return (
    <Layout>
      <TeamPage data={data} />
    </Layout>
  );
};
export const TeamPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const team = post.frontmatter.team || [];
  const [hoveredMember, setHoveredMember] = React.useState(-1);
  const [socialHovered, setSocialHovered] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(-1);
  if (!post.frontmatter.bannerImage) {
    return "";
  }

  return (
    <div>
      <div className={"base-banner-image"}>
        <img
          alt="banner-image"
          src={
            post.frontmatter.bannerImage &&
            post.frontmatter.bannerImage.childImageSharp
              ? post.frontmatter.bannerImage.childImageSharp?.fluid?.src
              : post.frontmatter?.bannerImage
          }
          width={"100%"}
          className="banner-image"
        />
        <div className={"slider-content"}>
          <div className="title">{post.frontmatter.title}</div>
        </div>
      </div>

      <div className="team-section container">
        {team[showPopup] && team[showPopup].image ? (
          <div className="popup" id={"team-popup"}>
            <div className="overlay" onClick={() => setShowPopup(-1)} />
            <div className="popup-content-section">
              <div className="cross-button" onClick={() => setShowPopup(-1)}>
                X
              </div>
              <div className="detail-section">
                <div
                  className="image-section"
                  style={{
                    backgroundImage: `url(${
                      !!team[showPopup].image.childImageSharp
                        ? team[showPopup].image.childImageSharp.fluid.src
                        : team[showPopup].image
                    })`,
                  }}
                ></div>
                <div className="details">
                  <div className="title">{team[showPopup].name}</div>
                  <div className="designation">
                    {team[showPopup].project !== "NA"
                      ? team[showPopup].project
                      : ""}
                  </div>
                  {team[showPopup].linkedInProfile ? (
                    <div className="social">
                      <a
                        onMouseLeave={() => setSocialHovered(false)}
                        onMouseEnter={() => setSocialHovered(true)}
                        href={
                          team[showPopup].linkedInProfile
                            ? team[showPopup].linkedInProfile
                            : "#"
                        }
                      >
                        <img
                          src={
                            socialHovered ? linkedInSvgSelected : linkedInSvg
                          }
                        />
                      </a>
                    </div>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
              <div className="text-content-section">
                <div className="description">
                  <p className="f-16">{team[showPopup].bio}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="mt-4 py-5 text-center f-24 color-text-primary container">
          {post.frontmatter.subTitle}
        </div>
        <div className="row">
          {team.map((member, index) => {
            if (index === 2) {
              return <></>;
            }
            if (index < 2) {
              return (
                <>
                  <div
                    className="col-md-4 col-sm-6 col-xs-12"
                    style={{ marginLeft: "8.33%", marginRight: "8.33%" }}
                  >
                    <div
                      onClick={() => setShowPopup(index)}
                      onMouseLeave={() => setHoveredMember(-1)}
                      onMouseEnter={() => setHoveredMember(index)}
                      style={{ marginTop: "0" }}
                      className={`team-card-wrapper ${
                        (index + 2) % 3 === 0 ? "with-margin" : ""
                      }`}
                    >
                      <div
                        className="image-section"
                        style={{
                          backgroundImage: `url(${
                            !!(member.image && member.image.childImageSharp)
                              ? member.image.childImageSharp.fluid.src
                              : member.image
                          })`,
                        }}
                      ></div>
                      <div className="content-section">
                        <div className="name">{member.name}</div>
                        <div className="designation">
                          {member.project !== "NA" ? member.project : ""}
                        </div>
                        {member.linkedInProfile ? (
                          <div
                            className="social"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.location.href = member.linkedInProfile;
                            }}
                          >
                            <a
                              href={
                                member.linkedInProfile
                                  ? member.linkedInProfile
                                  : "#"
                              }
                            >
                              <img
                                src={
                                  hoveredMember === index
                                    ? linkedInSvgSelected
                                    : linkedInSvg
                                }
                              />
                            </a>
                          </div>
                        ) : (
                          <span />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            return (
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div
                  onClick={() => setShowPopup(index)}
                  onMouseLeave={() => setHoveredMember(-1)}
                  onMouseEnter={() => setHoveredMember(index)}
                  className={`team-card-wrapper ${
                    (index + 2) % 3 === 0 ? "with-margin" : ""
                  }`}
                >
                  <div
                    className="image-section"
                    style={{
                      backgroundImage: `url(${
                        !!(member.image && member.image.childImageSharp)
                          ? member.image.childImageSharp.fluid.src
                          : member.image
                      })`,
                    }}
                  ></div>
                  <div className="content-section">
                    <div className="name">{member.name}</div>
                    <div className="designation">
                      {member.project !== "NA" ? member.project : ""}
                    </div>
                    {member.linkedInProfile ? (
                      <div
                        className="social"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = member.linkedInProfile;
                        }}
                      >
                        <a
                          href={
                            member.linkedInProfile
                              ? member.linkedInProfile
                              : "#"
                          }
                        >
                          <img
                            src={
                              hoveredMember === index
                                ? linkedInSvgSelected
                                : linkedInSvg
                            }
                          />
                        </a>
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPagePreviewTemplate;

export const aboutPageQuery = graphql`
  query TeamPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        subTitle
        team {
          image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          bio
          project
          linkedInProfile
        }
      }
    }
  }
`;
