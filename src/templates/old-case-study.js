import "../styles/CaseStudy.scss";
import { graphql } from "gatsby";
import React, { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import { animateScroll as scroll } from "react-scroll";
import upIcon from "../img/up-arrow-png-20.png";
import amritSeriesDoodle from "../../static/img/amrit-series-text-doodle.svg";
import { RightArrow } from "../components/CaseStudyComponents/RightArrow";
import { InfoIcon } from "../components/CaseStudyComponents/InfoIcon";
import { Modal } from "react-responsive-modal";
import { debounce } from "lodash";
import "react-responsive-modal/styles.css";
import CountUp from "react-countup";
import SuccessStoriesSection from "../components/CaseStudyComponents/SuccessStoriesSection";
import SectionDivider from "../components/CaseStudyComponents/SectionDivider";

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const handleIntersection = debounce((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting ? setVisible(entry.isIntersecting) : null
      );
    }, 200);
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export const OldCaseStudyTemplate = ({ content, helmet }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const arr = ["1", "2", "3", "4", "5"];

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleScroll = () => {
    if (window && window.scrollY > window.screen.height) {
      setShowUpIcon(true);
    } else setShowUpIcon(false);
  };

  useEffect(() => {
    console.log("hello", content, arr);
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
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

  const renderSection = (option) => {
    switch (option) {
      case "1":
        return sectionOne();
      case "2":
        return sectionTwo();
      case "3":
        return sectionThree();
      case "4":
        return sectionFour();
      case "5":
        return sectionFive();
      default:
        return <></>;
    }
  };

  const sectionTwo = () => {
    return (
      <>
        <FadeInSection>
          {content?.title4 && (
            <div
              className="textCaseStudy"
              style={{
                textAlign: "center",
                paddingTop: !mobile ? "5px" : "50px",
                fontSize: mobile ? "18px" : "24px",
                width: "80%",
                margin: "auto",
              }}
            >
              {content?.title4}
            </div>
          )}
        {mobile? <div
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 40px",
              gap: "48px",
            }}
          >
            {content?.motionGraphic && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  height: "24vh",
                  aspectRatio: "16/9",
                  marginTop: !mobile ? "10px" : "",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  style={{
                    flex: 1,
                    width: "100%",
                    objectFit: "cover",
                  }}
                >
                  <source
                    src={
                      content?.motionGraphic?.publicURL
                        ? content?.motionGraphic?.publicURL
                        : content?.motionGraphic
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
           
          </div>:""}



         <div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontSize: "18px",
    gap: "8px",
    padding: mobile ? "20px 5%" : "30px 10%",
  }}
>
  {content?.newsdescription?.map((n, i) => {
    return (
      <React.Fragment key={i}>
        {/* Render the first paragraph */}
        <div
          style={{
            fontSize: mobile ? "15px" : "18px",
            textAlign: "justify",
          }}
        >
          {n?.text}
        </div>

        {!mobile && i === 0 && content?.motionGraphic && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              marginTop: "10px",
            }}
          >
            <video
              autoPlay
              loop
              muted
              style={{
                flex: 1,
                width: "100%",
                height: "54vh",
                objectFit: "contain", 
                aspectRatio: "16/9",
                margin: "2% auto",
              }}
            >
              <source
                src={
                  content?.motionGraphic?.publicURL
                    ? content?.motionGraphic?.publicURL
                    : content?.motionGraphic
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </React.Fragment>
    );
  })}

  {content?.newsletterBtn && (
    <div className="casestudy-btn-container">
      <button
        style={{
          cursor: "pointer",
          background: content?.fontColor,
          padding: "4px 30px",
          color: "white",
          border: "none",
          borderRadius: "8px",
          transition: "transform 0.2s ease",
        }}
        onClick={() => {
          const link = document.createElement("a");
          link.href = content?.newsletterLink;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        {content?.newsletterBtn}
      </button>
    </div>
  )}
</div>


        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
      </>
    );
  };

  const sectionOne = () => {
    return (
      <>
        <FadeInSection>
          {content?.title3 && (
            <div
              className="textCaseStudy"
              id="use-cases-section"
              style={{ fontSize: mobile ? "18px" : "24px" }}
            >
              {content?.title3}
            </div>
          )}
          {content?.infographic1 && (
            <div
              className="infographic1"
              style={{ marginTop: "75px", marginBottom: "75px" }}
            >
              {content?.infographic1?.[0]?.img && (
                <div
                  className="infographic-img"
                  style={{ width: "fit-content", margin: "auto" }}
                >
                  <img
                    src={
                      content?.infographic1?.[0]?.img?.childImageSharp
                        ? content?.infographic1?.[0]?.img?.childImageSharp
                            ?.fluid?.src
                        : content?.infographic1?.[0]?.img
                    }
                    alt=""
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}

              {content?.infographic1.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: mobile ? "column" : "row",
                    alignItems: mobile ? "center" : "flex-start",
                  }}
                >
                  {content?.infographic1?.map((item, index, array) => {
                    if (index === 0) return null;
                    return (
                      <>
                        <div className="infographic-img">
                          <img
                            src={
                              item?.img?.childImageSharp
                                ? item?.img?.childImageSharp?.fluid?.src
                                : item?.img
                            }
                            alt=""
                            style={{ maxWidth: "250px" }}
                          />
                        </div>
                        {/* Check if it's not the last element */}
                        {index !== array.length - 1 && (
                          <div
                            style={{
                              height: "500px",
                              width: "1px",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              borderColor: "transparent",
                              borderImage: `linear-gradient(to bottom, ${content?.fontColor}, #ffffff) 1`,
                              display: mobile ? "none" : "block",
                              margin: "0 10px",
                            }}
                          ></div>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {content?.infographic2 && (
            <div
              className="infographic2"
              style={{ marginTop: "75px", marginBottom: "75px" }}
            >
              {content?.infographic2?.[0]?.img && (
                <div
                  className="infographic-img"
                  style={{ width: "fit-content", margin: "15px auto" }}
                >
                  <img
                    src={
                      content?.infographic2?.[0]?.img?.childImageSharp
                        ? content?.infographic2?.[0]?.img?.childImageSharp
                            ?.fluid?.src
                        : content?.infographic2?.[0]?.img
                    }
                    alt=""
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
              {content?.infographic2.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: mobile ? "column" : "row",
                    alignItems: mobile ? "center" : "flex-start",
                    marginTop: "10px",
                  }}
                >
                  {content?.infographic2?.map((item, index) => {
                    if (index === 0) return null;
                    return (
                      <div
                        className="infographic-img"
                        style={{ margin: mobile ? "15px 0" : "0 15px" }}
                      >
                        <img
                          src={
                            item?.img?.childImageSharp
                              ? item?.img?.childImageSharp?.fluid?.src
                              : item?.img
                          }
                          alt=""
                          style={{ maxWidth: "250px" }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {/* <div style={{ backgroundImage: `url(${content?.backgroundMap?.childImageSharp?(content?.backgroundMap?.childImageSharp?.fluid?.src):content?.backgroundMap})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain' }}>
          {content?.infographic1 && <div
            className="infographic1"
            style={{ marginTop: '75px', marginBottom: '75px' }}>
            {content?.infographic1?.[0]?.img && <div
              className="infographic-img"
              style={{ width: 'fit-content', margin: 'auto' }}>
              <img
                src={content?.infographic1?.[0]?.img?.childImageSharp?(content?.infographic1?.[0]?.img?.childImageSharp?.fluid?.src):content?.infographic1?.[0]?.img}
                alt=""
                style={{ maxWidth: '200px' }}
              />
            </div>}
            {content?.infographic1.length>1 && <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: mobile ? 'column' : 'row',
                alignItems: mobile ? 'center' : 'flex-start',
              }}>
              {content?.infographic1?.[1]?.img &&  <>
                    <div className="infographic-img">
                      <img
                        src={(content?.infographic1?.[1]?.img?.childImageSharp)?(content?.infographic1?.[1]?.img?.childImageSharp?.fluid?.src):content?.infographic1?.[1]?.img}
                        alt=""
                        style={{ maxWidth: '250px' }}
                      />
                    </div>
                  </>}
                  {content?.infographic1?.[2]?.img &&  <>
                    <div
                        style={{
                          height: '450px',
                          width: '1px',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'transparent',
                          borderImage:
                            `linear-gradient(to bottom, ${content?.fontColor}, #ffffff) 1`,
                          display: mobile ? 'none' : 'block',
                          margin: '0 10px',
                        }}></div>
                    <div className="infographic-img">
                      <img
                        src={(content?.infographic1?.[2]?.img?.childImageSharp)?(content?.infographic1?.[2]?.img?.childImageSharp?.fluid?.src):content?.infographic1?.[2]?.img}
                        alt=""
                        style={{ maxWidth: '250px' }}
                      />
                    </div>
                  </>}
                  {content?.infographic1?.[3]?.img &&  <>
                    <div
                        style={{
                          height: '450px',
                          width: '1px',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'transparent',
                          borderImage:
                            `linear-gradient(to bottom, ${content?.fontColor}, #ffffff) 1`,
                          display: mobile ? 'none' : 'block',
                          margin: '0 10px',
                        }}></div>
                    <div className="infographic-img">
                      <img
                        src={(content?.infographic1?.[3]?.img?.childImageSharp)?(content?.infographic1?.[3]?.img?.childImageSharp?.fluid?.src):content?.infographic1?.[3]?.img}
                        alt=""
                        style={{ maxWidth: '250px' }}
                      />
                    </div>
                  </>}
            </div>}
            {content?.infographic1.length>4 && <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: mobile ? 'column' : 'row',
                alignItems: mobile ? 'center' : 'flex-start',
              }}>
              {content?.infographic1?.[4]?.img &&  <>
                    <div className="infographic-img">
                      <img
                        src={(content?.infographic1?.[4]?.img?.childImageSharp)?(content?.infographic1?.[4]?.img?.childImageSharp?.fluid?.src):content?.infographic1?.[4]?.img}
                        alt=""
                        style={{ maxWidth: '250px' }}
                      />
                    </div>
                  </>}
                  {content?.infographic1?.[5]?.img &&  <>
                    <div
                        style={{
                          height: '450px',
                          width: '1px',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'transparent',
                          borderImage:
                            `linear-gradient(to bottom, ${content?.fontColor}, #ffffff) 1`,
                          display: mobile ? 'none' : 'block',
                          margin: '0 10px',
                        }}></div>
                    <div className="infographic-img">
                      <img
                        src={(content?.infographic1?.[5]?.img?.childImageSharp)?(content?.infographic1?.[5]?.img?.childImageSharp?.fluid?.src):content?.infographic1?.[5]?.img}
                        alt=""
                        style={{ maxWidth: '250px' }}
                      />
                    </div>
                  </>}
            </div>}
          </div>}

          {content?.infographic2 && <div
            className="infographic2"
            style={{ marginTop: '75px', marginBottom: '75px' }}>
          {content?.infographic2?.[0]?.img &&  <div
              className="infographic-img"
              style={{ width: 'fit-content', margin: '15px auto' }}>
              <img
                src={content?.infographic2?.[0]?.img?.childImageSharp?(content?.infographic2?.[0]?.img?.childImageSharp?.fluid?.src):content?.infographic2?.[0]?.img}
                alt=""
                style={{ maxWidth: '200px' }}
              />
            </div>}
            {content?.infographic2.length>1 && <div
              style={{
                display: 'flex',
                flexWrap: "wrap",
                justifyContent: 'center',
                flexDirection: mobile ? 'column' : 'row',
                alignItems: mobile ? 'center' : 'flex-start',
                marginTop: '10px',
                padding:"0 16vw"
              }}>
              {content?.infographic2?.map((item, index) => {
                if(index === 0) return null;
                return (
                  <div
                    className="infographic-img"
                    style={{ margin: mobile ? '15px 0' : '0 5px' }}>
                    <img
                      src={item?.img?.childImageSharp?(item?.img?.childImageSharp?.fluid?.src):item?.img}
                      alt=""
                      style={{ maxWidth: '250px' }}
                    />
                  </div>
                );
              })}
            </div>}
           </div>}</div> */}
        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
      </>
    );
  };

  const sectionThree = () => {
    return (
      <>
        <FadeInSection>
          <div
            className="case-study-summary-container"
            style={{ marginTop: mobile ? "75px" : "100px" }}
          >
            <div className="case-study-summary-text" id="impact-video-section">
              {content?.title5 && (
                <div
                  className="textCaseStudy"
                  style={{
                    textAlign: "center",
                    paddingTop: !mobile ? "5px" : "50px",
                    fontSize: mobile ? "18px" : "24px",
                  }}
                >
                  {content?.title5}
                </div>
              )}
              {content?.showImpactVideo && (
                <>
                  <div
                    style={{
                      textAlign: "right",
                      width: "66vw",
                      minWidth: "350px",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={amritSeriesDoodle}
                      alt=""
                      width="32px"
                      style={{
                        marginLeft: "4px",
                        marginTop: mobile ? "30px" : "50px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div className="impact-video">
                      <iframe
                        style={{
                          minHeight: "150px",
                          minWidth: "300px",
                          height: "30vw",
                          width: "60vw",
                          padding: "10px",
                          borderWidth: "1px",
                          borderImage:
                            "linear-gradient(to right, #418F37, #FFE81D) 1",
                          borderImageSlice: 1,
                        }}
                        src={content?.impactVideoLink}
                        // title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "66vw",
                      minWidth: "350px",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "auto",
                      marginBottom: mobile ? "50px" : "30px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <img
                        src={amritSeriesDoodle}
                        alt=""
                        width="32px"
                        style={{
                          marginLeft: "4px",
                          transform: "scaleX(-1) scaleY(-1)",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              {content?.showImpactCard && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "32px",
                    justifyContent: "center",
                    margin: "60px 0",
                  }}
                >
                  <div class="case-study-impact-card">
                    <img
                      src={
                        content?.img1?.childImageSharp
                          ? content?.img1?.childImageSharp?.fluid?.src
                          : content?.img1
                      }
                      alt="Card background image"
                    />
                    <div
                      class="impact-card-content"
                      style={{ color: content?.impactCardFontColor }}
                    >
                      <div
                        style={{ fontWeight: "600", fontSize: "25px" }}
                        dangerouslySetInnerHTML={{
                          __html: content?.cardTitle1,
                        }}
                      ></div>
                      <div
                        style={{ fontWeight: "400", fontSize: "18" }}
                        dangerouslySetInnerHTML={{
                          __html: content?.cardDescription1,
                        }}
                      ></div>
                      {content?.cardBtn1 && (
                        <p
                          style={{
                            paddingTop: "15px",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            window.location.href = content?.cardLink1;
                          }}
                        >
                          {content?.cardBtn1} <InfoIcon />
                        </p>
                      )}
                    </div>
                  </div>
                  <div class="case-study-impact-card">
                    <img
                      src={
                        content?.img2?.childImageSharp
                          ? content?.img2?.childImageSharp?.fluid?.src
                          : content?.img2
                      }
                      alt="Card background image"
                    />
                    <div
                      class="impact-card-content"
                      style={{ color: content?.impactCardFontColor }}
                    >
                      <div
                        style={{ fontWeight: "600", fontSize: "25px" }}
                        dangerouslySetInnerHTML={{
                          __html: content?.cardTitle2,
                        }}
                      ></div>
                      <div
                        style={{ fontWeight: "400", fontSize: "18" }}
                        dangerouslySetInnerHTML={{
                          __html: content?.cardDescription2,
                        }}
                      ></div>
                      {content?.cardBtn2 && (
                        <p
                          style={{
                            paddingTop: "15px",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            window.location.href = content?.cardLink2;
                          }}
                        >
                          {content?.cardBtn2} <InfoIcon />
                        </p>
                      )}
                    </div>
                  </div>
                  <div class="case-study-impact-card">
                    <img
                      src={
                        content?.img3?.childImageSharp
                          ? content?.img3?.childImageSharp?.fluid?.src
                          : content?.img3
                      }
                      alt="Card background image"
                    />
                    <div
                      class="impact-card-content"
                      style={{ color: content?.impactCardFontColor }}
                    >
                      <div
                        style={{ fontWeight: "600", fontSize: "25px" }}
                        dangerouslySetInnerHTML={{
                          __html: content?.cardTitle3,
                        }}
                      ></div>
                      <div
                        style={{ fontWeight: "400", fontSize: "18" }}
                        dangerouslySetInnerHTML={{
                          __html: content?.cardDescription3,
                        }}
                      ></div>
                      {content?.cardBtn3 && (
                        <p
                          style={{
                            paddingTop: "15px",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            window.location.href = content?.cardLink3;
                          }}
                        >
                          {content?.cardBtn3} <InfoIcon />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
      </>
    );
  };

  const sectionFour = () => {
    return (
      <>
        <FadeInSection>
          <div className="impact">
            {content?.title6 && (
              <div
                className="headingCaseStudy"
                id="impact-numbers-section"
                style={{
                  textAlign: "center",
                  width: "80%",
                  margin: "auto",
                  paddingTop: "50px",
                  fontSize: mobile ? "18px" : "24px",
                }}
              >
                {content?.title6}
              </div>
            )}
            <div
              style={{
                width: "80%",
                margin: "50px auto",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: mobile ? "column" : "row",
              }}
            >
              {content?.icon1 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: "1 1 0",
                    width: mobile ? "100%" : 0,
                    padding: "10px",
                  }}
                >
                  <img
                    src={
                      content?.icon1?.childImageSharp
                        ? content?.icon1?.childImageSharp?.fluid?.src
                        : content?.icon1
                    }
                    alt=""
                    width={mobile ? 35 : 75}
                    height={mobile ? 35 : 75}
                  />
                  <p
                    className="textCaseStudy"
                    style={{
                      fontWeight: "bold",
                      color: content.fontColor,
                      fontSize: "24px",
                      marginBottom: 0,
                      paddingTop: "2vh",
                    }}
                  >
                    {/* <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  #
                </span> */}
                    {content?.impactNumber1Char}
                    <CountUp
                      start={0}
                      decimals={content?.impactNumber1Decimal}
                      end={content?.impactNumber1}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce={true}
                    />
                    {/* {' '} */}
                    {content?.impactNumber1Text}{" "}
                    {content?.showPlus1 && (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </span>
                    )}
                  </p>
                  <p
                    className="textCaseStudy"
                    dangerouslySetInnerHTML={{
                      __html: content?.impactNumber1Title,
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: mobile ? "14px" : "16px",
                      width: mobile ? "90%" : "80%",
                      fontWeight: "bold",
                    }}
                  ></p>
                </div>
              )}
              {content?.icon2 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: mobile ? "40px" : "",
                    flex: "1 1 0",
                    width: mobile ? "100%" : 0,
                    padding: "10px",
                  }}
                >
                  <img
                    src={
                      content?.icon2?.childImageSharp
                        ? content?.icon2?.childImageSharp?.fluid?.src
                        : content?.icon2
                    }
                    alt=""
                    width={mobile ? 35 : 75}
                    height={mobile ? 35 : 75}
                  />
                  <p
                    className="textCaseStudy"
                    style={{
                      fontWeight: "bold",
                      color: content.fontColor,
                      fontSize: "24px",
                      marginBottom: 0,
                      paddingTop: "2vh",
                    }}
                  >
                    {/* <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  &gt;
                </span> */}
                    {content?.impactNumber2Char}
                    <CountUp
                      start={0}
                      decimals={content?.impactNumber2Decimal}
                      end={content?.impactNumber2}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce={true}
                    />
                    {/* {' '} */}
                    {content?.impactNumber2Text}{" "}
                    {content?.showPlus2 && (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </span>
                    )}
                  </p>
                  <p
                    className="textCaseStudy"
                    dangerouslySetInnerHTML={{
                      __html: content?.impactNumber2Title,
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: mobile ? "14px" : "16px",
                      width: mobile ? "90%" : "80%",
                      fontWeight: "bold",
                    }}
                  ></p>
                </div>
              )}
              {content?.icon3 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: mobile ? "40px" : "",
                    flex: "1 1 0",
                    width: mobile ? "100%" : 0,
                    padding: "10px",
                  }}
                >
                  <img
                    src={
                      content?.icon3?.childImageSharp
                        ? content?.icon3?.childImageSharp?.fluid?.src
                        : content?.icon3
                    }
                    alt=""
                    width={mobile ? 35 : 75}
                    height={mobile ? 35 : 75}
                  />
                  <p
                    className="textCaseStudy"
                    style={{
                      fontWeight: "bold",
                      color: content.fontColor,
                      fontSize: "24px",
                      marginBottom: 0,
                      paddingTop: "2vh",
                    }}
                  >
                    {content?.impactNumber3Char}
                    <CountUp
                      start={0}
                      decimals={content?.impactNumber3Decimal}
                      end={content?.impactNumber3}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce={true}
                    />
                    {/* {' '} */}
                    {content?.impactNumber3Text}{" "}
                    {content?.showPlus3 && (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </span>
                    )}
                  </p>
                  <p
                    className="textCaseStudy"
                    dangerouslySetInnerHTML={{
                      __html: content?.impactNumber3Title,
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: mobile ? "14px" : "16px",
                      width: mobile ? "90%" : "80%",
                      fontWeight: "bold",
                    }}
                  ></p>
                </div>
              )}
              {content?.icon4 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: mobile ? "40px" : "",
                    flex: "1 1 0",
                    width: mobile ? "100%" : 0,
                    padding: "10px",
                  }}
                >
                  <img
                    src={
                      content?.icon4?.childImageSharp
                        ? content?.icon4?.childImageSharp?.fluid?.src
                        : content?.icon4
                    }
                    alt=""
                    width={mobile ? 35 : 75}
                    height={mobile ? 35 : 75}
                  />
                  <p
                    className="textCaseStudy"
                    style={{
                      fontWeight: "bold",
                      color: content.fontColor,
                      fontSize: "24px",
                      marginBottom: 0,
                      paddingTop: "2vh",
                    }}
                  >
                    {content?.impactNumber4Char}
                    <CountUp
                      start={0}
                      decimals={content?.impactNumber4Decimal}
                      end={content?.impactNumber4}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce={true}
                    />
                    {/* {' '} */}
                    {content?.impactNumber4Text}{" "}
                    {content?.showPlus4 && (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </span>
                    )}
                  </p>
                  <p
                    className="textCaseStudy"
                    dangerouslySetInnerHTML={{
                      __html: content?.impactNumber4Title,
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: mobile ? "14px" : "16px",
                      width: mobile ? "90%" : "80%",
                      fontWeight: "bold",
                    }}
                  ></p>
                </div>
              )}
              {content?.icon5 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: mobile ? "40px" : "",
                    flex: "1 1 0",
                    width: mobile ? "100%" : 0,
                    padding: "10px",
                  }}
                >
                  <img
                    src={
                      content?.icon5?.childImageSharp
                        ? content?.icon5?.childImageSharp?.fluid?.src
                        : content?.icon5
                    }
                    alt=""
                    width={mobile ? 35 : 75}
                    height={mobile ? 35 : 75}
                  />
                  <p
                    className="textCaseStudy"
                    style={{
                      fontWeight: "bold",
                      color: content.fontColor,
                      fontSize: "24px",
                      marginBottom: 0,
                      paddingTop: "2vh",
                    }}
                  >
                    {content?.impactNumber5Char}
                    <CountUp
                      start={0}
                      decimals={content?.impactNumber5Decimal}
                      end={content?.impactNumber5}
                      duration={3}
                      enableScrollSpy
                      scrollSpyOnce={true}
                    />
                    {/* {' '} */}
                    {content?.impactNumber5Text}{" "}
                    {content?.showPlus5 && (
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </span>
                    )}
                  </p>
                  <p
                    className="textCaseStudy"
                    dangerouslySetInnerHTML={{
                      __html: content?.impactNumber5Title,
                    }}
                    style={{
                      padding: 0,
                      margin: 0,
                      fontSize: mobile ? "14px" : "16px",
                      fontWeight: "bold",
                    }}
                  ></p>
                </div>
              )}
            </div>
            {content?.downloadInfographicBtn && (
              <div
                className="casestudy-btn-container"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="casestudy-btn"
                  style={{
                    marginTop: "20px",
                    cursor: "pointer",
                    marginBottom: "50px",
                    maxWidth: "270px",
                    background: content?.fontColor,
                    padding: "10px 50px",
                  }}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = content?.infographicGoogleDriveLink;
                    link.target = "_blank";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  {content?.downloadInfographicBtn}
                </button>
              </div>
            )}
          </div>
        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
        {/* <div
        style={{
          height: '5px',
          width: '135px',
          backgroundColor: content?.fontColor,
          margin: '75px auto',
        }}></div> */}
      </>
    );
  };

  const sectionFive = () => {
    return (
      <>
        {" "}
        <FadeInSection>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingTop: "32px",
            }}
            className="case-study-links-container"
          >
            <div
              style={{
                width: mobile ? "80%" : "50%",
                marginBottom: "auto",
                marginTop: mobile ? "10px" : "",
              }}
            >
              {content?.title7 && (
                <div
                  className="headingCaseStudy"
                  style={{
                    textAlign: "left",
                    color: content?.fontColor,
                    paddingTop: mobile ? "25px" : 0,
                    fontSize: mobile ? "22px" : "36px",
                  }}
                >
                  {content?.title7}
                </div>
              )}
              {content?.showBlog && (
                <div>
                  <p
                    className="textCaseStudy"
                    style={{
                      textAlign: "left",
                      marginBottom: "0",
                      paddingBottom: "0",
                      fontSize: mobile ? "18px" : "24px",
                      fontWeight: "600",
                    }}
                  >
                    {content?.blogTitle}
                  </p>
                  <p
                    className="textCaseStudy"
                    style={{
                      textAlign: "left",
                      marginBottom: "0",
                      paddingBottom: "0",
                    }}
                  >
                    {content?.blogDescription}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginTop: "0",
                      paddingTop: "15px",
                      color: content?.fontColor,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      window.location.href = content?.blogLink;
                    }}
                  >
                    Read More{" "}
                    <RightArrow
                      color={content?.fontColor}
                      height="15px"
                      width="15px"
                    />
                  </p>
                </div>
              )}
              {content?.showOpEd && (
                <div>
                  <p
                    className="textCaseStudy"
                    style={{
                      textAlign: "left",
                      marginBottom: "0",
                      paddingBottom: "0",
                      fontSize: mobile ? "18px" : "24px",
                      fontWeight: "600",
                    }}
                  >
                    {content?.opEdTitle}
                  </p>
                  <p
                    className="textCaseStudy"
                    style={{
                      textAlign: "left",
                      marginBottom: "0",
                      paddingBottom: "0",
                    }}
                  >
                    {content?.opEdDescription}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginTop: "0",
                      paddingTop: "15px",
                      color: content?.fontColor,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      window.location.href = content?.opEdLink;
                    }}
                  >
                    Read More{" "}
                    <RightArrow
                      color={content?.fontColor}
                      height="15px"
                      width="15px"
                    />
                  </p>
                </div>
              )}
              {content?.showWebinar && (
                <div>
                  <p
                    className="textCaseStudy"
                    style={{
                      textAlign: "left",
                      marginBottom: "0",
                      paddingBottom: "0",
                      fontSize: mobile ? "18px" : "24px",
                      fontWeight: "600",
                    }}
                  >
                    {content?.webinarTitle}
                  </p>
                  <p
                    className="textCaseStudy"
                    style={{
                      textAlign: "left",
                      marginBottom: "0",
                      paddingBottom: "0",
                    }}
                  >
                    {content?.webinarDescription}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      marginTop: "0",
                      paddingTop: "15px",
                      color: content?.fontColor,
                      cursor: "pointer",
                      fontStyle: "italic",
                    }}
                    onClick={() => {
                      window.location.href = content?.webinarLink;
                    }}
                  >
                    Read More{" "}
                    <RightArrow
                      color={content?.fontColor}
                      height="15px"
                      width="15px"
                    />
                  </p>
                </div>
              )}
            </div>
            {content?.blogSectionImage && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: mobile ? "50px" : "",
                  width: mobile ? "275px" : "500px",
                }}
              >
                <img
                  src={
                    content?.blogSectionImage?.childImageSharp
                      ? content?.blogSectionImage?.childImageSharp?.fluid?.src
                      : content?.blogSectionImage
                  }
                  width={mobile ? "100%" : "80%"}
                  height={"auto"}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            )}
          </div>
        </FadeInSection>
        <FadeInSection>
          <div
            className="partner-with-us"
            style={{ marginTop: mobile ? "100px" : "150px" }}
          >
            {content?.footerText1 && (
              <p className="partner-with-us-main-text">
                {content?.footerText1}
              </p>
            )}
            {content?.footerText2 && <p>{content?.footerText2}</p>}
          </div>
        </FadeInSection>
      </>
    );
  };

  if (!content) {
    return <div />;
  }
  return (
    <section className="section">
      {helmet || ""}
      <div className="media-page-banner">
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            aspectRatio: "2",
            objectFit: "cover",
          }}
        >
          <source
            src={
              content?.bannerImage?.publicURL
                ? content?.bannerImage?.publicURL
                : content?.bannerImage
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="case-study-translucent-dark-overlay" />
      </div>
      {!mobile && showUpIcon && (
        <div className={"up-icon"}>
          <img src={upIcon} onClick={scrollToTop} />
        </div>
      )}
      <FadeInSection>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "0px",
          }}
        >
          <div
            className="old-case-study-main-heading"
            id="needs-section"
            style={{
              backgroundColor: content?.fontColor,
              color: "white",
              fontSize: mobile ? "18px" : "24px",
              width: "90%",
            }}
          >
            {content?.title1}
          </div>
          <div
            className={"old-case-study-sub-heading text-justify"}
            style={{ fontSize: mobile ? "18px" : "24px" }}
          >
            {content?.title2}
          </div>
        </div>
      </FadeInSection>
      {/* Show modal only in mobile */}
      {mobile && (
        <Modal open={modalOpen} onClose={closeModal} center>
          {modalImage && (
            <img
              src={modalImage}
              alt="Full Screen"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
        </Modal>
      )}
      <SectionDivider color={content?.fontColor} />
      {arr.map((option, index) => (
        <React.Fragment key={index}>{renderSection(option)}</React.Fragment>
      ))}
      <FadeInSection>
        <div
          className="headingCaseStudy"
          dangerouslySetInnerHTML={{ __html: content?.successStoriesTitle }}
          style={{
            color: content?.fontColor,
            margin: "auto",
            fontSize: mobile ? "20px" : "28px",
          }}
        ></div>
        <div
          style={{
            marginTop: "125px",
            marginBottom: "150px",
            display: "flex",
            justifyContent: mobile ? "" : "space-evenly",
            flexDirection: mobile ? "column" : "row",
          }}
        >
          <SuccessStoriesSection successStories={content?.showSuccessStories} />
        </div>
      </FadeInSection>
    </section>
  );
};

