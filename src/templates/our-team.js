import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import AnimatedNumber from "../components/AnimatedNumber";
import SocialIcon from "../components/OurTeamComponents/SocialIcon";

const OurTeamPagePreviewTemplate = ({ data }) => {
  return (
    <Layout>
      <OurTeamPage data={data} />
    </Layout>
  );
};

export const OurTeamPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const partners = post.frontmatter?.partnersList || [];
  const leaderships = post.frontmatter?.leadershipsList || [];
  const managers = post.frontmatter?.managersList || [];
  const employees = post.frontmatter?.employeesList || [];
  const achievements = post.frontmatter?.achievements || [];
  const showAchievements = post.frontmatter?.showAchievements || false;
  const showPartners = post.frontmatter?.showPartners || false;
  const showLeadership = post.frontmatter?.showLeadership || false;
  const showManagers = post.frontmatter?.showManagers || false;
  const showEmployees = post.frontmatter?.showEmployees || false;

  const teamFooter = post.frontmatter?.teamFooter || {};
  const title1 = post.frontmatter?.title1 || '';
  const title2 = post.frontmatter?.title2 || '';
  const title3 = post.frontmatter?.title3 || '';
  const title4 = post.frontmatter?.title4 || ''; 

  const [hoveredMember, setHoveredMember] = useState(-1);
  const [showPopup, setShowPopup] = useState({ index: -1, list: null });

  const handlePopupOpen = (index, listName) => {
    setShowPopup({ index, list: listName });
  };

  const renderTeamSection = (teamList, sectionTitle, listName) => {
    return (
      <div className="team-section-container">
        <h2
          className="section-title text-center"
          style={{ color: "#294294", textTransform: "uppercase" }}
        >
          {sectionTitle}
        </h2>
        <div className="team-grid">
          {teamList?.map((member, index) => (
            <div key={index} className="team-card">
              <div
                className="team-image-wrapper"
                onClick={() => handlePopupOpen(index, listName)}
                onMouseLeave={() => setHoveredMember(-1)}
                onMouseEnter={() => setHoveredMember(index)}
              >
                <div
                  className="team-image"
                  style={{
                    backgroundImage: `url(${!!(member.image && member.image.childImageSharp)
                      ? member.image.childImageSharp.fluid.src
                      : member.image
                      })`,
                  }}
                ></div>
              </div>
              <div className="team-info">
                <div className="team-info_footer_1">
                  <div className="name text-center">{member?.name}</div>
                  <div className="designation text-center " style={{ color: '#1982A3' }}>
                    {member?.project !== "NA" ? member?.project : ""}
                  </div>
                  {member?.partTime && <div className=" text-center " style={{ color: '#1982A3',fontStyle:'italic' }}>
                    Part-time
                  </div>}
                  {member.linkedInProfile && <SocialIcon member={member} />}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  };

  const popupMember =
    showPopup.index !== -1
      ? showPopup.list === "partners"
        ? partners[showPopup.index]
        : showPopup.list === "leaderships"
          ? leaderships[showPopup.index]
          : showPopup.list === "managers" ?managers[showPopup.index] : employees[showPopup.index]
      : null;

  return (
    <div>
      <div className="base-banner-image">
        <img
          alt="banner-image"
          src={
            post.frontmatter.bannerImage && post.frontmatter.bannerImage.childImageSharp
              ? post.frontmatter.bannerImage.childImageSharp.fluid.src
              : post.frontmatter.bannerImage
          }
          width="100%"
          className="banner-image"
        />
        <div className="slider-content">
          <div className="title">{post.frontmatter.title}</div>
        </div>
      </div>

      <div className="container-team">
        {/* Subtitle rendered using ReactMarkdown */}
        <div className="text-center f-24 container_subTitle">
          <ReactMarkdown
            className="markdown-content"
            components={{
              strong: ({ node, ...props }) => (
                <strong style={{ color: '#294294' }} {...props} />
              ),
              b: ({ node, ...props }) => (
                <b style={{ color: '#294294' }} {...props} />
              )
            }}
          >
            {post.frontmatter.subTitle}
          </ReactMarkdown>
        </div>


        {/* Achievements Section */}
        {showAchievements &&
          <div className="achievements-section">
            <div className="achievements-grid">
              {achievements?.map((achievement, index) => (
                <AnimatedNumber
                  key={index}
                  value={achievement.value}
                  suffix={achievement.suffix}
                  description={achievement.description}
                />
              ))}
            </div>
          </div>}

        {/* Team Sections */}
        {showPartners && renderTeamSection(partners, title1, "partners")}
        {showLeadership && renderTeamSection(leaderships, title2, "leaderships")}
        {showManagers && renderTeamSection(managers, title3, "managers")}
        {showEmployees && renderTeamSection(employees, title4, "employees")}

        {/* Team Description Section */}
        {/* Popup Section */}
        {popupMember && (
          <div className="popup" id="team-popup">
            <div
              className="overlay"
              onClick={() => setShowPopup({ index: -1, list: null })}
            />
            <div className="popup-content-section-new overflow-hidden">
              <div
                className="cross-button"
                onClick={() => setShowPopup({ index: -1, list: null })}
              >
                X
              </div>
              <div className="popup-inner">
                <div className="popup-image-section">
                  <img
                    src={
                      popupMember.image?.childImageSharp
                        ? popupMember.image.childImageSharp.fluid.src
                        : popupMember.image
                    }
                    alt="popup-member"
                  />
                </div>
                <div className="popup-details">
                  <div className="popup-header">
                    <div>
                      <div className="popup-name">{popupMember.name}</div>
                      <div
                        className="popup-designation"
                        style={{ color: "#1982A3" }}
                      >
                        {popupMember.project !== "NA"
                          ? popupMember.project
                          : ""}
                      </div>
                    </div>
                    {popupMember.linkedInProfile && (
                      <div className="popup-social">

                        <SocialIcon member={popupMember} />

                      </div>
                    )}
                  </div>
                  <div className="popup-description ">
                    <p className="f-16 ">{popupMember.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div
          className="footer-section text-center py-5"
          style={{ backgroundColor: "#294294", color: "#ffffff" }}
        >
          <p className="footer-title">{teamFooter.footerTitle}</p>
          <a
            href={teamFooter.buttonLink}
            className="footer-btn"
            style={{
              backgroundColor: "#ffffff",
              color: "#294294",
              padding: "10px 80px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            {teamFooter.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurTeamPagePreviewTemplate;

export const ourTeamPageQuery = graphql`
  query OurTeamPage($id: String!) {
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
        showPartners
        showAchievements
        showLeadership
        showManagers
        title
        subTitle
        teamFooter {
          footerTitle
          buttonText
          buttonLink
        }
        achievements {
          value
          suffix
          description
        }
        title1
        title2
        title3
        title4
        showEmployees
        partnersList {
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
          partTime
        }
        leadershipsList {
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
          partTime
        }
        managersList {
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
          partTime
        }
        employeesList {
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
          partTime
        }
      }
    }
  }
`;
