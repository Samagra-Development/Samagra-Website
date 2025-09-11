import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { InstagramEmbed } from "react-social-media-embed";
import { Helmet } from "react-helmet";
import upIcon from "../img/up-icon.png";
import expandIcon from "../img/expandIcon.svg";
import instaIcon from "../img/instaIcon.svg";
import crossIcon from "../img/cross-icon.svg";
import rightArrow from "../img/right-arrow-icon.svg";
import { animateScroll as scroll } from "react-scroll";
import AssetsFooter from "../components/AssetsFooter";
import { SuccessStoriesSection } from "../components/CaseStudyComponents/SuccessStoriesSection";


export const DecodingCitizenPage = ({ data }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [viewPost, setViewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryData, setSelectedCategoryData] = useState(
    data?.postData
  );

  const [currPage, setCurrPage] = useState(1);
  const [numberOfItem, setNumberOfItem] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(() => true);
      } else {
        setMobile(() => false);
      }
    };
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSelectedCategoryData(() => {
      let postdata = data?.postData?.filter((d, i) => {
        if (selectedCategory === "All") return d;
        else if (selectedCategory === d?.postCard?.selectedCategory) return d;
      });
      return postdata;
    });
  }, [selectedCategory]);

  console.log(selectedCategoryData, "jkjkjkj");

  const indexOfLastRecord = currPage * numberOfItem;
  const indexOfFirstRecord = indexOfLastRecord - numberOfItem;
  const currentRecords = selectedCategoryData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(selectedCategoryData?.length / numberOfItem);
  const goToNextPage = () => {
    if (currPage !== nPages) setCurrPage(currPage + 1);
  };
  const goToPrevPage = () => {
    if (currPage !== 1) setCurrPage(currPage - 1);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleScroll = () => {
    if (window && window.scrollY > window.screen.height) {
      setShowUpIcon(true);
    } else setShowUpIcon(false);
  };

  return (
    <div>
      <Helmet>
        <link
          rel="prefetch"
          href={data?.baseBanner?.bannerImage?.childImageSharp?.fluid?.src}
        />
      </Helmet>
      <div>
        <div id="decluttered-page">
          <div className={"base-banner-image"}>
            <img
              alt="banner-image"
              src={
                data?.baseBanner?.bannerImage?.childImageSharp
                  ? data?.baseBanner?.bannerImage?.childImageSharp?.fluid?.src
                  : data?.baseBanner?.bannerImage
              }
              width={"100%"}
              className="banner-image"
            />
            <div className={"slider-content"}>
              {data?.baseBanner?.titleLines.map((d, i) => {
                return (
                  <div className={`title`} key={i}>
                    {d.text}
                  </div>
                );
              })}
            </div>
          </div>
        {/* ---------- TEXT + IMAGE SECTION ---------- */}
{data?.textImageSection && (
  <div style={{ margin: "60px auto", textAlign: "center", maxWidth: "1200px", padding: "0 20px" }}>
     <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={
          data?.textImageSection?.image?.childImageSharp
            ? data?.textImageSection?.image?.childImageSharp?.fluid?.src
            : data?.textImageSection?.image
        }
        alt="textImageSection"
        style={{
          maxWidth: "170px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      />
    </div>
    <p style={{ fontSize: "24px", fontWeight: 400, marginBottom: "30px" ,marginTop: "30px"}}>
      {data?.textImageSection?.text}
    </p>
   
  </div>
)}

{/* ---------- TEXT + CARDS SECTION ---------- */}
{data?.textCardsSection && (
  <div style={{ margin: "60px auto", textAlign: "center", maxWidth: "1200px", padding: "0 20px" }}>
    
    <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "30px" }}>
      {data?.textCardsSection?.text}
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
      }}
    >
      {data?.textCardsSection?.cards?.map((card, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            borderRadius: "12px",
            paddingBottom: "20px",
            // boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflow:"hidden",
            border: "1px solid #121213",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
            <img src ={ card?.image?.childImageSharp
            ? card?.image?.childImageSharp?.fluid?.src
            : card?.image}
            style={{width:"100%"          }}
            ></img>
            <div style ={{padding :"16px"}}>
              <div style={{ display: "flex" }}>
  <span style={{
    fontSize: "12px", 
    fontWeight: 600, 
    color: "#555", 
    marginBottom: "8px",
    backgroundColor: "#f5f5f5", 
    padding: "4px 8px", 
    borderRadius: "4px"
  }}>
    {card.tag}
  </span>
</div>
          <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>
            {card.title}
          </div>
          <div style={{ fontSize: "14px", marginBottom: "12px", color: "#555" }}>
            {card.description}
          </div>
          <a
            href={card.readMoreLink}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "14px", fontWeight: 600,  color: "#555" ,textDecoration: "underline" }}
          >
            Read More →
          </a>
                </div>
       
        </div>
      ))}
    </div>
  </div>
)}

{/* ---------- TEXT + IMAGES LIST SECTION ---------- */}
{/* {data?.textImagesListSection && (
  <div style={{ margin: "60px auto", textAlign: "center", maxWidth: "1200px", padding: "0 20px" }}>
    <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "30px" }}>
      {data?.textImagesListSection?.text}
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
      }}
    >
      {data?.textImagesListSection?.images?.map((img, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={
              img?.image?.childImageSharp
                ? img?.image?.childImageSharp?.fluid?.src
                : img?.image
            }
            alt={`imagesList-${i}`}
            style={{
              width: "334px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
         
        </div>
      ))}
    </div>
  </div>
)} */}


            <FadeInSection>
                 <div
                   
                   dangerouslySetInnerHTML={{ __html: data?.successStoriesTitle }}
                   style={{
                    
                     marginTop: mobile ? "100px" : "85px",
                     
                    color: "#343434",

                      fontWeight: "700",
                      textAlign: "center",
                      lineHeight:"1.2",

                     // margin: "auto",
                     fontSize: mobile ? "20px" : "28px",
                   }}
                 ></div>
                 <div
                   style={{
                                 marginTop: mobile ? "0" : "30px",
         
                     marginBottom: "150px",
                     display: "flex",
                     justifyContent: mobile ? "" : "space-evenly",
                     flexDirection: mobile ? "column" : "row",
                   }}
                 >
                   <SuccessStoriesSection successStories={data?.showSuccessStories} />
                 </div>
               </FadeInSection>
      
         
        
     
        </div>
        
     
      </div>
    </div>
  );
};

const DecodingcitizenPage = ({ data }) => {
  const { markdownRemark } = data;

  return (
    <Layout>
      <DecodingCitizenPage data={markdownRemark.frontmatter} />
    </Layout>
  );
};

DecodingcitizenPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DecodingcitizenPage;

export const decodingcitizenPageQuery = graphql`
  query DecodingcitizenPage {
    markdownRemark(frontmatter: { templateKey: { eq: "decoding-citizen-page" } }) {
      frontmatter {
        baseBanner {
          titleLines {
            text
          }
          bannerImage {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        textImageSection {
          text
          image {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        textCardsSection {
          text
          cards {
            tag
            title
            description
            readMoreLink
            image {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        textImagesListSection {
          text
          images {
            image {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        successStoriesTitle
        showSuccessStories
      }
    }
  }
`;