const OldCaseStudy = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout slug={data.markdownRemark.fields.slug}>
      <OldCaseStudyTemplate
        content={post.frontmatter}
        helmet={
          <Helmet titleTemplate="%s | CaseStudy">
            <title>{`${post.frontmatter.title1}`}</title>
            <meta name="description" content={`${post.frontmatter?.title1}`} />
          </Helmet>
        }
      />
    </Layout>
  );
};

OldCaseStudy.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default OldCaseStudy;

export const pageQuery = graphql`
  query OldCaseStudyQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        fontColor
        icon1 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        icon2 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        icon3 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        icon4 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        icon5 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title1
        title2
        title3
        impactVideoLink
        showImpactVideo
        showImpactCard
        impactCardFontColor
        img1 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        cardTitle1
        cardDescription1
        cardBtn1
        cardLink1
        img2 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        cardTitle2
        cardDescription2
        cardBtn2
        cardLink2
        img3 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        cardTitle3
        cardDescription3
        cardBtn3
        cardLink3

        backgroundMap {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }

        title4
        title5
        title6
        title7
        newsdescription {
          text
        }
        newsletterBtn
        newsletterLink
        blogSectionImage {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        infographicGoogleDriveLink
        downloadInfographicBtn

        showOpEd
        opEdTitle
        opEdLink
        opEdDescription

        showWebinar
        webinarTitle
        webinarLink
        webinarDescription

        showBlog
        blogTitle
        blogLink
        blogDescription

        impactNumber1
        impactNumber1Decimal
        impactNumber1Text
        impactNumber1Title
        impactNumber1Char
        showPlus1
        impactNumber2
        impactNumber2Decimal
        impactNumber2Text
        impactNumber2Title
        impactNumber2Char
        showPlus2
        impactNumber3
        impactNumber3Decimal
        impactNumber3Text
        impactNumber3Title
        impactNumber3Char
        showPlus3
        impactNumber4
        impactNumber4Decimal
        impactNumber4Text
        impactNumber4Title
        impactNumber4Char
        showPlus4
        impactNumber5
        impactNumber5Decimal
        impactNumber5Text
        impactNumber5Title
        impactNumber5Char
        showPlus5

        infographic1 {
          img {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 62) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        infographic2 {
          img {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 62) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        bannerImage {
          publicURL
        }
        motionGraphic {
          publicURL
        }
        footerText1
        footerText2
        successStoriesTitle
        showSuccessStories
      }
    }
  }
`;
