import React, { useState, useRef, useEffect } from "react";
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
  
  // API data state
  const [apiTeamData, setApiTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team data from API
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        // Your Google Apps Script API endpoint
        const response = await fetch('https://script.googleusercontent.com/a/macros/esmagico.in/echo?user_content_key=AehSKLg83-_9Vjl4TMdvQW4fc2fTwfyGvYD_9CDbnRR0qluBvpEek00SPcaSjlpHpocj8LkGFHf4gyYh8qExigWK8C0MN70FhmeqJsgm7GLsZTRb6fDATZe0NG_nDQY7rp64CZRGkOBXLTIgzKnQ8cte7wHhf30Nij4go4RfOOiElWkFspMqs7WZzlgtGUaZFZcPggzHbNXEkJ5MQWAALR7BC_pI1jSiR0jw-jVJ-xyqevcEOMlmEo-6QSGi8mq010cGmu35sMKYPQvVZjtzFRhgvL4OxpT8Hr9PFHxUt0HEfNzzZawF_1w&lib=MnX535NAwlQqTTmK8rRb1UHigX9cjdZoX');
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setApiTeamData(data);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setApiTeamData([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Convert API data to match the original structure and filter by type
  const partners = apiTeamData.filter(member => member.type === 'Partners').map(member => ({
    ...member,
    project: member.designation,
    partTime: member.parttime
  }));

  const leaderships = apiTeamData.filter(member => member.type === 'Leadership').map(member => ({
    ...member,
    project: member.designation,
    partTime: member.parttime
  }));

  const managers = apiTeamData.filter(member => member.type === 'Manager').map(member => ({
    ...member,
    project: member.designation,
    partTime: member.parttime
  }));

  const employees = apiTeamData.filter(member => member.type === 'Team Member').map(member => ({
    ...member,
    project: member.designation,
    partTime: member.parttime
  }));

  // Keep all original configurations from markdown
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

  // Create refs for each section
  const partnersRef = useRef(null);
  const leadershipsRef = useRef(null);
  const managersRef = useRef(null);
  const employeesRef = useRef(null);

  const handleTabClick = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Convert Google Drive share link to direct image URL
  const getDirectImageUrl = (driveUrl) => {
    if (!driveUrl) return '';
    const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
    return driveUrl;
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
                onClick={() => {if(sectionTitle!="Team Members"){handlePopupOpen(index, listName)}}}
                onMouseLeave={() => setHoveredMember(-1)}
                onMouseEnter={() => setHoveredMember(index)}
              >
                <div
                  className="team-image"
                  style={{
                    backgroundImage: `url(${
                      member.image && member.image.childImageSharp
                        ? member.image.childImageSharp.fluid.src
                        : getDirectImageUrl(member.image)
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

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '40px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: '20px' }}>Loading team data...</p>
      </div>
    );
  }

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

        {/* Tab Navigation */}
        

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
  <div className="team-tabs" style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
          {(partners.length > 0 && showPartners)&& (
            <button className="team-tab-btn" onClick={() => handleTabClick(partnersRef)}>
              {title1 || "Partners"}
            </button>
          )}
          {(leaderships.length > 0 && showLeadership)&& (
            <button className="team-tab-btn" onClick={() => handleTabClick(leadershipsRef)}>
              {title2 || "Leadership"}
            </button>
          )}
          {(managers.length > 0 && showManagers)&& (
            <button className="team-tab-btn" onClick={() => handleTabClick(managersRef)}>
              {title3 || "Managers"}
            </button>
          )}
          {(employees.length > 0 && showEmployees)&& (
            <button className="team-tab-btn" onClick={() => handleTabClick(employeesRef)}>
              {title4 || "Team Member"}
            </button>
          )}
        </div>
        {/* Team Sections */}
        {(partners.length > 0 && showPartners)&& (
          <div ref={partnersRef}>
            {renderTeamSection(partners, title1, "partners")}
          </div>
        )}
        {(leaderships.length > 0 && showLeadership)&&  (
          <div ref={leadershipsRef}>
            {renderTeamSection(leaderships, title2, "leaderships")}
          </div>
        )}
        {(managers.length > 0 && showManagers)&& (
          <div ref={managersRef}>
            {renderTeamSection(managers, title3, "managers")}
          </div>
        )}
        {(employees.length > 0 && showEmployees)&& (
          <div ref={employeesRef}>
            {renderTeamSection(employees, title4, "employees")}
          </div>
        )}

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
                        : getDirectImageUrl(popupMember.image)
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
      }
    }
  }
`;