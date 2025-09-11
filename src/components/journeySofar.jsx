import { max } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

const JourneySoFar = ({ journeyData }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const elementsRef = useRef([]);

  // Component styles defined within the component
  const styles = {
    journeyOuterSection: {
      backgroundColor: "#880163"
    },
    journeySection: {
      padding: '60px 20px',
      margin: '0 auto',
      maxWidth: '1200px',
      position: 'relative'
    },
    journeyHeader: {
      marginBottom: '50px',
      textAlign: 'center',
    },
    journeyTitle: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      fontWeight: "700",
      fontSize: "44.48px",
      lineHeight: "100%",
      color: 'white',
      letterSpacing: "0%",
      position: 'relative',
    },
    journeyTitleAfter: {
      content: '""',
      display: 'block',
      width: '80px',
      height: '4px',
      backgroundColor: '#0066cc',
      margin: '15px auto 0',
    },
    journeyIntro: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
      color: '#444',
    },
    timelineContainer: {
      position: 'relative',
      marginTop: '60px',
      paddingLeft: '80px'
    },
    timelineLine: {
      position: 'absolute',
      left: '39px',
      top: '60px',
      bottom: '0',
      width: '2px',
      background: 'linear-gradient(to bottom, white 0%, white 50%, transparent 50%, transparent 100%)',
      backgroundSize: '2px 20px',
      zIndex: 0
    },
    timelineItemDesktop: {
      position: 'relative',
      marginBottom: '80px',
      display: 'flex',
      alignItems: 'flex-start',
      opacity: '0',
      transform: 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    },
    timelineItemShow: {
      opacity: '1',
      transform: 'translateY(0)',
    },
    dateBox: {
      position: 'absolute',
      left: '-100px',
      top: '20px',
      backgroundColor: '#880163',
      padding: '12px 16px',
      border: "1px dashed #ffffff",
      borderRadius: '8px',
      zIndex: 100,
      display: "flex", 
flexDirection: "column",
alignItems: "center",
gap:"7px",
      width: '120px',
      textAlign: 'center'
    },
    dateText: {
      color: '#ffffff',
      fontSize: '1.5rem',
      fontWeight: '700',
      lineHeight: '1.2',
      margin: '0'
    },
    contentCard: {
      backgroundColor: 'transparent',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '20px',
      width: '100%'
    },
    timelineImageContainer: {
      width: '320px',
      height: '210px',
      overflow: 'hidden',
      borderRadius: '8px',
      margin: '20px 20px 20px 0',
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    timelineImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.3s ease'
    },
    timelineContent: {
      flex: 1,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    timelineCard: {
      padding: '0',
      width: '100%',
    },
    timelineYear: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '12px',
      lineHeight: '1.3'
    },
    timelineDescription: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'justify',
    },

    // Mobile styles
    mobileContainer: {
      paddingLeft: '0'
    },
    timelineItemMobile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: '50px',
    },
    timelineConnectorMobile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '15px',
    },
    timelineDottedLine: {
      height: '30px',
      width: '0',
      background: 'linear-gradient(to bottom, white 0%, white 50%, transparent 50%, transparent 100%)',
      backgroundSize: '2px 10px',
      zIndex: 1,
      borderLeft: '2px solid transparent',
    },
    mobileDateBox: {
      backgroundColor: '#880163',
      padding: '12px 16px',
      borderRadius: '8px',
      border: "1px dashed #ffffff",
      marginBottom: '20px',
      width:"125px",
      display: "flex", 
flexDirection: "column",
alignItems: "center",
gap:"3px",
      textAlign: 'center'
    },
    timelineImageContainerMobile: {
      width: '100%',
      height: '250px',
      marginBottom: '20px',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    timelineContentMobile: {
      width: '100%',
      textAlign: 'left',
      padding: '0 20px'
    }
  };

  useEffect(() => {
    // Handle responsive behavior
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    // Observe elements
    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      // Clean up
      window.removeEventListener('resize', checkScreenSize);
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const renderMobileTimelineItem = (item, index) => {
    return (
      <div key={index} style={styles.timelineItemMobile}>
        <div style={styles.mobileDateBox}>
          <div style={{ width: '15px', height: '15px', backgroundColor: 'white', borderRadius: '50%' }}></div>
          <div style={styles.dateText}>{item.year}</div>
        </div>
        
        {/* {index < journeyData.length - 1 && ( */}
          <div style={styles.timelineConnectorMobile}>
            <div style={styles.timelineDottedLine}></div>
          </div>
        {/* )} */}
        
        <div style={styles.timelineImageContainerMobile}>
          <img 
            src={item.image === 'string' ? item?.image : item.image?.childImageSharp?.fluid?.src } 
            alt={`Journey ${item.text}`} 
            style={styles.timelineImage}
          />
        </div>
        
        <div style={styles.timelineContentMobile}>
          <h3 style={styles.timelineYear}>{item.text}</h3>
          <p style={styles.timelineDescription}>{item.subText}</p>
        </div>
      </div>
    );
  };

  const renderDesktopTimelineItem = (item, index) => {
    return (
      <div 
        key={index} 
        ref={(el) => (elementsRef.current[index] = el)}
        style={styles.timelineItemDesktop}
      >
        <div style={styles.dateBox}>
          <div style={{ width: '15px', height: '15px', backgroundColor: 'white', borderRadius: '50%' }}></div>
          <div style={styles.dateText}>{item.year}</div>
        </div>
        
        <div style={styles.contentCard}>
          <div style={styles.timelineContent}>
            <div style={styles.timelineCard}>
              <h3 style={styles.timelineYear}>{item.text}</h3>
              <p style={styles.timelineDescription}>{item.subText}</p>
            </div>
          </div>
          
          <div style={styles.timelineImageContainer}>
            <img 
              src={item.image === 'string' ? item.image : item.image?.childImageSharp?.fluid?.src} 
              alt={`Journey ${item.text}`} 
              style={styles.timelineImage}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.journeyOuterSection}>
      <section style={styles.journeySection}>
        <div style={styles.journeyHeader}>
          <h2 style={styles.journeyTitle}>
            Journey So Far
          </h2>
        </div>

        <div style={isSmallScreen ? styles.mobileContainer : styles.timelineContainer}>
          {!isSmallScreen && <div style={styles.timelineLine}></div>}
          
          {journeyData.map((item, index) => (
            isSmallScreen 
              ? renderMobileTimelineItem(item, index)
              : renderDesktopTimelineItem(item, index)
          ))}
        </div>
      </section>
    </div>
  );
};

export default JourneySoFar;