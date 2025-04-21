import React from 'react';

const SolutionsBuilt = ({ solutions }) => {
  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <div className="solutions-built-container" style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "69px", 
      backgroundColor: "#880163",
      padding: "40px 20px"
    }}>
      <p style={{ 
        fontWeight: "700", 
        fontSize: "44.48px", 
        lineHeight: "100%", 
        textAlign: "center",
        color: "white"
      }}>Solutions Built</p>
      
      <div style={{ 
        display: "flex", 
        gap: "33px", 
        justifyContent: "center",
        marginTop: "20px", 
        flexWrap: "wrap" 
      }}>
        {solutions.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: "white", 
              borderRadius: "23.25px", 
              maxWidth: "577px", 
              padding: "20px" 
            }}
          >
            <img 
              style={{ width: "100%" }} 
              src={item.image.childImageSharp.fluid.src} 
              alt="Solutions Built" 
            />
            <h2 style={{ 
              marginTop: "16px", 
              color: "#0F1A54", 
              fontWeight: "700", 
              fontSize: "38.74px" 
            }}>
              {item.text}
            </h2>
            <p style={{ 
              marginTop: "12px", 
              color: "#676767", 
              fontSize: "19px" 
            }}>
              {item.subText}
            </p>
            <a 
              style={{ marginTop: "36px", display: "block" }} 
              href={item.knowMoreLink}
            >
              <div style={{ 
                width: "100%", 
                color: "#880163", 
                border: "1px solid #880163", 
                padding: "16px", 
                borderRadius: "12px",
                textAlign: "center"
              }}>
                Know More
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsBuilt;