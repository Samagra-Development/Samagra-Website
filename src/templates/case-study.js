import "../styles/CaseStudy.scss";
import { graphql } from "gatsby";
import React, { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import img2 from "../../static/img/kskimg2.gif";
import infographic from "../../static/img/infographic.gif";
import { animateScroll as scroll } from "react-scroll";
import upIcon from "../img/up-arrow-png-20.png";
import apostrophe_start from "../img/apostrophe_start.svg";
import apostrophe_end from "../img/apostrophe_end.svg";
import spacer from "../img/spacer.png";
import amritSeriesDoodle from "../../static/img/amrit-series-text-doodle.svg";
import amritSeriesBubble from "../../static/img/amrit-series-text-bubble.svg";
import gosugamImpactImg from "../../static/img/gosugam-impact.jpg";
import akailaunch from "../../static/img/ama-krushai-launch.png";
import gosugamLinksImg from "../../static/img/gosugam-links.jpeg";
import { RightArrow } from "../components/CaseStudyComponents/RightArrow";
import { Modal } from "react-responsive-modal";
import { debounce } from "lodash";
import "react-responsive-modal/styles.css";
import CountUp from "react-countup";
import SuccessStoriesSection from "../components/CaseStudyComponents/SuccessStoriesSection";
import SectionDivider from "../components/CaseStudyComponents/SectionDivider";
import ReactMarkdown from 'react-markdown';

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

export const CaseStudyTemplate = ({ content, helmet }) => {
  const [mobile, setMobile] = useState(false);
  const [showUpIcon, setShowUpIcon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const arr = content?.sectionSequence.trim()
    ? content.sectionSequence.trim().split(" ")
    : ["1", "2", "3", "4", "5", "6"];
  const isShowImpactIcon =
    content?.icon1 ||
    content?.icon2 ||
    content?.icon3 ||
    content?.icon4 ||
    content?.icon5;
  const isCaseStudyLinkContainer =
    content?.title8 ||
    content?.blogTitle ||
    content?.showOpEd ||
    content?.showWebinar;
  const isFooter = content?.footerText1 || content?.footerText2;
  const isSectionOne =
    content?.title2 || content?.title3 || content?.impactVideoLink;
  const isSectionTwo = content?.title4 || content?.motionGraphic1;
  const isSectionThree =
    content?.title5 ||
    content?.title6 ||
    content?.infographic1 ||
    content?.infographic2;
  const isSectionFour = content?.motionGraphic2 && true;
  const isSectionFive =
    isShowImpactIcon || content?.title7 || content?.downloadInfographicBtn;
  const isSectionSix =
    isCaseStudyLinkContainer || content?.blogSectionImage || isFooter;

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
        return isSectionOne ? sectionOne() : <></>;
      case "2":
        return isSectionTwo ? sectionTwo() : <></>;
      case "3":
        return isSectionThree ? sectionThree() : <></>;
      case "4":
        return isSectionFour ? sectionFour() : <></>;
      case "5":
        return isSectionFive ? sectionFive() : <></>;
      case "6":
        return isSectionSix ? sectionSix() : <></>;
      default:
        return <></>;
    }
  };

  const sectionOne = () => {
    return (
      <>
        <FadeInSection>
          <div
            className="case-study-summary-container"
            style={{ marginTop: mobile ? "75px" : "150px" }}
          >
            {/* <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <div
              id="img1"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                border: '3px solid #A97F2B',
                borderRadius: '10px',
              }}></div>
          </div> */}
            <div className="case-study-summary-text" id="impact-video-section">
              {content?.title2 && (
                <div
                  className="headingCaseStudy"
                  style={{
                    textAlign: "center",
                    color: content?.fontColor,
                    paddingBottom: "35px",
                    paddingTop: !mobile ? "5px" : "24px",
                    fontSize: mobile ? "18px" : "36px",
                  }}
                >
                  {content?.title2}
                </div>
              )}
              {content?.title3 && (
                <div
                  className="textCaseStudy"
                  style={{
                    textAlign: "center",
                    // color: content?.fontColor,
                    // paddingBottom: '25px',
                    paddingTop: !mobile ? "5px" : "50px",
                    fontSize: mobile ? "18px" : "24px",
                  }}
                >
                  {content?.title3}
                </div>
              )}
              {content?.impactVideoLink && (
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
                      // width: '100vw',
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

                    {/* {!mobile && <LineDrawingOnScrollLR id={'clip2'} />} */}
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
                    {/* <div>
                <img
                src={amritSeriesBubble}
                alt=""
                width={mobile ? '120px' : '150px'}
                />
              </div> */}
                  </div>
                </>
              )}
              {/* <div className="textCaseStudy" style={{ textAlign: 'left' }}>
              To transform the way government officials use data and real-time
              analytics on key agri-operations, with 4 sharp areas of focus:
              <br></br><br></br>
              {`->`} <b>Scheme Delivery:</b> Delivery of schemes & services provided by
              the department<br></br>
              {`->`} <b>Plant Protection:</b> Relief against pest outbreaks and weather
              disruptions<br></br>
              {`->`} <b>Data Backed Reviews:</b> Review meetings at all levels coupled
              with performance based nudges and escalation protocols<br></br>
              {`->`} <b>Pulse-check on Ecosystem:</b> Policy reform & enhancements
              basis responsiveness of stakeholders
            </div> */}
            </div>
          </div>
        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
      </>
    );
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
                // color: content?.fontColor,
                // paddingBottom: '25px',
                paddingTop: !mobile ? "5px" : "50px",
                fontSize: mobile ? "18px" : "24px",
                width: "80%",
                margin: "auto",
              }}
            >
              {content?.title4}
            </div>
          )}
          {content?.motionGraphic1 && (
            <div
              style={{
                marginTop: !mobile ? "10px" : "",
              }}
            >
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
                    content?.motionGraphic1?.publicURL
                      ? content?.motionGraphic1?.publicURL
                      : content?.motionGraphic1
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              {/* <div
              className="headingCaseStudy"
              style={{
                position: 'relative',
                padding: '10px',
                top: '250px',
                color: content?.fontColor,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                width: '100%',
                margin: 'auto',
                fontSize: mobile ? '20px' : '30px',
              }}>
              This large scale transformation was enabled by an Integrated
              Decision Support system (DSS) with the following key use cases:
            </div> */}
            </div>
          )}
        </FadeInSection>
        {/* <div className="spacer">
            <img src={spacer} alt="" />
          </div> */}
        <SectionDivider color={content?.fontColor} />
      </>
    );
  };

  const sectionThree = () => {
    return (
      <>
        <FadeInSection>
          {content?.title5 && (
            <div
              className="textCaseStudy"
              id="use-cases-section"
              style={{ fontSize: mobile ? "18px" : "24px" }}
            >
              {content?.title5}
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
                              borderImage:
                                "linear-gradient(to bottom, #418F37, #FFE81D) 1",
                              display: mobile ? "none" : "block",
                              margin: "0 10px",
                            }}
                          ></div>
                        )}
                      </>
                    );
                  })}

                  {/* <div className="infographic-img">
                <img
                  src={gosugamInfographic1Img3}
                  alt=""
                  style={{ maxWidth: '250px' }}
                />
              </div>
              <div
                style={{
                  height: '500px',
                  width: '1px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'transparent',
                  borderImage: 'linear-gradient(to bottom, #418F37, #FFE81D) 1',
                  display: mobile ? 'none' : 'block',
                  margin: '0 10px',
                }}></div>
              <div className="infographic-img">
                <img
                  src={gosugamInfographic1Img4}
                  alt=""
                  style={{ maxWidth: '250px' }}
                />
              </div> */}
                </div>
              )}
            </div>
          )}

          {content?.title6 && (
            <div
              className="textCaseStudy"
              style={{ fontSize: mobile ? "18px" : "24px" }}
            >
              {content?.title6}
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

                  {/* <div
                className="infographic-img"
                style={{ margin: mobile ? '15px 0' : '0 15px' }}>
                <img
                  src={gosugamInfographic2Img3}
                  alt=""
                  style={{ maxWidth: '250px' }}
                />
              </div>

              <div
                className="infographic-img"
                style={{ margin: mobile ? '15px 0' : '0 15px' }}>
                <img
                  src={gosugamInfographic2Img4}
                  alt=""
                  style={{ maxWidth: '250px' }}
                />
              </div> */}
                </div>
              )}
            </div>
          )}
        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
      </>
    );
  };

  const sectionFour = () => {
    return (
      <>
        <FadeInSection>
          <div
            style={{
              marginTop: !mobile ? "10px" : "",
            }}
          >
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
                  content?.motionGraphic2?.publicURL
                    ? content?.motionGraphic2?.publicURL
                    : content?.motionGraphic2
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {/* <div
              className="headingCaseStudy"
              style={{
                position: 'relative',
                padding: '10px',
                top: '250px',
                color: content?.fontColor,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                width: '100%',
                margin: 'auto',
                fontSize: mobile ? '20px' : '30px',
              }}>
              This large scale transformation was enabled by an Integrated
              Decision Support system (DSS) with the following key use cases:
            </div> */}
          </div>
        </FadeInSection>
        <SectionDivider color={content?.fontColor} />
      </>
    );
  };

  const sectionFive = () => {
    return (
      <>
        <FadeInSection>
          <div className="impact">
            {content?.title7 && (
              <div
                className="headingCaseStudy"
                id="impact-numbers-section"
                style={{
                  textAlign: "center",
                  color: content?.fontColor,
                  // paddingBottom: '25px',
                  width: "80%",
                  margin: "auto",
                  paddingTop: "50px",
                  fontSize: mobile ? "18px" : "24px",
                }}
              >
                {content?.title7}
              </div>
            )}
            {isShowImpactIcon && (
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
                        fontSize: "24px",
                        marginBottom: 0,
                        paddingTop: 0,
                      }}
                    >
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
                            // color: content?.fontColor,
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
                        // color: content?.fontColor,
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
                        fontSize: "24px",
                        marginBottom: 0,
                        paddingTop: 0,
                      }}
                    >
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
                            // color: content?.fontColor,
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
                        // color: content?.fontColor,
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
                        fontSize: "24px",
                        marginBottom: 0,
                        paddingTop: 0,
                      }}
                    >
                      <CountUp
                        start={0}
                        decimals={content?.impactNumber3Decimal}
                        end={content?.impactNumber3}
                        duration={3}
                        enableScrollSpy
                        scrollSpyOnce={true}
                      />
                      {/* {" "} */}
                      {content?.impactNumber3Text}{" "}
                      {content?.showPlus3 && (
                        <span
                          style={{
                            // color: content?.fontColor,
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
                        // color: content?.fontColor,
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
                        fontSize: "24px",
                        marginBottom: 0,
                        paddingTop: 0,
                      }}
                    >
                      <CountUp
                        start={0}
                        decimals={content?.impactNumber4Decimal}
                        end={content?.impactNumber4}
                        duration={3}
                        enableScrollSpy
                        scrollSpyOnce={true}
                      />
                      {content?.impactNumber4Text}{" "}
                      {content?.showPlus4 && (
                        <span
                          style={{
                            // color: content?.fontColor,
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
                        // color: content?.fontColor,
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
                        fontSize: "24px",
                        marginBottom: 0,
                        paddingTop: 0,
                      }}
                    >
                      <CountUp
                        start={0}
                        decimals={content?.impactNumber5Decimal}
                        end={content?.impactNumber5}
                        duration={3}
                        enableScrollSpy
                        scrollSpyOnce={true}
                      />
                      {content?.impactNumber5Text}{" "}
                      {content?.showPlus5 && (
                        <span
                          style={{
                            // color: content?.fontColor,
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
                        // color: content?.fontColor,
                        fontWeight: "bold",
                      }}
                    ></p>
                  </div>
                )}
              </div>
            )}
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
      </>
    );
  };

  const sectionSix = () => {
    return (
      <>
        {(isCaseStudyLinkContainer || content?.blogSectionImage) && (
          <>
            <FadeInSection>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
                className="case-study-links-container"
              >
                {isCaseStudyLinkContainer && (
                  <div
                    style={{
                      width: mobile ? "80%" : "50%",
                      marginBottom: "auto",
                      marginTop: mobile ? "10px" : "",
                    }}
                  >
                    {content?.title8 && (
                      <div
                        className="headingCaseStudy"
                        style={{
                          textAlign: "left",
                          color: content?.fontColor,
                          paddingTop: mobile ? "25px" : 0,
                          fontSize: mobile ? "22px" : "36px",
                        }}
                      >
                        {content?.title8}
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
                            fontSize: mobile ? "16px" : "18px",
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
                            fontStyle: "italic",
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
                            fontSize: mobile ? "16px" : "18px",
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
                            fontStyle: "italic",
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
                            fontSize: mobile ? "16px" : "18px",
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
                )}
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
                    {/* <div
              style={{
                position: 'relative',
                zIndex: '0',
                left: '30px',
                top: '30px',
                height: mobile ? '150px' : '250px',
                width: mobile ? '100px' : '125px',
                backgroundImage: `url(${gosugamLinksImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
              }}></div> */}
                    <img
                      src={
                        content?.blogSectionImage?.childImageSharp
                          ? content?.blogSectionImage?.childImageSharp?.fluid
                              ?.src
                          : content?.blogSectionImage
                      }
                      width={mobile ? "100%" : "80%"}
                      height={"auto"}
                      style={{ borderRadius: "10px" }}
                    />
                    {/* <div
              style={{
                position: 'relative',
                zIndex: '2',
                left: '-30px',
                top: '30px',
                height: mobile ? '150px' : '250px',
                width: mobile ? '100px' : '125px',
                backgroundImage: `url(${akailaunch})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
              }}></div> */}
                  </div>
                )}
              </div>
            </FadeInSection>
            <SectionDivider color={content?.fontColor} />
          </>
        )}

        {/* <div className="spacer">
        <img src={spacer} alt="" />
      </div> */}
        {content?.showTestimonial && (
          <>
            <FadeInSection>
              <div className="testimonials" style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <img src={apostrophe_start} alt="" />
                </div>
                <i className="testimonial-text">{content?.testimonialText}</i>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={apostrophe_end} alt="" />
                </div>
                <div className="testimonial-author">
                  <img
                    src={
                      content?.testimonialImg?.childImageSharp
                        ? content?.testimonialImg?.childImageSharp?.fluid?.src
                        : content?.testimonialImg
                    }
                    alt=""
                  />
                  <div>
                    <p className="testimonial-author-name">
                      {content?.testimonialAuthor}
                    </p>
                    <p
                      className="testimonial-author-designation"
                      style={{ color: "#a97f2b" }}
                    >
                      {content?.testimonialAuthorDesignation}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <SectionDivider color={content?.fontColor} />
          </>
        )}

        {/* <div className="spacer">
        <img src={spacer} alt="" />
      </div> */}
      {isFooter && (
  <FadeInSection>
    <div
      className="partner-with-us"
      style={{ marginTop: mobile ? "100px" : "150px" }}
    >
      {content?.footersubText1 && (
        <div className="partner-with-us-secondary-text">
          <ReactMarkdown>{content.footersubText1}</ReactMarkdown>
        </div>
      )}
      {content?.footerText1 && (
        <p className="partner-with-us-main-text">
          {content.footerText1}
        </p>
      )}
      {content?.footerText2 && <p>{content.footerText2}</p>}
    </div>
  </FadeInSection>
)}

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
      {content?.showSideNavbar ? (
        <div className="share" style={{ border: "1px solid #FFA500" }}>
          {content?.showsideIcon1 ? (
            <div
              style={{ textAlign: "center" }}
              onClick={() => {
                const ref = document.getElementById("needs-section");
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <img
                src={
                  content?.sideIcon1?.childImageSharp
                    ? content?.sideIcon1?.childImageSharp?.fluid?.src
                    : content?.sideIcon1
                }
                alt=""
              />
              <p
                style={{
                  color: content?.fontColor,
                  fontSize: mobile ? "5px" : "9px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {content?.sideIcon1Text}
              </p>
            </div>
          ) : null}
          {content?.showsideIcon2 ? (
            <div
              style={{ textAlign: "center" }}
              onClick={() => {
                const ref = document.getElementById("impact-video-section");
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <img
                src={
                  content?.sideIcon2?.childImageSharp
                    ? content?.sideIcon2?.childImageSharp?.fluid?.src
                    : content?.sideIcon2
                }
                alt=""
              />
              <p
                style={{
                  color: "",
                  fontSize: mobile ? "5px" : "9px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {content?.sideIcon2Text}
              </p>
            </div>
          ) : null}
          {content?.showsideIcon3 ? (
            <div
              style={{ textAlign: "center" }}
              onClick={() => {
                const ref = document.getElementById("use-cases-section");
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <img
                src={
                  content?.sideIcon3?.childImageSharp
                    ? content?.sideIcon3?.childImageSharp?.fluid?.src
                    : content?.sideIcon3
                }
                alt=""
              />
              <p
                style={{
                  color: content?.fontColor,
                  fontSize: mobile ? "5px" : "9px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {content?.sideIcon3Text}
              </p>
            </div>
          ) : null}
          {content?.showsideIcon4 ? (
            <div
              style={{ textAlign: "center" }}
              onClick={() => {
                const ref = document.getElementById("impact-numbers-section");
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <img
                src={
                  content?.sideIcon4?.childImageSharp
                    ? content?.sideIcon4?.childImageSharp?.fluid?.src
                    : content?.sideIcon4
                }
                alt=""
              />
              <p
                style={{
                  color: content?.fontColor,
                  fontSize: mobile ? "5px" : "9px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {content?.sideIcon4Text}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
      {/* <div className="spacer first-spacer">
        <img src={spacer} alt="" />
      </div> */}
      <FadeInSection>
        <div
          className="case-study-main-heading headingCaseStudy"
          id="needs-section"
          style={{
            color: content?.fontColor,
            fontSize: mobile ? "18px" : "24px",
            width: "80%",
            margin: "auto",
            marginTop: "100px",
          }}
        >
          {content?.title1}
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
      {/* <div className="spacer">
        <img src={spacer} alt="" />
      </div> */}
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
      {/* <div className="spacer">
        <img src={spacer} alt="" />
      </div> */}
    </section>
  );
};

const CaseStudy = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout slug={data.markdownRemark.fields.slug}>
      <CaseStudyTemplate
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

CaseStudy.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CaseStudy;

export const pageQuery = graphql`
  query CaseStudyQuery($id: String!) {
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
        sectionSequence
        title1
        title2
        title3
        impactVideoLink
        title4
        title5
        title6
        title7

        blogSectionImage {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        infographicGoogleDriveLink
        downloadInfographicBtn

        showWebinar
        webinarTitle
        webinarLink
        webinarDescription

        showOpEd
        opEdTitle
        opEdLink
        opEdDescription

        title8
        blogTitle
        blogLink
        showBlog
        blogDescription

        impactNumber1
        impactNumber1Decimal
        impactNumber1Text
        impactNumber1Title
        showPlus1
        impactNumber2
        impactNumber2Decimal
        impactNumber2Text
        impactNumber2Title
        showPlus2
        impactNumber3
        impactNumber3Decimal
        impactNumber3Text
        impactNumber3Title
        showPlus3
        impactNumber4
        impactNumber4Decimal
        impactNumber4Text
        impactNumber4Title
        showPlus4
        impactNumber5
        impactNumber5Decimal
        impactNumber5Text
        impactNumber5Title
        showPlus5

        sideIcon1 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sideIcon2 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sideIcon3 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sideIcon4 {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
        showSideNavbar
        sideIcon1Text
        sideIcon2Text
        sideIcon3Text
        sideIcon4Text
        showsideIcon1
        showsideIcon2
        showsideIcon3
        showsideIcon4
        bannerImage {
          publicURL
        }
        motionGraphic1 {
          publicURL
        }
        motionGraphic2 {
          publicURL
        }
        showTestimonial
        testimonialText
        testimonialAuthor
        testimonialAuthorDesignation
        testimonialImg {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 62) {
              ...GatsbyImageSharpFluid
            }
          }
        }
          
        footerText1
        footerText2
        footersubText1
        successStoriesTitle
        showSuccessStories
      }
    }
  }
`;
