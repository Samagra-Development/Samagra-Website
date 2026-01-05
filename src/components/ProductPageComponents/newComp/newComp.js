import React from "react";
import quotes from "../../../img/qoutes.png";

// Helper function to get image URL with proper fallbacks
const getImageUrl = (image) => {
  if (!image) return null;
  return image?.childImageSharp?.fluid?.src || image?.publicURL || image;
};

// Hero Section Component

export class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isTablet: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (typeof window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      });
    }
  };

  render() {
    const { title, subtitle, description, categories, backgroundImage } = this.props;
    const { isMobile, isTablet } = this.state;
    const bgImageUrl = getImageUrl(backgroundImage);
    
    const categoryItems = categories || [];
    
    return (
      <section 
        className="hero-section-wrapper" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '600px' : '500px',
          background: '#fff',
          overflow: 'hidden'
        }}
      >
        {/* Background Image */}
        <div 
          className="hero-background"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: bgImageUrl 
              ? `url(${bgImageUrl})` 
              : 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Overlay */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0, 0, 0, 0.25)' 
          }} 
        />
        
        {/* Category Tags */}
        <div 
          style={{ 
            position: 'absolute', 
            top: isMobile ? '20px' : isTablet ? '60px' : '84px', 
            right: isMobile ? '20px' : isTablet ? '5vw' : '10vw',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '20px',
            padding: '8px 24px',
            color: '#fff',
            zIndex: 10,
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            justifyContent: 'flex-end',
            maxWidth: isMobile ? 'calc(100% - 40px)' : 'none'
          }}
          className="category-tags"
        >
          {categoryItems.map((category, index) => (
            <React.Fragment key={index}>
              <span style={{ 
                fontSize: isMobile ? '16px' : isTablet ? '20px' : '24px', 
                whiteSpace: 'nowrap'
              }}>
                {category}
              </span>
              {index < categoryItems.length - 1 && (
                <div 
                  style={{ 
                    width: '1px', 
                    height: isMobile ? '24px' : isTablet ? '28px' : '32px', 
                    background: 'rgba(255,255,255,0.5)'
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Content */}
        <div 
          style={{ 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: isMobile ? '120px 20px 40px' : isTablet ? '0 40px' : '0 20px',
            color: '#fff',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <h1 
            style={{ 
              fontSize: isMobile ? '40px' : isTablet ? '64px' : 'clamp(40px, 8vw, 90px)', 
              fontWeight: 900, 
              marginTop: isMobile ? '0' : isTablet ? '80px' : '110px',
              letterSpacing: isMobile ? '0.08em' : '0.12em',
              marginBottom: isMobile ? '16px' : '24px',
              lineHeight: isMobile ? '1.1' : '1.2'
            }}
          >
            {title || ""}
          </h1>
          <div 
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              padding: isMobile ? '20px 0' : '24px 0',
              backdropFilter: 'blur(8px)',
              width: '100%',
              display: 'flex',
              marginTop: isMobile ? '24px' : isTablet ? '40px' : '70px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? '12px' : '16px'
            }}
          >
            <p 
              style={{ 
                fontSize: isMobile ? '16px' : isTablet ? '20px' : 'clamp(16px, 2vw, 24px)', 
                lineHeight: '1.6',
                margin: 0,
                padding: isMobile ? '0 20px' : isTablet ? '0 32px' : '0 40px'
              }}
            >
              {subtitle || ""}
            </p>
            <p 
              style={{ 
                fontSize: isMobile ? '20px' : isTablet ? '28px' : 'clamp(20px, 3vw, 36px)', 
                fontWeight: 700, 
                lineHeight: '1.4',
                margin: 0,
                maxWidth: isMobile ? '100%' : isTablet ? '800px' : '981px',
                padding: isMobile ? '0 20px' : isTablet ? '0 32px' : '0 40px'
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>
    );
  }
}


export class WhyImportantSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isSidebarOpen: false,
      isMobile: false,
      isTablet: false,
      currentInfoCard: 0,
    };
    this.sectionRef = React.createRef();
    this.observer = null;
    this.scrollTimeout = null;
    this.isSnapping = false;
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.setupIntersectionObserver();
    window.addEventListener('scroll', this.handleSnapScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('scroll', this.handleSnapScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  handleResize = () => {
    if (typeof window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      });
    }
  };

  setupIntersectionObserver = () => {
    if (typeof window === 'undefined' || !this.sectionRef.current) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visible when at least 10% of the section is visible
          const isVisible = entry.intersectionRatio > 0.1;
          if (this.state.isVisible !== isVisible) {
            this.setState({ isVisible });
          }
        });
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
        rootMargin: '0px'
      }
    );

    this.observer.observe(this.sectionRef.current);
  };

  handleSnapScroll = () => {
    if (this.isSnapping || !this.sectionRef.current) return;

    // Clear existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Wait for scroll to stop (debounced)
    this.scrollTimeout = setTimeout(() => {
      if (!this.sectionRef.current) return;

      const rect = this.sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is partially visible
      const isPartiallyVisible = rect.top < viewportHeight * 0.5 && rect.top > -rect.height * 0.5;
      const isTopNearViewport = rect.top > 0 && rect.top < viewportHeight * 0.3;
      
      if (isPartiallyVisible && isTopNearViewport) {
        this.isSnapping = true;
        const targetScroll = window.scrollY + rect.top;
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        // Reset snapping flag after animation
        setTimeout(() => {
          this.isSnapping = false;
        }, 800);
      }
    }, 150);
  };

  toggleSidebar = () => {
    this.setState(prevState => ({ 
      isSidebarOpen: !prevState.isSidebarOpen 
    }));
  };

  handlePrevInfoCard = () => {
    const { infoCard } = this.props;
    if (Array.isArray(infoCard) && infoCard.length > 0) {
      this.setState({
        currentInfoCard: (this.state.currentInfoCard - 1 + infoCard.length) % infoCard.length
      });
    }
  };

  handleNextInfoCard = () => {
    const { infoCard } = this.props;
    if (Array.isArray(infoCard) && infoCard.length > 0) {
      this.setState({
        currentInfoCard: (this.state.currentInfoCard + 1) % infoCard.length
      });
    }
  };

  render() {
    const { title, items, infoCard, backgroundImage, isVisible: sectionIsVisible } = this.props;
    const { isVisible, isSidebarOpen, isMobile, isTablet, currentInfoCard } = this.state;
    const bgImageUrl = getImageUrl(backgroundImage);

    if (!sectionIsVisible || !items || items.length === 0) {
      return null;
    }
    
    // Handle infoCard as either single object or array
    const infoCards = Array.isArray(infoCard) ? infoCard : (infoCard ? [infoCard] : []);
    const currentCard = infoCards.length > 0 ? infoCards[currentInfoCard] : null;

    return (
      <section ref={this.sectionRef} className="why-important-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: isMobile ? 'auto' : '100vh', 
        background: '#fff',
        padding: isMobile ? '32px 0' : '64px 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.5)' }} />
        
        {/* Additional dark overlay when sidebar is open */}
        {isSidebarOpen && (
          <div 
            onClick={this.toggleSidebar}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.25)',
              zIndex: 20,
              transition: 'opacity 0.3s'
            }}
          />
        )}
        
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '0 20px' : isTablet ? '0 40px' : '0 80px',
          maxWidth: '1400px',
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '32px' : isTablet ? '44px' : '56px', 
            fontWeight: 700, 
            color: '#fff',
            marginBottom: isMobile ? '24px' : isTablet ? '36px' : '48px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize'
          }}>
            {title || "Why is it important?"}
          </h2>
          
          <div className="row" style={{ 
            display: 'flex', 
            gap: isMobile ? '20px' : isTablet ? '32px' : '44px', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {items?.map((item, index) => {
              const itemImageUrl = getImageUrl(item.image);
              return (
                <div 
                  key={index}
                  className="col-md-4"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: isMobile ? '16px' : '24px',
                    padding: isMobile ? '20px 16px' : '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    flex: isMobile ? '1 1 100%' : isTablet ? '1 1 calc(50% - 16px)' : '1 1 calc(33.333% - 30px)',
                    minWidth: isMobile ? '100%' : isTablet ? '200px' : '250px',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <div style={{
                    width: '100%',
                    maxWidth: isMobile ? '230px' : isTablet ? '120px' : '140px',
                    height: "auto",
                    margin: isMobile ? '8px auto' : '16px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {itemImageUrl ? (
                      <img 
                        src={itemImageUrl} 
                        alt={item.title}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100px',
                        background: 'linear-gradient(#666, #999)',
                        borderRadius: '12px'
                      }} />
                    )}
                  </div>
                  <div style={{
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px', 
                      fontWeight: 400, 
                      color: '#fff',
                      textTransform: 'capitalize',
                      margin: 0,
                      lineHeight: isMobile ? '20px' : '24px'
                    }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Toggle Arrow Button */}
        <button 
          onClick={this.toggleSidebar}
          style={{
            position: 'absolute',
            left: isSidebarOpen ? (isMobile ? '85%' : isTablet ? '420px' : '535px') : '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '36px' : isTablet ? '40px' : '48px',
            height: isMobile ? '72px' : isTablet ? '80px' : '96px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0 24px 24px 0',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '4px 4px 24px rgba(0, 0, 0, 0.2)',
            zIndex: 31,
            cursor: 'pointer',
            transition: 'all 0.5s ease-in-out'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            }
          }}
        >
          <span style={{ 
            fontSize: isMobile ? '20px' : isTablet ? '20px' : '24px', 
            color: '#334155', 
            fontWeight: 'bold',
            transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s'
          }}>
            &gt;
          </span>
        </button>
        
        {/* Side Info Card - "Did You Know?" - Works for all screen sizes */}
        {currentCard && (
          <div style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: isSidebarOpen ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
            width: isMobile ? '85%' : isTablet ? '420px' : '535px',
            maxWidth: isMobile ? '360px' : 'none',
            maxHeight: '80vh',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0 24px 24px 0',
            boxShadow: '4px 4px 24px rgba(0, 0, 0, 0.3)',
            zIndex: 30,
            transition: 'transform 0.5s ease-in-out',
            overflowY: 'auto'
          }}>
            <div style={{ 
              padding: isMobile ? '28px 24px' : isTablet ? '32px 28px' : '48px 40px', 
              display: 'flex', 
              flexDirection: 'column',
              gap: isMobile ? '16px' : '20px',
              position: 'relative'
            }}>
              {/* Static "Did you Know?" heading */}
              <h2 style={{ 
                fontSize: isMobile ? '24px' : isTablet ? '28px' : '32px', 
                fontWeight: 500, 
                color: '#000',
                letterSpacing: '-0.01em',
                textTransform: 'capitalize',
                marginBottom: '4px'
              }}>
                Did you Know?
              </h2>
              
              {/* Dynamic title from infoCard */}
              {currentCard?.title && (
                <h3 style={{ 
                  fontSize: isMobile ? '20px' : isTablet ? '22px' : '26px', 
                  fontWeight: 600, 
                  color: '#422F2A',
                  lineHeight: isMobile ? '26px' : isTablet ? '28px' : '30px',
                  marginBottom: '8px'
                }}>
                  {currentCard.title}
                </h3>
              )}
              
              {/* Dynamic description from infoCard */}
              {currentCard?.description && (
                <p style={{ 
                  fontSize: isMobile ? '14px' : isTablet ? '15px' : '16px', 
                  fontWeight: 400, 
                  color: '#666',
                  lineHeight: isMobile ? '22px' : isTablet ? '24px' : '26px',
                  marginBottom: infoCards.length > 1 ? '40px' : '0'
                }}>
                  {currentCard.description}
                </p>
              )}

              {/* Navigation Arrows - Only show if multiple info cards */}
              {infoCards.length > 1 && (
                <>
                  <button
                    onClick={this.handlePrevInfoCard}
                    style={{
                      position: 'absolute',
                      left: isMobile ? '10px' : isTablet ? '12px' : '16px',
                      bottom: isMobile ? '14px' : isTablet ? '16px' : '20px',
                      background: 'rgba(66, 47, 42, 0.15)',
                      border: 'none',
                      borderRadius: '50%',
                      width: isMobile ? '32px' : isTablet ? '36px' : '40px',
                      height: isMobile ? '32px' : isTablet ? '36px' : '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#422F2A',
                      fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = 'rgba(66, 47, 42, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = 'rgba(66, 47, 42, 0.15)';
                      }
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={this.handleNextInfoCard}
                    style={{
                      position: 'absolute',
                      right: isMobile ? '10px' : isTablet ? '12px' : '16px',
                      bottom: isMobile ? '14px' : isTablet ? '16px' : '20px',
                      background: 'rgba(66, 47, 42, 0.15)',
                      border: 'none',
                      borderRadius: '50%',
                      width: isMobile ? '32px' : isTablet ? '36px' : '40px',
                      height: isMobile ? '32px' : isTablet ? '36px' : '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#422F2A',
                      fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = 'rgba(66, 47, 42, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = 'rgba(66, 47, 42, 0.15)';
                      }
                    }}
                  >
                    ›
                  </button>

                  {/* Dot indicators */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '8px'
                  }}>
                    {infoCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => this.setState({ currentInfoCard: index })}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          border: 'none',
                          background: index === currentInfoCard ? '#422F2A' : 'rgba(66, 47, 42, 0.3)',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.3s'
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
}



export class ProgramHighlightsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isMobile: false,
      isTablet: false,
    };
    this.sectionRef = React.createRef();
    this.observer = null;
    this.scrollTimeout = null;
    this.isSnapping = false;
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.setupIntersectionObserver();
    window.addEventListener('scroll', this.handleSnapScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('scroll', this.handleSnapScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  handleResize = () => {
    if (typeof window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      });
    }
  };

  setupIntersectionObserver = () => {
    if (typeof window === 'undefined' || !this.sectionRef.current) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visible when at least 10% of the section is visible
          const isVisible = entry.intersectionRatio > 0.1;
          if (this.state.isVisible !== isVisible) {
            this.setState({ isVisible });
          }
        });
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
        rootMargin: '0px'
      }
    );

    this.observer.observe(this.sectionRef.current);
  };

  handleSnapScroll = () => {
    if (this.isSnapping || !this.sectionRef.current) return;

    // Clear existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Wait for scroll to stop (debounced)
    this.scrollTimeout = setTimeout(() => {
      if (!this.sectionRef.current) return;

      const rect = this.sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is partially visible
      const isPartiallyVisible = rect.top < viewportHeight * 0.5 && rect.top > -rect.height * 0.5;
      const isTopNearViewport = rect.top > 0 && rect.top < viewportHeight * 0.3;
      
      if (isPartiallyVisible && isTopNearViewport) {
        this.isSnapping = true;
        const targetScroll = window.scrollY + rect.top;
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        // Reset snapping flag after animation
        setTimeout(() => {
          this.isSnapping = false;
        }, 800);
      }
    }, 150);
  };

  render() {
    const { title, highlights, backgroundImage } = this.props;
    const { isVisible, isMobile, isTablet } = this.state;
    const bgImageUrl = getImageUrl(backgroundImage);

    return (
      <section ref={this.sectionRef} className="program-highlights-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: isMobile ? "auto" : "100vh",
        background: '#fff',
        padding: isMobile ? '32px 0' : '64px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.6)' }} />
        
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '0 20px' : isTablet ? '0 40px' : '0 80px',
          maxWidth: '1400px',
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '32px' : isTablet ? '44px' : '56px', 
            fontWeight: 700, 
            color: '#fff',
            marginBottom: isMobile ? '24px' : isTablet ? '36px' : '48px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize',
            textAlign: 'left'
          }}>
            {title || "Program Highlights"}
          </h2>
          
          <div className="row" style={{ 
            display: 'flex', 
            gap: isMobile ? '16px' : isTablet ? '20px' : '24px', 
            flexWrap: 'wrap' 
          }}>
            {highlights?.map((highlight, index) => {
              const highlightImageUrl = getImageUrl(highlight.image);
              return (
                <div 
                  key={index}
                  className="col-md-3"
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px',
                    flex: isMobile ? '1 1 100%' : isTablet ? '1 1 calc(50% - 10px)' : '1 1 calc(25% - 18px)',
                    minWidth: isMobile ? '100%' : isTablet ? '200px' : '250px',
                    background: highlightImageUrl ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: highlightImageUrl ? 'none' : 'blur(10px)',
                    borderRadius: isMobile ? '16px' : '20px',
                    padding: highlightImageUrl ? '0' : (isMobile ? '20px' : '24px')
                  }}
                >
                  {highlightImageUrl && (
                    <div style={{
                      width: '100%',
                      height: isMobile ? '200px' : isTablet ? '240px' : '283px',
                      backgroundImage: `url(${highlightImageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: isMobile ? '12px' : '20px',
                      flexShrink: 0
                    }} />
                  )}
               
                  <div style={{
                    borderRadius: '12px',
                    padding: highlightImageUrl ? (isMobile ? '12px 8px' : '16px 8px') : '0',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '20px' : isTablet ? '22px' : '24px', 
                      fontWeight: 700, 
                      color: '#fff',
                      marginBottom: isMobile ? '8px' : '12px',
                      lineHeight: isMobile ? '26px' : '32px'
                    }}>
                      {highlight.title}
                    </h3>
                    <p style={{ 
                      fontSize: isMobile ? '16px' : '18px', 
                      fontWeight: 400,
                      color: '#fff',
                      lineHeight: isMobile ? '22px' : '24px',
                      margin: 0
                    }}>
                      {highlight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
// Impact Section
// export class ImpactSection extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTestimonial: 0,
//     };
//   }

//   handlePrevTestimonial = () => {
//     const { testimonials } = this.props;
//     if (testimonials && testimonials.length > 0) {
//       this.setState({
//         currentTestimonial: (this.state.currentTestimonial - 1 + testimonials.length) % testimonials.length
//       });
//     }
//   };

//   handleNextTestimonial = () => {
//     const { testimonials } = this.props;
//     if (testimonials && testimonials.length > 0) {
//       this.setState({
//         currentTestimonial: (this.state.currentTestimonial + 1) % testimonials.length
//       });
//     }
//   };

//   render() {
//     const { title, stats, testimonials, backgroundImage } = this.props;
//     const { currentTestimonial } = this.state;
//     const testimonial = testimonials && testimonials[currentTestimonial];
//     const bgImageUrl = getImageUrl(backgroundImage);
//     const testimonialImageUrl = testimonial ? getImageUrl(testimonial.image) : null;

//     return (
//       <section className="impact-section-wrapper" style={{ 
//         position: 'relative', 
//         width: '100%', 
//         minHeight: '100vh', 
//         background: '#fff',
//         padding: '64px 0'
//       }}>
//         {/* Background Image with Overlay */}
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }} />
//         <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.5)' }} />
        
//         {/* Content */}
//         <div style={{ position: 'relative', zIndex: 10, padding: '0 80px' }}>
//           <h2 style={{ 
//             fontSize: '56px', 
//             fontWeight: 700, 
//             color: '#fff',
//             marginBottom: '48px',
//             letterSpacing: '-0.01em',
//             textTransform: 'capitalize'
//           }}>
//             {title || "Impact"}
//           </h2>
          
//           {/* Stats Grid */}
//           <div className="row" style={{ display: 'flex', gap: '28px', marginBottom: '32px', flexWrap: 'wrap' }}>
//             {stats?.map((stat, index) => {
//               const statImageUrl = getImageUrl(stat.image);
//               return (
//                 <div 
//                   key={index}
//                   className="col-md-3"
//                   style={{
//                     background: 'rgba(255, 255, 255, 0.1)',
//                     backdropFilter: 'blur(10px)',
//                     borderRadius: '24px',
//                     padding: '32px 24px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     gap: '12px',
//                     flex: 1,
//                     minWidth: '200px'
//                   }}
//                 >
//                   <div style={{ textAlign: 'center', width: '100%' }}>
//                     {statImageUrl && (
//                       <div style={{
//                         width: '121px',
//                         height: '75px',
//                         margin: '16px auto',
//                         backgroundImage: `url(${statImageUrl})`,
//                         backgroundSize: 'contain',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'center'
//                       }} />
//                     )}
//                     <div style={{ 
//                       fontSize: '28px', 
//                       fontWeight: 600, 
//                       color: '#fff',
//                       lineHeight: '48px',
//                       textTransform: 'capitalize'
//                     }}>
//                       {stat.value}
//                     </div>
//                     <div style={{ 
//                       fontSize: '18px', 
//                       fontWeight: 400,
//                       color: '#fff',
//                       lineHeight: '20px',
//                       marginTop: '16px'
//                     }}>
//                       {stat.label}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Testimonial Card */}
//           {testimonial && (
//             <div style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               backdropFilter: 'blur(10px)',
//               borderRadius: '24px',
//               padding: '32px 64px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '32px',
//               position: 'relative'
//             }}>
//               {/* Opening Quote - Top Left */}
//               <img 
//                 src={quotes} 
//                 alt="quote" 
//                 style={{
//                   position: 'absolute',
//                   top: '20px',
//                   left: '20px',
//                   width: '40px',
//                   height: '30px',
//                   opacity: 0.8
//                 }}
//               />
              
//               <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
//                 <div style={{
//                   width: '162px',
//                   height: '238px',
//                   backgroundImage: testimonialImageUrl ? `url(${testimonialImageUrl})` : 'linear-gradient(#666, #999)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   borderRadius: '20px',
//                   border: '4px solid rgba(255, 255, 255, 0.75)',
//                   flexShrink: 0
//                 }} />
                
//                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                   <p style={{ 
//                     fontSize: '24px', 
//                     fontStyle: 'italic',
//                     fontWeight: 500, 
//                     color: '#fff',
//                     lineHeight: '27px'
//                   }}>
//                     {testimonial.quote}
//                   </p>
//                   <div>
//                     <div style={{ 
//                       fontSize: '24px', 
//                       fontWeight: 900, 
//                       color: '#fff',
//                       lineHeight: '33px'
//                     }}>
//                       {testimonial.name}
//                     </div>
//                     <div style={{ 
//                       fontSize: '16px', 
//                       fontWeight: 500, 
//                       color: '#fff',
//                       lineHeight: '22px'
//                     }}>
//                       {testimonial.title}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Closing Quote - Bottom Right */}
//               <img 
//                 src={quotes} 
//                 alt="quote" 
//                 style={{
//                   position: 'absolute',
//                   bottom: '20px',
//                   right: '20px',
//                   width: '40px',
//                   height: '30px',
//                   opacity: 0.8,
//                   transform: 'scaleX(-1)'
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// Impact Section
export class ImpactSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTestimonial: 0,
      isMobile: false,
      isTablet: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (typeof window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      });
    }
  };

  handlePrevTestimonial = () => {
    const { testimonials } = this.props;
    if (testimonials && testimonials.length > 0) {
      this.setState({
        currentTestimonial: (this.state.currentTestimonial - 1 + testimonials.length) % testimonials.length
      });
    }
  };

  handleNextTestimonial = () => {
    const { testimonials } = this.props;
    if (testimonials && testimonials.length > 0) {
      this.setState({
        currentTestimonial: (this.state.currentTestimonial + 1) % testimonials.length
      });
    }
  };

  render() {
    const { title, stats, testimonials, backgroundImage } = this.props;
    const { currentTestimonial, isMobile, isTablet } = this.state;
    const testimonial = testimonials && testimonials.length > 0 ? testimonials[currentTestimonial] : null;
    const bgImageUrl = getImageUrl(backgroundImage);
    const testimonialImageUrl = testimonial ? getImageUrl(testimonial.image) : null;

    return (
      <section className="impact-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: isMobile ? 'auto' : '100vh', 
        background: '#fff',
        padding: isMobile ? '32px 0' : '64px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.5)' }} />
        
        {/* Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: isMobile ? '0 20px' : isTablet ? '0 40px' : '0 80px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '32px' : isTablet ? '44px' : '56px', 
            fontWeight: 700, 
            color: '#fff',
            marginBottom: isMobile ? '24px' : isTablet ? '36px' : '48px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize'
          }}>
            {title || "Impact"}
          </h2>
          
          {/* Stats Grid - Only render if stats exist */}
          {stats && stats.length > 0 && (
            <div className="row" style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '16px' : isTablet ? '20px' : '28px', 
              marginBottom: isMobile ? '24px' : '32px'
            }}>
              {stats.map((stat, index) => {
                const statImageUrl = getImageUrl(stat.image);
                return (
                  <div 
                    key={index}
                    className="col-md-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: isMobile ? '16px' : '24px',
                      padding: isMobile ? '20px 16px' : '32px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      flex: isMobile ? '1 1 100%' : isTablet ? '1 1 calc(50% - 10px)' : '1 1 calc(25% - 21px)',
                      minWidth: isMobile ? '100%' : isTablet ? '200px' : '220px'
                    }}
                  >
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      {/* {statImageUrl && (
                        <div style={{
                          width: isMobile ? '80px' : isTablet ? '100px' : '121px',
                          height: isMobile ? '50px' : isTablet ? '62px' : '75px',
                          margin: '16px auto',
                          backgroundImage: `url(${statImageUrl})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }} />
                      )} */}
                      {statImageUrl && (
  <div style={{
    width: '100%',
    maxWidth: isMobile ? '230px' : isTablet ? '120px' : '140px',
    height: "auto",
    margin: '16px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <img 
      src={statImageUrl}
      alt={stat.label}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
      }}
    />
  </div>
)}
                      <div style={{ 
                        fontSize: isMobile ? '24px' : isTablet ? '26px' : '28px', 
                        fontWeight: 600, 
                        color: '#fff',
                        lineHeight: '48px',
                        textTransform: 'capitalize'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px', 
                        fontWeight: 400,
                        color: '#fff',
                        lineHeight: '20px',
                        marginTop: '16px'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Testimonial Card - Only render if testimonial exists */}
          {testimonial && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: isMobile ? '16px' : '24px',
              padding: isMobile ? '40px 20px 24px' : isTablet ? '40px 32px' : '32px 64px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: isMobile ? '20px' : '32px',
              position: 'relative'
            }}>
              {/* Opening Quote - Top Left */}
              <img 
                src={quotes} 
                alt="quote" 
                style={{
                  position: 'absolute',
                  top: isMobile ? '12px' : '20px',
                  left: isMobile ? '12px' : '20px',
                  width: isMobile ? '30px' : '40px',
                  height: isMobile ? '22px' : '30px',
                  opacity: 0.8
                }}
              />
              
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center', 
                gap: isMobile ? '20px' : '32px', 
                flex: 1,
                width: '100%'
              }}>
                <div style={{
                  width: isMobile ? '120px' : isTablet ? '140px' : '162px',
                  height: isMobile ? '176px' : isTablet ? '206px' : '238px',
                  backgroundImage: testimonialImageUrl ? `url(${testimonialImageUrl})` : 'linear-gradient(#666, #999)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: isMobile ? '12px' : '20px',
                  border: `${isMobile ? '3px' : '4px'} solid rgba(255, 255, 255, 0.75)`,
                  flexShrink: 0
                }} />
                
                <div style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: isMobile ? '12px' : '16px',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  <p style={{ 
                    fontSize: isMobile ? '16px' : isTablet ? '20px' : '24px', 
                    fontStyle: 'italic',
                    fontWeight: 500, 
                    color: '#fff',
                    lineHeight: isMobile ? '22px' : isTablet ? '26px' : '27px',
                    margin: 0
                  }}>
                    {testimonial.quote}
                  </p>
                  <div>
                    <div style={{ 
                      fontSize: isMobile ? '18px' : isTablet ? '20px' : '24px', 
                      fontWeight: 900, 
                      color: '#fff',
                      lineHeight: isMobile ? '24px' : '33px'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      fontWeight: 500, 
                      color: '#fff',
                      lineHeight: isMobile ? '18px' : '22px'
                    }}>
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Closing Quote - Bottom Right */}
              <img 
                src={quotes} 
                alt="quote" 
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '12px' : '20px',
                  right: isMobile ? '12px' : '20px',
                  width: isMobile ? '30px' : '40px',
                  height: isMobile ? '22px' : '30px',
                  opacity: 0.8,
                  transform: 'scaleX(-1)'
                }}
              />
              
              {/* Navigation Arrows - Only show if multiple testimonials */}
              {testimonials && testimonials.length > 1 && (
                <>
                  <button
                    onClick={this.handlePrevTestimonial}
                    style={{
                      position: 'absolute',
                      left: isMobile ? '8px' : '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: isMobile ? '32px' : '40px',
                      height: isMobile ? '32px' : '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: isMobile ? '18px' : '20px',
                      transition: 'all 0.3s',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={this.handleNextTestimonial}
                    style={{
                      position: 'absolute',
                      right: isMobile ? '8px' : '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: isMobile ? '32px' : '40px',
                      height: isMobile ? '32px' : '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: isMobile ? '18px' : '20px',
                      transition: 'all 0.3s',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
}


export class PartnersSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isTablet: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (typeof window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      });
    }
  };

  render() {
    const { title, partners } = this.props;
    const { isMobile, isTablet } = this.state;

    return (
      <section className="partners-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        background: '#fff',
        padding: isMobile ? '32px 0' : '64px 0'
      }}>
        <div style={{ 
          padding: isMobile ? '0 20px' : isTablet ? '0 40px' : '0 80px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '32px' : isTablet ? '44px' : '56px', 
            fontWeight: 700, 
            color: '#000',
            marginBottom: isMobile ? '32px' : isTablet ? '48px' : '64px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize'
          }}>
            {title || "Our Partners"}
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '32px' : isTablet ? '64px' : '96px',
            padding: isMobile ? '24px 0 0 0' : '48px 0 0 0',
            flexWrap: 'wrap'
          }}>
            {partners?.map((partner, index) => {
              const logoUrl = getImageUrl(partner.logo);
              return (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }
                  }}
                >
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt={partner.name} 
                      style={{ 
                        height: isMobile ? '80px' : isTablet ? '100px' : '120px', 
                        objectFit: 'contain'
                      }} 
                    />
                  ) : (
                    <div style={{ 
                      width: isMobile ? '120px' : isTablet ? '140px' : '160px', 
                      height: isMobile ? '80px' : isTablet ? '100px' : '120px', 
                      background: '#e5e7eb',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ 
                        fontSize: isMobile ? '12px' : '14px', 
                        color: '#6b7280' 
                      }}>
                        {partner.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}