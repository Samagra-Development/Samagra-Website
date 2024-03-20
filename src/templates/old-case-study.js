import '../styles/CaseStudy.scss';
import { graphql } from 'gatsby';
import React, { useState, useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import img2 from '../../static/img/kskimg2.gif';
import infographic from '../../static/img/infographic.gif';
import { animateScroll as scroll } from 'react-scroll';
import upIcon from '../img/up-arrow-png-20.png';
import apostrophe_start from '../img/apostrophe_start.svg';
import apostrophe_end from '../img/apostrophe_end.svg';
import spacer from '../img/spacer.png';
import amritSeriesDoodle from '../../static/img/amrit-series-text-doodle.svg';
import amritSeriesBubble from '../../static/img/amrit-series-text-bubble.svg';
import gosugamImpactImg from '../../static/img/gosugam-impact.jpg';
import akailaunch from '../../static/img/ama-krushai-launch.png';
import gosugamLinksImg from '../../static/img/gosugam-links.jpeg';
import { RightArrow } from '../components/CaseStudyComponents/RightArrow';
import { Modal } from 'react-responsive-modal';
import { debounce } from 'lodash';
import 'react-responsive-modal/styles.css';
import CountUp from 'react-countup';
import SuccessStoriesSection from '../components/CaseStudyComponents/SuccessStoriesSection';
import SectionDivider from '../components/CaseStudyComponents/SectionDivider';

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
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}>
      {props.children}
    </div>
  );
}

