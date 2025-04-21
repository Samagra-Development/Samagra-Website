import { max } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

const JourneySoFar = ({ journeyData }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const elementsRef = useRef([]);

  // Component styles defined within the component
  const styles = {
    journeyOuterSection: {
       
     backgroundColor:"#880163"
        
      },
    journeySection: {
      padding: '60px 20px',
      margin: '0 auto',
      maxWidth: '1200px',
      
    },
    journeyHeader: {
      marginBottom: '50px',
      textAlign: 'center',
    },
    journeyTitle: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      fontWeight: "700",
      fontSize:"44.48px",
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
    },
    timelineLine: {
      position: 'absolute',
      top: '0',
      left: '50%',
      height: '100%',
      width: '2px',
      borderLeft: '2px dotted white',
      transform: 'translateX(-50%)',
    },
    timelineItemDesktop: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '80px',
      position: 'relative',
      opacity: '0',
      transform: 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      minHeight: '300px',
    },
    timelineItemShow: {
      opacity: '1',
      transform: 'translateY(0)',
    },
    timelineItemEven: {
      flexDirection: 'row',
    },
    timelineItemOdd: {
      flexDirection: 'row-reverse',
    },
    timelineImageContainer: {
      width: '50%',
      padding: '0 20px',
    
      display: 'flex',
      justifyContent: 'center',
    },
    timelineImage: {
      width: '90%',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '10px',
      boxShadow: "4px 4px white",
    },
    timelineCenterDot: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '15px',
      height: '15px',
      backgroundColor: 'white',
      borderRadius: '50%',
      zIndex: '2',
    },
    timelineContent: {
      width: '50%',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
    },
    timelineCard: {
   
      padding: '25px',
     
      width: '90%',
    },
    timelineYear: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '15px',
    },
    timelineDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: 'white',
      textAlign: 'justify',
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
      height: '50px',
      width: '0',
      borderLeft: '2px dotted white',
    },
    timelineDot: {
      width: '17px',
      height: '17px',
      backgroundColor: 'white',
      borderRadius: '50%',
    },
    timelineImageContainerMobile: {
      width: '100%',
      marginBottom: '20px',
      
    },
    timelineContentMobile: {
      width: '100%',
      textAlign: 'left',
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
        {index > 0 && (
          <div style={styles.timelineConnectorMobile}>

            <div style={styles.timelineDottedLine}></div>
            <div style={styles.timelineDot}></div>
            <div style={styles.timelineDottedLine}></div>
          </div>
        )}
        
        <div style={styles.timelineImageContainerMobile}>
          <img 
            src={item.image === 'string' ? item.image : item.image.childImageSharp.fluid.src} 
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
    const isEven = index % 2 === 0;
    
    return (
      <div 
        key={index} 
        ref={(el) => (elementsRef.current[index] = el)}
        style={{
          ...styles.timelineItemDesktop,
          ...(isEven ? styles.timelineItemEven : styles.timelineItemOdd)
        }}
      >
        <div style={styles.timelineImageContainer}>
          <img 
            src={item.image === 'string' ? item.image : item.image.childImageSharp.fluid.src} 
            alt={`Journey ${item.text}`} 
            style={styles.timelineImage}
          />
        </div>
        
        <div style={styles.timelineCenterDot}></div>
        
        <div style={styles.timelineContent}>
          <div style={styles.timelineCard}>
            <h3 style={styles.timelineYear}>{item.text}</h3>
            <p style={styles.timelineDescription}>{item.subText}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div  style={styles.journeyOuterSection    }>
 <section style={styles.journeySection}>
      <div style={styles.journeyHeader}>
        <h2 style={styles.journeyTitle}>
          Journey So Far
        </h2>
        
      </div>

      <div style={styles.timelineContainer}>
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