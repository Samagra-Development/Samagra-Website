import React from "react";
import quotes from "../../../img/qoutes.png";

// Helper function to get image URL with proper fallbacks
const getImageUrl = (image) => {
  if (!image) return null;
  return image?.childImageSharp?.fluid?.src || image?.publicURL || image;
};

// Hero Section Component
export class HeroSection extends React.Component {
  render() {
    const { title, subtitle, description, categories, backgroundImage } = this.props;
    const bgImageUrl = getImageUrl(backgroundImage);
    
    const categoryItems = categories || [];
    
    return (
      <section 
        className="hero-section-wrapper" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100vh',
          minHeight: '500px',
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
            top: '84px', 
            right: '130px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '8px 24px',
            color: '#fff',
            zIndex: 10
          }}
          className="category-tags"
        >
          {categoryItems.map((category, index) => (
            <React.Fragment key={index}>
              <span style={{ fontSize: '24px', whiteSpace: 'nowrap' }}>
                {category}
              </span>
              {index < categoryItems.length - 1 && (
                <div 
                  style={{ 
                    width: '1px', 
                    height: '32px', 
                    background: 'rgba(255,255,255,0.5)' 
                  }} 
                />
              )}
            </React.Fragment>
          ))}
          <div 
            style={{ 
              width: '1px', 
              height: '32px', 
              background: 'rgba(255,255,255,0.5)' 
            }} 
          />
          <div 
            style={{ 
              width: '43px', 
              height: '48px', 
              background: '#fff', 
              borderRadius: '4px' 
            }} 
          />
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
            padding: '0 20px',
            color: '#fff',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <h1 
            style={{ 
              fontSize: 'clamp(40px, 8vw, 90px)', 
              fontWeight: 900, 
              marginTop: "70px",
              letterSpacing: '0.12em',
              marginBottom: '24px'
            }}
          >
            {title || "LEAP"}
          </h1>
          <div 
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '24px 0',
              backdropFilter: 'blur(8px)',
              width: '100%',
              display: 'flex',
              marginTop: "70px",
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <p 
              style={{ 
                fontSize: 'clamp(16px, 2vw, 24px)', 
                lineHeight: '1.6',
                margin: 0,
                padding: '0 40px'
              }}
            >
              {subtitle || "Livestock Expansion and Advancement Program"}
            </p>
            <p 
              style={{ 
                fontSize: 'clamp(20px, 3vw, 36px)', 
                fontWeight: 700, 
                lineHeight: '1.4',
                margin: 0,
                maxWidth: '981px',
                padding: '0 40px'
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

// Why Important Section Component
export class WhyImportantSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isSidebarOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const isVisible = scrollTop > 0 && scrollTop < 2000;
    
    if (this.state.isVisible !== isVisible) {
      this.setState({ isVisible });
    }
  };

  toggleSidebar = () => {
    this.setState(prevState => ({ 
      isSidebarOpen: !prevState.isSidebarOpen 
    }));
  };

  render() {
    const { title, items, infoCard, backgroundImage } = this.props;
    const { isVisible, isSidebarOpen } = this.state;
    const bgImageUrl = getImageUrl(backgroundImage);

    return (
      <section className="why-important-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        background: '#fff',
        padding: '64px 0',
        overflow: 'hidden'
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
          padding: '0 80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s'
        }}>
          <h2 style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            color: '#fff',
            marginBottom: '48px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize'
          }}>
            {title || "Why is it important?"}
          </h2>
          
          <div className="row" style={{ display: 'flex', gap: '44px', flexWrap: 'wrap' }}>
            {items?.map((item, index) => {
              const itemImageUrl = getImageUrl(item.image);
              return (
                <div 
                  key={index}
                  className="col-md-4"
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '20px',
                    position: 'relative',
                    flex: 1,
                    minWidth: '250px'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '262px',
                    backgroundImage: itemImageUrl ? `url(${itemImageUrl})` : 'linear-gradient(#666, #999)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '20px',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  />
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '16px 32px',
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  >
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: 500, 
                      color: '#fff',
                      textTransform: 'capitalize'
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
            left: isSidebarOpen ? '535px' : '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '96px',
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
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        >
          <span style={{ 
            fontSize: '24px', 
            color: '#334155', 
            fontWeight: 'bold',
            transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s'
          }}>
            &gt;
          </span>
        </button>
        
        {/* Side Info Card - "Did You Know?" */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: isSidebarOpen ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
          width: '535px',
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
            padding: '48px 40px', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Static "Did you Know?" heading */}
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 500, 
              color: '#000',
              letterSpacing: '-0.01em',
              textTransform: 'capitalize',
              marginBottom: '4px'
            }}>
              Did you Know?
            </h2>
            
            {/* Dynamic title from infoCard */}
            {infoCard?.title && (
              <h3 style={{ 
                fontSize: '26px', 
                fontWeight: 600, 
                color: '#422F2A',
                lineHeight: '30px',
                marginBottom: '8px'
              }}>
                {infoCard.title}
              </h3>
            )}
            
            {/* Dynamic description from infoCard */}
            {infoCard?.description && (
              <p style={{ 
                fontSize: '16px', 
                fontWeight: 400, 
                color: '#666',
                lineHeight: '26px'
              }}>
                {infoCard.description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

// Program Highlights Section
export class ProgramHighlightsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const isVisible = scrollTop > 1000 && scrollTop < 3500;
    
    if (this.state.isVisible !== isVisible) {
      this.setState({ isVisible });
    }
  };

  render() {
    const { title, highlights, backgroundImage } = this.props;
    const { isVisible } = this.state;
    const bgImageUrl = getImageUrl(backgroundImage);

    return (
      <section className="program-highlights-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        background: '#fff',
        padding: '64px 0'
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
          padding: '0 80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.7s'
        }}>
          <h2 style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            color: '#fff',
            marginBottom: '48px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize',
            textAlign: 'center'
          }}>
            {title || "Program Highlights"}
          </h2>
          
          <div className="row" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
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
                    flex: 1,
                    minWidth: '250px'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '283px',
                    backgroundImage: highlightImageUrl ? `url(${highlightImageUrl})` : 'linear-gradient(#666, #999)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '20px'
                  }} />
                  <div style={{
                    borderRadius: '12px',
                    padding: '16px 8px'
                  }}>
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: 700, 
                      color: '#fff',
                      marginBottom: '12px'
                    }}>
                      {highlight.title}
                    </h3>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: 400,
                      color: '#fff',
                      lineHeight: '24px'
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
    };
  }

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
    const { currentTestimonial } = this.state;
    const testimonial = testimonials && testimonials.length > 0 ? testimonials[currentTestimonial] : null;
    const bgImageUrl = getImageUrl(backgroundImage);
    const testimonialImageUrl = testimonial ? getImageUrl(testimonial.image) : null;

    return (
      <section className="impact-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        background: '#fff',
        padding: '64px 0'
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
        <div style={{ position: 'relative', zIndex: 10, padding: '0 80px' }}>
          <h2 style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            color: '#fff',
            marginBottom: '48px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize'
          }}>
            {title || "Impact"}
          </h2>
          
          {/* Stats Grid - Only render if stats exist */}
          {stats && stats.length > 0 && (
            <div className="row" style={{ display: 'flex', gap: '28px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {stats.map((stat, index) => {
                const statImageUrl = getImageUrl(stat.image);
                return (
                  <div 
                    key={index}
                    className="col-md-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '24px',
                      padding: '32px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      flex: 1,
                      minWidth: '200px'
                    }}
                  >
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      {statImageUrl && (
                        <div style={{
                          width: '121px',
                          height: '75px',
                          margin: '16px auto',
                          backgroundImage: `url(${statImageUrl})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }} />
                      )}
                      <div style={{ 
                        fontSize: '28px', 
                        fontWeight: 600, 
                        color: '#fff',
                        lineHeight: '48px',
                        textTransform: 'capitalize'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ 
                        fontSize: '18px', 
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
              borderRadius: '24px',
              padding: '32px 64px',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              position: 'relative'
            }}>
              {/* Opening Quote - Top Left */}
              <img 
                src={quotes} 
                alt="quote" 
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '40px',
                  height: '30px',
                  opacity: 0.8
                }}
              />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
                <div style={{
                  width: '162px',
                  height: '238px',
                  backgroundImage: testimonialImageUrl ? `url(${testimonialImageUrl})` : 'linear-gradient(#666, #999)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '20px',
                  border: '4px solid rgba(255, 255, 255, 0.75)',
                  flexShrink: 0
                }} />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ 
                    fontSize: '24px', 
                    fontStyle: 'italic',
                    fontWeight: 500, 
                    color: '#fff',
                    lineHeight: '27px'
                  }}>
                    {testimonial.quote}
                  </p>
                  <div>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: 900, 
                      color: '#fff',
                      lineHeight: '33px'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: 500, 
                      color: '#fff',
                      lineHeight: '22px'
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
                  bottom: '20px',
                  right: '20px',
                  width: '40px',
                  height: '30px',
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
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: '20px',
                      transition: 'all 0.3s'
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
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: '20px',
                      transition: 'all 0.3s'
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
// Partners Section
export class PartnersSection extends React.Component {
  render() {
    const { title, partners } = this.props;

    return (
      <section className="partners-section-wrapper" style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        background: '#fff',
        padding: '64px 0'
      }}>
        <div style={{ padding: '0 80px' }}>
          <h2 style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            color: '#000',
            marginBottom: '64px',
            letterSpacing: '-0.01em',
            textTransform: 'capitalize'
          }}>
            {title || "Our Partners"}
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-start',
            gap: '96px',
            padding: '48px 0',
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
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt={partner.name} 
                      style={{ 
                        height: '120px', 
                        objectFit: 'contain'
                      }} 
                    />
                  ) : (
                    <div style={{ 
                      width: '160px', 
                      height: '120px', 
                      background: '#e5e7eb',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{partner.name}</span>
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