export const CaseStudyTemplate = ({ content, helmet }) => {
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
    console.log("hello",content,arr)
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderSection = (option) => {
    switch (option) {
      case '1':
        return sectionOne();
      case '2':
        return sectionTwo();
      case '3':
        return sectionThree();
      case '4':
        return sectionFour();
      case '5':
        return sectionFive();
      default:
        return <></>;
    }
  };

  const sectionTwo = ()=> {
    return <><FadeInSection> 
      {content?.title4 && <div
        className="textCaseStudy"
        style={{
          textAlign: 'center',
          paddingTop: !mobile ? '5px' : '50px',
          fontSize: mobile ? '20px' : '30px',
          width: '80%',
          margin: 'auto',
        }}>
        {content?.title4}
          </div>}
      <div style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',padding:"32px 20vh", gap:"64px"}}>
                {content?.motionGraphic && <div
            style={{
                display:"flex",justifyContent:"center",
              marginTop: !mobile ? '10px' : '',
            }}>
            <video
              autoPlay
              loop
              muted
              style={{
                flex:"1fr",
                width: '100%',
                aspectRatio: '2',
                objectFit: 'cover',
              }}>
              <source src={content?.motionGraphic?.publicURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>}
          <div style={{flex:"1fr", display:"flex" , flexDirection:"column", fontSize:"18px"}}>
            <p>{content?.newsdescription1}</p>
            <p>{content?.newsdescription2}</p>
            {content?.newsletterBtn && <div
            className="casestudy-btn-container"
           >
            <button
              style={{
                cursor: 'pointer',
                background: content?.fontColor,
                padding: '4px 30px',
               color: "white",
               outline: "none",
               borderRadius: "8px",
               transition: "transform 0.2s ease",
              }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = content?.newsletterLink;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
              {content?.newsletterBtn}
            </button>
          </div>}</div>
            </div>
      </FadeInSection>
      <SectionDivider color={content?.fontColor}/></>
  }

  const sectionOne = ()=> {
    return <><FadeInSection>
         {content?.title3 && <div
            className="textCaseStudy"
            id="use-cases-section"
            style={{ fontSize: mobile ? '20px' : '30px' }}>
            {content?.title3}
          </div>}

          {content?.infographic1 && <div
            className="infographic1"
            style={{ marginTop: '75px', marginBottom: '75px' }}>
            {content?.infographic1?.[0]?.img && <div
              className="infographic-img"
              style={{ width: 'fit-content', margin: 'auto' }}>
              <img
                src={content?.infographic1?.[0]?.img?.childImageSharp?.fluid?.src}
                alt=""
                style={{ maxWidth: '200px' }}
              />
            </div>}
            {content?.infographic1.length>1 && <div
              style={{
                display: 'flex',
                flexWrap: "wrap",
                justifyContent: 'center',
                flexDirection: mobile ? 'column' : 'row',
                alignItems: mobile ? 'center' : 'flex-start',
                padding: "0 15vw"
              }}>
              {content?.infographic1?.map((item, index, array) => {
                if(index === 0) return null;
                return (
                  <>
                    <div className="infographic-img">
                      <img
                        src={item?.img?.childImageSharp?.fluid?.src}
                        alt=""
                        style={{ maxWidth: '250px' }}
                      />
                    </div>
                    {/* Check if it's not the last element */}
                    {index !== array.length - 1 && (
                      <div
                        style={{
                          height: '450px',
                          width: '1px',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'transparent',
                          borderImage:
                            'linear-gradient(to bottom, #418F37, #FFE81D) 1',
                          display: mobile ? 'none' : 'block',
                          margin: '0 10px',
                        }}></div>
                    )}
                  </>
                );
              })} 
            </div>}
          </div>}

          {content?.infographic2 && <div
            className="infographic2"
            style={{ marginTop: '75px', marginBottom: '75px' }}>
          {content?.infographic2?.[0]?.img &&  <div
              className="infographic-img"
              style={{ width: 'fit-content', margin: '15px auto' }}>
              <img
                src={content?.infographic2?.[0]?.img?.childImageSharp?.fluid?.src}
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
                padding:"0 18vw"
              }}>
              {content?.infographic2?.map((item, index) => {
                if(index === 0) return null;
                return (
                  <div
                    className="infographic-img"
                    style={{ margin: mobile ? '15px 0' : '0 5px' }}>
                    <img
                      src={item?.img?.childImageSharp?.fluid?.src}
                      alt=""
                      style={{ maxWidth: '250px' }}
                    />
                  </div>
                );
              })}
            </div>}
           </div>}
          </FadeInSection>
          <SectionDivider color={content?.fontColor}/></>
  }

  const sectionThree = ()=> {
    return <><FadeInSection>
        <div
          className="case-study-summary-container"
          style={{ marginTop: mobile ? '75px' : '100px' }}>
          <div className="case-study-summary-text" id="impact-video-section">
            {content?.title5 && <div
              className="textCaseStudy"
              style={{
                textAlign: 'center',
                paddingTop: !mobile ? '5px' : '50px',
                fontSize: mobile ? '20px' : '30px',
              }}>
              {content?.title5}
            </div>}
            {content?.showImpactVideo && <><div
              style={{
                textAlign: 'right',
                width: '66vw',
                minWidth: '350px',
                margin: 'auto',
              }}>
              <img
                src={amritSeriesDoodle}
                alt=""
                width="32px"
                style={{
                  marginLeft: '4px',
                  marginTop: mobile ? '30px' : '50px',
                }}
              />
            </div>
            <div
              style={{
                textAlign: 'center',
              }}>
              <div className="impact-video">
                <iframe
                  style={{
                    minHeight: '150px',
                    minWidth: '300px',
                    height: '30vw',
                    width: '60vw',
                    padding: '10px',
                    borderWidth: '1px',
                    borderImage:
                      'linear-gradient(to right, #418F37, #FFE81D) 1',
                    borderImageSlice: 1,
                  }}
                  src={content?.impactVideoLink}
                  // title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                  allowFullScreen></iframe>
              </div>
            </div>
            <div
              style={{
                width: '66vw',
                minWidth: '350px',
                display: 'flex',
                justifyContent: 'space-between',
                margin: 'auto',
                marginBottom: mobile ? '50px' : '30px',
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <img
                  src={amritSeriesDoodle}
                  alt=""
                  width="32px"
                  style={{
                    marginLeft: '4px',
                    transform: 'scaleX(-1) scaleY(-1)',
                  }}
                />
              </div>
            </div></>}
             {/* <div class="card">
              <img src={content?.blogSectionImage?.childImageSharp?.fluid?.src} alt="Card background image" />
              <div class="card-content">
               <h3>Heading Text</h3>
               <p>This is a brief description of the card content.</p>
                 <a href="#" class="learn-more">Learn More</a>
             </div> */}
  {/* </div> */}

          </div>
        </div>
      </FadeInSection> 
       <SectionDivider color={content?.fontColor}/></>
  }

  const sectionFour = ()=> {
    return <><FadeInSection>
        <div className="impact">
          {content?.title6 && <div
            className="headingCaseStudy"
            id="impact-numbers-section"
            style={{
              textAlign: 'center',
              color: content?.fontColor,
              width: '80%',
              margin: 'auto',
              paddingTop: '50px',
              fontSize: mobile ? '20px' : '30px',
            }}>
            {content?.title6}
          </div>}
         <div
            style={{
              width: '80%',
              margin: '50px auto',
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: mobile ? 'column' : 'row',
            }}>
            {content?.icon1 && <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 1 0',
                width: mobile ? '100%' : 0,
                padding: '10px',
              }}>
              <img
                src={content?.icon1?.childImageSharp?.fluid?.src}
                alt=""
                width={mobile ? 35 : 75}
                height={mobile ? 35 : 75}
              />
              <p
                className="textCaseStudy"
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginBottom: 0,
                  paddingTop: 0,
                }}>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  #
                </span>
                <CountUp
                  start={0}
                  decimals={content?.impactNumber1Decimal}
                  end={content?.impactNumber1}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce={true}
                />{' '}
                {content?.impactNumber1Text}{' '}
                {content?.showPlus1 && <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  +
                </span>}
              </p>
              <p
                className="textCaseStudy"
                dangerouslySetInnerHTML={{
                  __html: content?.impactNumber1Title,
                }}
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: mobile ? '12px' : '14px',
                  width: mobile ? '90%' : '80%',
                  fontWeight: 'bold',
                }}></p>
            </div>}
            {content?.icon2 && <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: mobile ? '40px' : '',
                flex: '1 1 0',
                width: mobile ? '100%' : 0,
                padding: '10px',
              }}>
              <img
                src={content?.icon2?.childImageSharp?.fluid?.src}
                alt=""
                width={mobile ? 35 : 75}
                height={mobile ? 35 : 75}
              />
              <p
                className="textCaseStudy"
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginBottom: 0,
                  paddingTop: 0,
                }}>
                    <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  &gt;
                </span>
                <CountUp
                  start={0}
                  decimals={content?.impactNumber2Decimal}
                  end={content?.impactNumber2}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce={true}
                />{' '}
                {content?.impactNumber2Text}{' '}
                {content?.showPlus2 && <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  +
                </span>}
              </p>
              <p
                className="textCaseStudy"
                dangerouslySetInnerHTML={{
                  __html: content?.impactNumber2Title,
                }}
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: mobile ? '12px' : '14px',
                  width: mobile ? '90%' : '80%',
                  fontWeight: 'bold',
                }}></p>
            </div>}
            {content?.icon3 && <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: mobile ? '40px' : '',
                flex: '1 1 0',
                width: mobile ? '100%' : 0,
                padding: '10px',
              }}>
              <img
                src={content?.icon3?.childImageSharp?.fluid?.src}
                alt=""
                width={mobile ? 35 : 75}
                height={mobile ? 35 : 75}
              />
              <p
                className="textCaseStudy"
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginBottom: 0,
                  paddingTop: 0,
                }}>
                <CountUp
                  start={0}
                  decimals={content?.impactNumber3Decimal}
                  end={content?.impactNumber3}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce={true}
                />
                {content?.impactNumber3Text}{' '}
                {content?.showPlus3 && <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  +
                </span>}
              </p>
              <p
                className="textCaseStudy"
                dangerouslySetInnerHTML={{
                  __html: content?.impactNumber3Title,
                }}
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: mobile ? '12px' : '14px',
                  width: mobile ? '90%' : '80%',
                  fontWeight: 'bold',
                }}></p>
            </div>}
            {content?.icon4 && <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: mobile ? '40px' : '',
                flex: '1 1 0',
                width: mobile ? '100%' : 0,
                padding: '10px',
              }}>
              <img
                src={content?.icon4?.childImageSharp?.fluid?.src}
                alt=""
                width={mobile ? 35 : 75}
                height={mobile ? 35 : 75}
              />
              <p
                className="textCaseStudy"
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginBottom: 0,
                  paddingTop: 0,
                }}>
                <CountUp
                  start={0}
                  decimals={content?.impactNumber4Decimal}
                  end={content?.impactNumber4}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce={true}
                />
                {content?.impactNumber4Text}{' '}
                {content?.showPlus4 && <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  +
                </span>}
              </p>
              <p
                className="textCaseStudy"
                dangerouslySetInnerHTML={{
                  __html: content?.impactNumber4Title,
                }}
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: mobile ? '12px' : '14px',
                  width: mobile ? '90%' : '80%',
                  fontWeight: 'bold',
                }}></p>
            </div>}
            {content?.icon1 && <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: mobile ? '40px' : '',
                flex: '1 1 0',
                width: mobile ? '100%' : 0,
                padding: '10px',
              }}>
              <img
                src={content?.icon5?.childImageSharp?.fluid?.src}
                alt=""
                width={mobile ? 35 : 75}
                height={mobile ? 35 : 75}
              />
              <p
                className="textCaseStudy"
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginBottom: 0,
                  paddingTop: 0,
                }}>
                <CountUp
                  start={0}
                  decimals={content?.impactNumber5Decimal}
                  end={content?.impactNumber5}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce={true}
                />
                {content?.impactNumber5Text}{' '}
                {content?.showPlus5 && <span
                  style={{
                    fontWeight: 'bold',
                  }}>
                  +
                </span>}
              </p>
              <p
                className="textCaseStudy"
                dangerouslySetInnerHTML={{
                  __html: content?.impactNumber5Title,
                }}
                style={{
                  padding: 0,
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}></p>
            </div>}
          </div>
          {content?.downloadInfographicBtn && <div
            className="casestudy-btn-container"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <button
              className="casestudy-btn"
              style={{
                marginTop: '20px',
                cursor: 'pointer',
                marginBottom: '50px',
                maxWidth: '270px',
                background: content?.fontColor,
                padding: '10px 50px',
              }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = content?.infographicGoogleDriveLink;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
              {content?.downloadInfographicBtn}
            </button>
          </div>}
        </div>
      </FadeInSection>
      <SectionDivider color={content?.fontColor}/>
       {/* <div
        style={{
          height: '5px',
          width: '135px',
          backgroundColor: content?.fontColor,
          margin: '75px auto',
        }}></div> */}
        </>
  }

  const sectionFive = ()=> {
    return <> <FadeInSection>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: "32px"
          }}
          className="case-study-links-container">
          <div
            style={{
              width: mobile ? '80%' : '50%',
              marginBottom: 'auto',
              marginTop: mobile ? '10px' : '',
            }}>
            {content?.title7 && <div
              className="headingCaseStudy"
              style={{
                textAlign: 'left',
                color: content?.fontColor,
                paddingTop: mobile ? '25px' : 0,
                fontSize: mobile ? '20px' : '30px',
              }}>
              {content?.title7}
            </div>}
            {content?.blogTitle && <div>
              <p
                className="textCaseStudy"
                style={{
                  textAlign: 'left',
                  marginBottom: '0',
                  paddingBottom: '0',
                  fontSize: mobile ? '18px' : '28px',
                }}>
                Blog
              </p>
              <p
                className="textCaseStudy"
                style={{
                  textAlign: 'left',
                  marginBottom: '0',
                  paddingBottom: '0',
                }}>
                {content?.blogTitle}
              </p>
              <p
                style={{
                  textAlign: 'left',
                  marginTop: '0',
                  paddingTop: '15px',
                  color: content?.fontColor,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onClick={() => {
                  window.location.href = content?.blogLink;
                }}>
                Read More{' '}
                <RightArrow
                  color={content?.fontColor}
                  height="15px"
                  width="15px"
                />
              </p>
            </div>}
            {content?.showOpEd && (
              <div>
                <p
                  className="textCaseStudy"
                  style={{
                    textAlign: 'left',
                    marginBottom: '0',
                    paddingBottom: '0',
                    fontSize: mobile ? '18px' : '28px',
                  }}>
                  Op-Ed
                </p>
                <p
                  className="textCaseStudy"
                  style={{
                    textAlign: 'left',
                    marginBottom: '0',
                    paddingBottom: '0',
                  }}>
                  {content?.opEdTitle}
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    marginTop: '0',
                    paddingTop: '15px',
                    color: content?.fontColor,
                    cursor: 'pointer',
                    textDecoration:"underline"
                  }}
                  onClick={() => {
                    window.location.href = content?.opEdLink;
                  }}>
                  Read More{' '}
                  <RightArrow
                    color={content?.fontColor}
                    height="15px"
                    width="15px"
                  />
                </p>
              </div>
            )}
          </div>
          {content?.blogSectionImage && <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              marginTop: mobile ? '50px' : '',
            }}>
            <div
              style={{
                position: 'relative',
                zIndex: '1',
                height: mobile ? '275px' : '500px',
                width: mobile ? '275px' : '500px',
                backgroundImage: `url(${content?.blogSectionImage?.childImageSharp?.fluid?.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
              }}></div>
          </div>}
        </div>
      </FadeInSection>

      <FadeInSection>
        <div
          className="partner-with-us"
          style={{ marginTop: mobile ? '100px' : '150px' }}>
          {content?.footerText1 && <p className="partner-with-us-main-text">{content?.footerText1}</p>}
          {content?.footerText2 && <p>{content?.footerText2}</p>}
        </div>
      </FadeInSection>
      </>
  }

  if (!content) {
    return <div />;
  }
  return (
    <section className="section">
      {helmet || ''}
      <div className="media-page-banner">
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            aspectRatio: '2',
            objectFit: 'cover',
          }}>
          <source src={content?.bannerImage?.publicURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="case-study-translucent-dark-overlay" />
      </div>
      {!mobile && showUpIcon && (
        <div className={'up-icon'}>
          <img src={upIcon} onClick={scrollToTop} />
        </div>
      )}
      <FadeInSection>
        <div style={{display:"flex",alignItems: "center",justifyContent:"center",flexDirection:"column",padding:"0px"}}>
        <div
          className="old-case-study-main-heading"
          id="needs-section"
          style={{
            backgroundColor: content?.fontColor,
            color: "white",
            fontSize: mobile ? '20px' : '28px',
            width: '90%',
          }}>
          {content?.title1}
        </div>
        <div className={"old-case-study-sub-heading"} style={{fontSize: mobile ? '20px' : '28px'}}>{content?.title2}</div></div>
      </FadeInSection>
      {/* Show modal only in mobile */}
      {mobile && (
        <Modal open={modalOpen} onClose={closeModal} center>
          {modalImage && (
            <img
              src={modalImage}
              alt="Full Screen"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          )}
        </Modal>
      )}
       <SectionDivider color={content?.fontColor}/>
      {arr.map((option, index) => (
        <React.Fragment key={index}>{renderSection(option)}</React.Fragment>
      ))}
      <FadeInSection>
        <div
          className="headingCaseStudy"
          dangerouslySetInnerHTML={{ __html: content?.successStoriesTitle }}
          style={{
            color: content?.fontColor,
            margin: 'auto',
            fontSize: mobile ? '20px' : '30px',
          }}></div>
        <div
          style={{
            marginTop: '125px',
            marginBottom: '150px',
            display: 'flex',
            justifyContent: mobile ? '' : 'space-evenly',
            flexDirection: mobile ? 'column' : 'row',
          }}>
          <SuccessStoriesSection />
        </div>
      </FadeInSection>
    </section>
  );
};

const OldCaseStudy = ({ data }) => {
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
        img1
        cardTitle1
        cardDescription1
        cardBtn1
        cardLink1
        img2
        cardTitle2
        cardDescription2
        cardBtn2
        cardLink2
        img3
        cardTitle3
        cardDescription3
        cardBtn3
        cardLink3

        title4
        title5
        title6
        title7
        newsdescription1
        newsdescription2
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

        blogTitle
        blogLink

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
      }
    }
  }
`;
